var mapa = L.map('map').setView([19.286, -99.192], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
}).addTo(mapa);

// Minimapa
var miniMapa = new L.Control.MiniMap(
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'),
    { toggleDisplay: true }
).addTo(mapa);
