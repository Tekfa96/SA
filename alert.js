import fetch from "node-fetch";

// 🔧 Configure ici tes variables
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

// 🚨 Fonction API appelée par ton ESP32
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Missing message" });
    }

    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: `🚨 Alerte détectée : ${message}`,
      }),
    });

    const data = await response.json();
    console.log("✅ Envoi Telegram :", data);
    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("❌ Erreur :", error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
}
