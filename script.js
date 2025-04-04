let socket;  // Globale Variable für WebSocket

function connectWebSocket() {
  console.log("🔄 Verbinde WebSocket...");
  socket = new WebSocket("wss://75d7-2a02-3100-2eb9-8600-29e6-b95b-10f1-6f30.ngrok-free.app");

  socket.onopen = () => console.log("✅ WebSocket verbunden!");

  socket.onmessage = (event) => console.log("📩 Nachricht vom Server:", event.data);

  socket.onerror = (error) => console.log("❌ WebSocket-Fehler:", error);

  socket.onclose = () => {
    console.log("❌ WebSocket getrennt! Versuche, erneut zu verbinden...");
    setTimeout(connectWebSocket, 3000); // Versuche nach 3s erneut zu verbinden
  };
}

// WebSocket beim Laden der Seite starten
connectWebSocket();

function sendOSCMessage() {
  if (socket.readyState === WebSocket.OPEN) {
    const message = "Hallo Welt";
    socket.send(message);
    console.log("📨 Nachricht gesendet:", message);
  } else {
    console.log("❌ WebSocket nicht verbunden!");
  }
}
