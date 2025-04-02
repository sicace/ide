// js/download.js

function createDownloadButtons(map, layers) {
    if (!map) {
        console.error('El mapa no está definido.');
        return;
    }
    if (!Array.isArray(layers) || layers.length === 0) {
        console.warn('No se encontraron capas para descargar.');
        return;
    }

    const downloadControl = L.control({ position: 'topleft' });

    downloadControl.onAdd = function () {
        const div = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
        div.style.backgroundColor = 'white';
        div.style.padding = '5px';
        div.style.display = 'flex';
        div.style.flexDirection = 'column';
        div.style.gap = '5px';

        console.log('Generando botones de descarga...');

        // Crear botones para cada capa cargada en el mapa
        layers.forEach(layer => {
            const layerName = layer.options.name || `Capa_${Math.random().toString(36).substring(7)}`;
            console.log(`Añadiendo botones para: ${layerName}`);
            
            // Botón para descargar en SHP
            const downloadShp = document.createElement('button');
            downloadShp.innerText = `Descargar ${layerName} SHP`;
            downloadShp.onclick = () => downloadFile(layerName, 'shp');
            div.appendChild(downloadShp);
            
            // Botón para descargar en GeoJSON
            const downloadGeojson = document.createElement('button');
            downloadGeojson.innerText = `Descargar ${layerName} GeoJSON`;
            downloadGeojson.onclick = () => downloadFile(layerName, 'geojson');
            div.appendChild(downloadGeojson);
        });

        // Botón para descargar todas las capas en SHP
        const downloadAllShp = document.createElement('button');
        downloadAllShp.innerText = 'Descargar todas en SHP';
        downloadAllShp.onclick = () => downloadAllFiles(layers, 'shp');
        div.appendChild(downloadAllShp);

        // Botón para descargar todas las capas en GeoJSON
        const downloadAllGeojson = document.createElement('button');
        downloadAllGeojson.innerText = 'Descargar todas en GeoJSON';
        downloadAllGeojson.onclick = () => downloadAllFiles(layers, 'geojson');
        div.appendChild(downloadAllGeojson);

        return div;
    };

    downloadControl.addTo(map);
}

function downloadFile(layerName, format) {
    const folder = format === 'shp' ? 'shapefiles/' : 'geojson/';
    const file = `${layerName}.${format === 'shp' ? 'zip' : 'geojson'}`;
    const link = document.createElement('a');
    link.href = folder + file;
    link.download = file;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function downloadAllFiles(layers, format) {
    layers.forEach(layer => {
        const layerName = layer.options.name || `Capa_${Math.random().toString(36).substring(7)}`;
        downloadFile(layerName, format);
    });
}

// Esperar a que el mapa y las capas estén listas antes de ejecutar
setTimeout(() => {
    if (typeof map !== 'undefined' && typeof layers !== 'undefined') {
        createDownloadButtons(map, layers);
    } else {
        console.error('No se pudo inicializar la función de descarga: mapa o capas no definidos.');
    }
}, 2000);
