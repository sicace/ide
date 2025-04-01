window.map = L.map('map').setView([19.2921, -99.1708], 13);

// Capa base
var baseOSM = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Control de capas
window.layersControl = L.control.layers({}, {}, { collapsed: false }).addTo(map);

// Agregar control de escala
L.control.scale({ imperial: false }).addTo(map);
