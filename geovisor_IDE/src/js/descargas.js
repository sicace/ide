function generarBotonesDescarga() {
    const panel = document.getElementById('panelDescargas');
    panel.innerHTML = '';

    Object.keys(capas).forEach(nombre => {
        const botonGeoJSON = document.createElement('button');
        botonGeoJSON.textContent = `GeoJSON ${nombre}`;
        botonGeoJSON.onclick = () => descargarGeoJSON(nombre);

        const botonSHP = document.createElement('button');
        botonSHP.textContent = `SHP ${nombre}`;
        botonSHP.onclick = () => descargarSHP(nombre);

        panel.appendChild(botonGeoJSON);
        panel.appendChild(botonSHP);
    });
}

function descargarGeoJSON(nombre) {
    if (!capas[nombre]) {
        alert('No hay datos GeoJSON disponibles para descargar.');
        return;
    }
    
    const datos = capas[nombre].toGeoJSON();
    const blob = new Blob([JSON.stringify(datos)], { type: 'application/json' });
    const enlace = document.createElement('a');
    enlace.href = URL.createObjectURL(blob);
    enlace.download = `${nombre}.geojson`;
    enlace.click();
}

function descargarSHP(nombre) {
    const enlace = document.createElement('a');
    enlace.href = `data/${nombre}.zip`;
    enlace.download = `${nombre}.zip`;
    enlace.click();
}

setTimeout(generarBotonesDescarga, 2000);
