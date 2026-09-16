import { getIO } from "../../libs/socket";
import Contact from "../../models/Contact";
import Message from "../../models/Message";
import Ticket from "../../models/Ticket";
import { logger } from "../../utils/logger";

export const HandleMetaMessage = async (value: any) => {
  try {
    const io = getIO();

    // Puede traer mensajes o estados
    if (value.messages && value.messages[0]) {
      const msg = value.messages[0];
      const contactNumber = msg.from;
      const contactName = value.contacts?.[0]?.profile?.name || contactNumber;
      const wppId = value.metadata.phone_number_id;

      // 1. Buscar o crear contacto
      let contact = await Contact.findOne({ where: { number: contactNumber } });
      if (!contact) {
        contact = await Contact.create({
          name: contactName,
          number: contactNumber,
          profilePicUrl: ""
        });
      }

      // 2. Buscar o crear ticket abierto
      let ticket = await Ticket.findOne({
        where: { contactId: contact.id, status: "open" }
      });
      if (!ticket) {
        ticket = await Ticket.create({
          contactId: contact.id,
          status: "open",
          lastMessage: msg.text?.body || "Archivo recibido",
          whatsappId: 1 // ID del canal cloud
        });
      }

      // 3. Guardar mensaje
      const body = msg.text?.body || msg.type;
      const messageData = {
        ticketId: ticket.id,
        contactId: contact.id,
        body: body,
        fromMe: false,
        read: true,
        mediaType: msg.type,
        timestamp: new Date(Number(msg.timestamp) * 1000),
      };

      const newMessage = await Message.create(messageData as any);
      await ticket.update({ lastMessage: body });

      // 4. Emitir en tiempo real al frontend azul
      io.to(`ticket-${ticket.id}`).emit("appMessage", {
        action: "create",
        message: newMessage,
        ticket,
        contact
      });
      io.to("notification").emit("appMessage", {
        action: "create",
        message: newMessage,
        ticket,
        contact
      });

      console.log(`[KLIDO AVANZA] Mensaje de ${contactName}: ${body}`);
    }

    // Estados: delivered, read
    if (value.statuses && value.statuses[0]) {
      console.log("[KLIDO AVANZA] Estado:", value.statuses[0].status);
    }

  } catch (error) {
    logger.error("Error HandleMetaMessage:", error);
  }
};
