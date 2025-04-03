var capas = {};

async function cargarCapaShapefile(nombre, url) {
    try {
        const geojson = await shp(url);
        capas[nombre] = L.geoJSON(geojson, {
            style: { color: getColor(nombre) }
        }).addTo(mapa);

        document.getElementById('listaCapas').innerHTML += `
            <input type="checkbox" checked onclick="toggleCapa('${nombre}')"> ${nombre}<br>
        `;
    } catch (error) {
        console.error(`Error cargando shapefile ${nombre}:`, error);
    }
}

function toggleCapa(nombre) {
    if (mapa.hasLayer(capas[nombre])) {
        mapa.removeLayer(capas[nombre]);
    } else {
        mapa.addLayer(capas[nombre]);
    }
}

function getColor(nombre) {
    const colores = {
        'Catastro': 'blue',
        'Colonias': 'green',
        'PDDU': 'red',
        'Vialidades': 'orange'
    };
    return colores[nombre] || 'black';
}

// Carga de capas
cargarCapaShapefile('Catastro', 'data/catastro2021_TLP.zip');
cargarCapaShapefile('Colonias', 'data/colonias.zip');
cargarCapaShapefile('PDDU', 'data/PDDU_Tlp.zip');
cargarCapaShapefile('Vialidades', 'data/Vialidades.zip');
