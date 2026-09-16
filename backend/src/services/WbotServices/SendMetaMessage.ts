import axios from "axios";

interface Props {
  to: string;
  body: string;
  mediaUrl?: string;
  mediaType?: "image" | "document" | "audio";
}

export const SendMetaMessage = async ({ to, body, mediaUrl, mediaType }: Props) => {
  const token = process.env.WHATSAPP_TOKEN;
  const phoneId = process.env.PHONE_NUMBER_ID;

  const url = `https://graph.facebook.com/v20.0/${phoneId}/messages`;

  let data: any = {
    messaging_product: "whatsapp",
    to: to,
  };

  if (mediaUrl) {
    data.type = mediaType || "image";
    data[mediaType || "image"] = { link: mediaUrl, caption: body };
  } else {
    data.type = "text";
    data.text = { body: body };
  }

  try {
    const response = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });
    console.log("[KLIDO AVANZA] Enviado a", to, response.data.messages[0].id);
    return response.data;
  } catch (error: any) {
    console.error("[KLIDO AVANZA] Error enviando:", error.response?.data);
    throw error;
  }
};
