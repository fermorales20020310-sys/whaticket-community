routes.post("/webhook", async (req, res) => {
    try {
        const body = req.body;

        // Verificamos si es un mensaje de WhatsApp Cloud API
        if (body.object) {
            if (
                body.entry &&
                body.entry[0].changes &&
                body.entry[0].changes[0].value.messages
            ) {
                const change = body.entry[0].changes[0].value;
                const message = change.messages[0];
                const phoneNumberId = change.metadata.phone_number_id;
                
                const from = message.from; // Número del cliente (ej: 57311...)
                const msgBody = message.text ? message.text.body : ''; // El texto del mensaje
                const messageId = message.id; // ID único de Meta para seguimiento

                console.log(`KLIDDO AVANZA - Mensaje de ${from}: ${msgBody}`);

                // TODO AQUÍ: Conectar con tus modelos de Sequelize para guardar en PostgreSQL:
                // 1. Buscar o crear el contacto usando 'from'
                // 2. Buscar o crear el ticket activo para ese contacto
                // 3. Guardar el mensaje en la tabla de mensajes asociado al ticket
            }
            return res.status(200).send("EVENT_RECEIVED");
        }
        res.sendStatus(404);
    } catch (error) {
        console.error("Error en webhook de KLIDDO:", error);
        res.status(500).send("Server Error");
    }
});
