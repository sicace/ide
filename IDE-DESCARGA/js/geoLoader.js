var geojsonFiles = [
    { url: "geojson/capa1.geojson", name: "GeoJSON 1", color: "green" },
    { url: "geojson/capa2.geojson", name: "GeoJSON 2", color: "purple" }
];

geojsonFiles.forEach(file => {
    fetch(file.url)
        .then(response => {
            if (!response.ok) throw new Error(`No se pudo cargar ${file.name}`);
            return response.json();
        })
        .then(data => {
            var layer = L.geoJSON(data, { style: { color: file.color, weight: 2 } });
            layer.addTo(map);
            controlLayers.addOverlay(layer, file.name);
            console.log(`✅ ${file.name} cargado correctamente.`);
        })
        .catch(error => console.error(`❌ Error cargando ${file.name}:`, error));
});
