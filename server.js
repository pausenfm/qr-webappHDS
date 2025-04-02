const WebSocket = require('ws');
const osc = require('osc');
const dgram = require('dgram');
const fs = require('fs');
const https = require('https');

// Pfade zu den SSL-Zertifikaten (dieses Beispiel geht von selbstsignierten Zertifikaten aus)
const serverOptions = {
  key: fs.readFileSync('path/to/key.pem'),    // Dein SSL-Schlüssel
  cert: fs.readFileSync('path/to/cert.pem')   // Dein SSL-Zertifikat
};

// HTTPS-Server erstellen
const server = https.createServer(serverOptions);

// WebSocket-Server erstellen (mit HTTPS als Basis)
const wss = new WebSocket.Server({ server });

// OSC-UDP-Client erstellen (Max/MSP IP und Port)
const udpClient = dgram.createSocket('udp4');
const MAX_MSP_IP = '192.168.1.6';  // Ändere dies auf die IP-Adresse deines Max/MSP-Rechners
const MAX_MSP_PORT = 8080;         // Standardport für Max/MSP OSC (kann je nach deiner Max/MSP-Konfiguration unterschiedlich sein)

// Wenn eine WebSocket-Verbindung hergestellt wird
wss.on('connection', ws => {
  console.log('WebSocket verbunden');

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

  ws.on('error', (error) => {
    console.error('WebSocket Fehler:', error);
  });

  ws.on('close', () => {
    console.log('Ein Client hat die Verbindung geschlossen');
  });

  ws.send("Verbindung erfolgreich!");
});

// HTTPS-Server auf Port 8080 starten
server.listen(8080, () => {
  console.log('HTTPS-WebSocket-Server läuft auf wss://127.0.0.1:8080');
});
