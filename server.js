const fs = require('fs');
const https = require('https');
const WebSocket = require('ws');
const osc = require('osc');
const dgram = require('dgram');

// SSL-Zertifikat laden
const serverOptions = {
  key: fs.readFileSync('/Users/paulschulze/Documents/WEBAPPZertifikate/private.key'),   // Dein privater Schlüssel
  cert: fs.readFileSync('/Users/paulschulze/Documents/WEBAPPZertifikate/certificate.crt') // Dein selbstsigniertes Zertifikat
};

// HTTPS-Server erstellen
const server = https.createServer(serverOptions);
const wss = new WebSocket.Server({ server });

// OSC-UDP-Client für Max/MSP
const udpClient = dgram.createSocket('udp4');
const MAX_MSP_IP = '127.0.0.1';
const MAX_MSP_PORT = 8020;

// WebSocket-Verbindungen verwalten
wss.on('connection', ws => {
  console.log('✅ WebSocket verbunden!');

  ws.on('message', message => {
    console.log('📨 Nachricht erhalten:', message);

    // OSC-Nachricht erstellen
    const oscMessage = new osc.Message('/hello', message);
    const oscPacket = oscMessage.toBuffer();

    // Nachricht an Max/MSP senden
    udpClient.send(oscPacket, 0, oscPacket.length, MAX_MSP_PORT, MAX_MSP_IP, (err) => {
      if (err) console.error('❌ Fehler beim Senden:', err);
      else console.log('✅ OSC gesendet an Max/MSP:', message);
    });
  });

  ws.on('error', err => console.error('❌ WebSocket Fehler:', err));
  ws.on('close', () => console.log('❌ WebSocket getrennt!'));

  ws.send("👋 Verbindung erfolgreich!");
});

// HTTPS-Server auf Port 8080 starten
server.listen(8080, '0.0.0.0', () => {
  console.log('🚀 WebSocket-Server läuft auf wss://localhost:8080');
});