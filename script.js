console.log("📱 Web-App geladen!");

let socket; // WebSocket-Verbindung global halten

function connectWebSocket() {
  // Falls bereits verbunden, nicht erneut verbinden
  if (socket && socket.readyState === WebSocket.OPEN) return;

  console.log("🔄 Verbinde WebSocket...");
  socket = new WebSocket("wss://e35f-2a02-3100-2eb9-8600-29e6-b95b-10f1-6f30.ngrok-free.app");

  socket.onopen = () => {
    console.log("✅ WebSocket verbunden!");
  };

  socket.onmessage = (event) => {
    console.log("📥 Antwort vom Server:", event.data);
  };

  socket.onerror = (error) => {
    console.log("❌ WebSocket-Fehler:", error);
  };

  socket.onclose = () => {
    console.log("❌ WebSocket getrennt! Versuche, erneut zu verbinden...");
    setTimeout(connectWebSocket, 3000); // Automatisch neu verbinden nach 3 Sekunden
  };
}

function sendOSCMessage() {
  if (!socket || socket.readyState !== WebSocket.OPEN) {
    console.log("❌ WebSocket nicht verbunden!");
    return;
  }

  const message = "Hallo Welt";
  socket.send(message);
  console.log("📨 Nachricht gesendet:", message);
}

// WebSocket beim Laden der Seite verbinden
connectWebSocket();
