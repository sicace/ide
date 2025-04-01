var shpFiles = [
    { url: "/IDE-DESCARGA/shapefiles/AHI.zip", name: "AHI", color: "red" },
    { url: "/IDE-DESCARGA/shapefiles/cerro_volcan_utm_14_utm.zip", name: "Cerro Volcán", color: "blue" },
    { url: "/IDE-DESCARGA/shapefiles/ColoniasIGg.zip", name: "Colonias IGg", color: "green" },
    { url: "/IDE-DESCARGA/shapefiles/Limite Suelo de Conservación.zip", name: "Limite Suelo de Conservación", color: "orange" },
    { url: "/IDE-DESCARGA/shapefiles/Limite Tlalpan 2012.zip", name: "Limite Tlalpan 2012", color: "purple" },
    { url: "/IDE-DESCARGA/shapefiles/PueblosOriginariosIGg.zip", name: "Pueblos Originarios IGg", color: "black" }
];

shpFiles.forEach(file => {
    fetch(file.url)
        .then(response => {
            if (!response.ok) throw new Error(`No se encontró el archivo: ${file.url}`);
            return response.arrayBuffer();
        })
        .then(buffer => shp(buffer))
        .then(geojson => {
            var layer = L.geoJSON(geojson, { 
                style: { color: file.color, weight: 2 } 
            });

            layer.addTo(map);
            controlLayers.addOverlay(layer, file.name);
            console.log(`✅ ${file.name} cargado correctamente.`);
        })
        .catch(error => console.error(`❌ Error cargando ${file.name}:`, error));
});
