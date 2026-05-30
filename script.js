// Connect to HiveMQ public broker (WebSocket)
const client = mqtt.connect('wss://broker.hivemq.com:8884/mqtt');

/* ================= TOPICS ================= */
// Device 1
const d1StatusTopic    = 'project/esp32/device1/status';
const d1EmergencyTopic = 'project/esp32/device1/emergency';
const d1LastSeenTopic  = 'project/esp32/device1/lastSeen';

// Device 2
const d2StatusTopic    = 'project/esp32/device2/status';
const d2EmergencyTopic = 'project/esp32/device2/emergency';
const d2LastSeenTopic  = 'project/esp32/device2/lastSeen';

/* ================= DOM ================= */
// Device 1
const d1StatusDiv    = document.getElementById('status');
const d1EmergencyDiv = document.getElementById('emergencyStatus');

// Device 2
const d2StatusDiv    = document.getElementById('d2Status');
const d2EmergencyDiv = document.getElementById('d2Emergency');

/* ================= STATE ================= */
let d1LastSeenTime = 0;
let d2LastSeenTime = 0;

/* ================= MQTT CONNECT ================= */
client.on('connect', () => {
  console.log('✅ Connected to MQTT broker');

  client.subscribe(d1StatusTopic);
  client.subscribe(d1EmergencyTopic);
  client.subscribe(d1LastSeenTopic);

  client.subscribe(d2StatusTopic);
  client.subscribe(d2EmergencyTopic);
  client.subscribe(d2LastSeenTopic);
});

/* ================= MQTT MESSAGE ================= */
client.on('message', (topic, message) => {
  const msg = message.toString().trim();
  console.log(`MQTT → ${topic}: ${msg}`);

  /* ---- HEARTBEATS ---- */
  if (topic === d1LastSeenTopic) d1LastSeenTime = Date.now();
  if (topic === d2LastSeenTopic) d2LastSeenTime = Date.now();

  /* ---- DEVICE 1 EMERGENCY ---- */
  if (topic === d1EmergencyTopic) {
    d1EmergencyDiv.textContent = msg;

    if (msg.startsWith('EMERGENCY')) {
      d1EmergencyDiv.className = 'emergency';   // 🔴 RED
    } else {
      d1EmergencyDiv.className = 'safe';        // 🔵 / 🟢
    }
  }

  /* ---- DEVICE 2 EMERGENCY ---- */
  if (topic === d2EmergencyTopic) {
    d2EmergencyDiv.textContent = msg;

    if (msg.startsWith('EMERGENCY')) {
      d2EmergencyDiv.className = 'emergency';   // 🔴 RED
    } else {
      d2EmergencyDiv.className = 'safe';
    }
  }
});

/* ================= ONLINE / OFFLINE CHECK ================= */
setInterval(() => {
  const now = Date.now();

  // DEVICE 1
  if (now - d1LastSeenTime > 10000) {
    d1StatusDiv.textContent = 'OFFLINE';
    d1StatusDiv.className = 'offline';
  } else {
    d1StatusDiv.textContent = 'ONLINE';
    d1StatusDiv.className = 'online';
  }

  // DEVICE 2
  if (now - d2LastSeenTime > 10000) {
    d2StatusDiv.textContent = 'OFFLINE';
    d2StatusDiv.className = 'offline';
  } else {
    d2StatusDiv.textContent = 'ONLINE';
    d2StatusDiv.className = 'online';
  }

}, 2000);
