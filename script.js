console.log("📱 Web-App geladen!");

// 🌍 Verbindung zum WebSocket-Server über HTTPS
const socket = new WebSocket("wss://localhost:8080");

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
