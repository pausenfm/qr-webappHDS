console.log("📱 Web-App geladen!");

// 🌍 Verbindung zum WebSocket-Server
const socket = new WebSocket("wss://6a83-2a02-3100-2cfa-be00-107f-70e7-6a1e-b6ac.ngrok-free.app");

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
