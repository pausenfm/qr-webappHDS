console.log("📱 Web-App geladen!");

// 🌍 Verbindung zum WebSocket-Server
const socket = new WebSocket("wss://cbf6-2a02-3100-2eb9-8600-29e6-b95b-10f1-6f30.ngrok-free.app");

// ✅ WebSocket-Verbindung erfolgreich
socket.onopen = () => console.log("✅ WebSocket verbunden!");

// ❌ Fehlerbehandlung
socket.onerror = (error) => console.error("❌ WebSocket-Fehler:", error);
socket.onclose = () => console.log("❌ Verbindung getrennt!");

// 📤 Nachricht senden, wenn Button geklickt wird
function sendOSCMessage() {
  if (socket.readyState === WebSocket.OPEN) {
    const message = "Hallo Welt";
    socket.send(message);
    console.log("📨 Nachricht gesendet:", message);
  } else {
    console.error("❌ WebSocket nicht verbunden!");
  }
}
