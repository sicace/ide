var map = L.map('map').setView([19.2921, -99.1708], 13);

// Capa base
var baseOSM = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Control de capas: se agregarán las capas GeoJSON cargadas posteriormente
var layersControl = L.control.layers(null, null, { collapsed: false }).addTo(map);
