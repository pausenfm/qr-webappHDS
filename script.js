console.log("Web-App geladen!");

// Funktion zum Senden der OSC-Nachricht über WebSocket
function sendOSCMessage() {
  // WebSocket-Verbindung zum Server herstellen
  const socket = new WebSocket("ws://192.168.1.6:8080");

  // Wenn die Verbindung geöffnet wird, sende eine Nachricht
  socket.onopen = () => {
    console.log("WebSocket-Verbindung hergestellt!");

    // OSC-Nachricht (z.B. "/hello" mit der Nachricht "Hallo Welt")
    const message = "Hallo Welt";
    socket.send(message);
    console.log("Nachricht gesendet:", message);
  };

  // Wenn ein Fehler auftritt
  socket.onerror = (error) => {
    console.log("WebSocket-Fehler:", error);
  };

  // Wenn die Verbindung geschlossen wird
  socket.onclose = () => {
    console.log("WebSocket-Verbindung geschlossen");
  };
}



