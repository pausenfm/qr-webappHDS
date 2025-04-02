const WebSocket = require('ws');
const osc = require('osc');
const dgram = require('dgram');

// WebSocket-Server erstellen
const wss = new WebSocket.Server({ port: 8080 });

// OSC-UDP-Client erstellen (Max/MSP IP und Port)
const udpClient = dgram.createSocket('udp4');
const MAX_MSP_IP = '192.168.1.6';  // Ändere dies auf die IP-Adresse deines Max/MSP-Rechners 192.168.1.6 127.0.0.1
const MAX_MSP_PORT = 8080;       // Standardport für Max/MSP OSC (kann je nach deiner Max/MSP-Konfiguration unterschiedlich sein)

// Wenn eine WebSocket-Verbindung hergestellt wird
wss.on('connection', ws => {
  console.log('WebSocket verbunden');

  // Wenn eine Nachricht vom Client empfangen wird
  ws.on('message', message => {
    console.log('Nachricht von Web-App erhalten:', message);

    // OSC-Nachricht erstellen
    const oscMessage = new osc.Message('/hello', message);

    // Die OSC-Nachricht über UDP an Max/MSP senden
    const oscPacket = oscMessage.toBuffer();
    udpClient.send(oscPacket, 0, oscPacket.length, MAX_MSP_PORT, MAX_MSP_IP, (err) => {
      if (err) {
        console.log('Fehler beim Senden der OSC-Nachricht:', err);
      } else {
        console.log('OSC-Nachricht erfolgreich an Max/MSP gesendet');
      }
    });
  });

  // Fehlerbehandlung für die WebSocket-Verbindung
  ws.on('error', (error) => {
    console.error('WebSocket Fehler:', error);
  });

  // Wenn die Verbindung geschlossen wird
  ws.on('close', () => {
    console.log('Ein Client hat die Verbindung geschlossen');
  });

  // Bestätigung an den Client senden, dass die Verbindung erfolgreich ist
  ws.send("Verbindung erfolgreich!");
});

console.log('WebSocket-Server läuft auf ws://127.0.0.1:8080');

