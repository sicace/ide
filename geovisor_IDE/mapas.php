<?php
$type = isset($_GET['type']) ? $_GET['type'] : 'pdf';
$folder = ($type === 'pdf') ? 'data/mapas/pdf/' : 'data/mapas/jpg/';

if (!is_dir($folder)) {
    die("La carpeta de mapas no existe.");
}

$files = array_filter(scandir($folder), function($file) use ($type) {
    $extensiones = ($type === 'pdf') ? ['pdf'] : ['jpg', 'jpeg', 'png'];
    return in_array(strtolower(pathinfo($file, PATHINFO_EXTENSION)), $extensiones);
});
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mapas <?php echo strtoupper($type); ?></title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.14.305/pdf.min.js"></script>
    <style>
        body { font-family: Arial, sans-serif; text-align: center; background: #f4f4f4; margin: 0; padding: 0; }
        .container { max-width: 90%; margin: 20px auto; background: white; padding: 15px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); }
        .map-viewer { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; }
        .map-item { width: 140px; height: 120px; border: 1px solid #ccc; padding: 5px; background: white; border-radius: 8px; box-shadow: 0 0 5px rgba(0,0,0,0.1); cursor: pointer; text-align: center; position: relative; }
        .map-item canvas, .map-item img { width: 100%; height: 100px; border-radius: 5px; object-fit: cover; }
        .map-title { font-size: 8px; font-weight: bold; margin: 3px 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

        /* Estilos del visor emergente */
        .fullscreen-view { 
            display: none; 
            position: fixed; 
            top: 0; left: 0; width: 100%; height: 100%; 
            background: rgba(0,0,0,0.8); 
            justify-content: center; align-items: center; s
        }
        .fullscreen-content { 
            width: 80%; height: 80%; 
            background: white; padding: 10px; border-radius: 10px; 
            display: flex; flex-direction: column; align-items: center; 
        }
        .fullscreen-content iframe { width: 100%; height: 100%; border-radius: 5px; }
        .fullscreen-title { font-size: 14px; font-weight: bold; margin-bottom: 5px; }
        .fullscreen-buttons { margin-top: 10px; }
        .close-btn { 
            position: absolute; top: 15px; right: 20px; 
            font-size: 24px; color: white; cursor: pointer; 
        }
        .btn { padding: 5px 10px; font-size: 12px; margin: 2px; cursor: pointer; border: none; border-radius: 5px; }
        .btn-download { background: #007bff; color: white; }
        .btn-print { background: #28a745; color: white; }
    </style>
</head>
<body>

<div class="container">
    <h2>Mapas en <?php echo strtoupper($type); ?></h2>
    <div class="map-viewer">
        <?php foreach ($files as $file): ?>
            <?php 
                $fileName = pathinfo($file, PATHINFO_FILENAME); // Elimina la extensión
            ?>
            <div class="map-item" onclick="openFullscreen('<?php echo $folder . $file; ?>', '<?php echo $fileName; ?>', '<?php echo $type; ?>')">
                <div class="map-title"><?php echo $fileName; ?></div>
                <?php if ($type === 'pdf'): ?>
                    <canvas id="pdf-<?php echo md5($file); ?>" data-pdf="<?php echo $folder . $file; ?>"></canvas>
                <?php else: ?>
                    <img src="<?php echo $folder . $file; ?>" alt="<?php echo $fileName; ?>">
                <?php endif; ?>
            </div>
        <?php endforeach; ?>
    </div>
</div>

<!-- Visor emergente -->
<div class="fullscreen-view" id="fullscreen-view">
    <span class="close-btn" onclick="closeFullscreen()">&times;</span>
    <div class="fullscreen-content">
        <div class="fullscreen-title" id="fullscreen-title"></div>
        <iframe id="fullscreen-iframe"></iframe>
        <div class="fullscreen-buttons">
            <button class="btn btn-download" id="download-btn">Descargar</button>
        </div>
    </div>
</div>

<script>
    function openFullscreen(file, title, type) {
        document.getElementById("fullscreen-title").textContent = title;
        const iframe = document.getElementById("fullscreen-iframe");

        if (type === "pdf") {
            iframe.src = file;
            iframe.style.display = "block";
        } else {
            iframe.style.display = "none";
            const img = document.createElement("img");
            img.src = file;
            img.style.width = "100%";
            img.style.height = "100%";
            img.style.objectFit = "contain";

            const contentDiv = document.querySelector(".fullscreen-content");
            contentDiv.insertBefore(img, contentDiv.firstChild);
        }

        document.getElementById("fullscreen-view").style.display = "flex";
        document.getElementById("download-btn").onclick = function() {
            downloadFile(file, title);
        };
    }

    function closeFullscreen() {
        document.getElementById("fullscreen-view").style.display = "none";
        document.querySelector(".fullscreen-content img")?.remove();
    }

    function downloadFile(url, title) {
        const a = document.createElement("a");
        a.href = url;
        a.download = title;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    // Generar miniaturas para PDFs
    document.addEventListener("DOMContentLoaded", function () {
        document.querySelectorAll("canvas[data-pdf]").forEach(canvas => {
            const pdfUrl = canvas.getAttribute("data-pdf");
            const ctx = canvas.getContext("2d");

            pdfjsLib.getDocument(pdfUrl).promise.then(pdf => pdf.getPage(1))
            .then(page => {
                const viewport = page.getViewport({ scale: 0.5 });
                canvas.width = viewport.width;
                canvas.height = viewport.height;
                return page.render({ canvasContext: ctx, viewport: viewport }).promise;
            }).catch(error => console.error("Error al renderizar el PDF:", error));
        });
    });
</script>

</body>
</html>
