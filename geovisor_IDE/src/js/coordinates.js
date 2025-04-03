var coordControl = L.control({ position: 'bottomleft' });

coordControl.onAdd = function(map) {
    var div = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
    div.style.padding = '5px';
    div.style.backgroundColor = 'white';
    div.innerHTML = "Lat: -, Lng: -<br>UTM: -";
    this._div = div;
    return div;
};

coordControl.addTo(map);

map.on('mousemove', function(e) {
    var lat = e.latlng.lat;
    var lng = e.latlng.lng;
    
    var utmCoords = latLngToUTM(lat, lng);

    coordControl._div.innerHTML = `Lat: ${lat.toFixed(6)}, Lng: ${lng.toFixed(6)}<br>UTM: ${utmCoords}`;
});

function latLngToUTM(lat, lng) {
    proj4.defs("EPSG:32614", "+proj=utm +zone=14 +datum=WGS84 +units=m +no_defs");
    var utmPoint = proj4("EPSG:32614").forward([lng, lat]);
    return `E: ${utmPoint[0].toFixed(2)}, N: ${utmPoint[1].toFixed(2)}`;
}
