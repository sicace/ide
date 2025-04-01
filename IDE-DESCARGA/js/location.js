L.control.locate = function(opts) {
    var control = L.control({ position: 'topleft' });
    control.onAdd = function(map) {
        var button = L.DomUtil.create('button', 'leaflet-bar leaflet-control leaflet-control-custom');
        button.innerHTML = '📍';
        button.style.cursor = 'pointer';
        button.onclick = function() {
            map.locate({ setView: true, maxZoom: 16 });
        };
        return button;
    };
    return control;
};
L.control.locate().addTo(map);

map.on('locationfound', function(e) {
    L.marker(e.latlng).addTo(map)
        .bindPopup("Ubicación actual").openPopup();
});

// Definir el control de capas globalmente
var controlLayers = L.control.layers(null, null, { collapsed: false }).addTo(map);
