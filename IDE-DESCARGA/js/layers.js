var satelite = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenTopoMap'
});

var baseMaps = {
    "OpenStreetMap": baseOSM,
    "Satélite": satelite
};

// Inicializar el control de capas
var layerControl = L.control.layers(baseMaps).addTo(map);
