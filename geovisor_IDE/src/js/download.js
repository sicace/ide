document.addEventListener("DOMContentLoaded", function () {
    var downloadContainer = document.getElementById("download-buttons");

    function createButton(text, type) {
        var button = document.createElement("button");
        button.textContent = text;
        button.onclick = function () {
            window.open(`mapas.php?type=${type}`, '_blank');
        };
        return button;
    }

    downloadContainer.appendChild(createButton("Ver Mapas PDF", "pdf"));
    downloadContainer.appendChild(createButton("Ver Mapas JPG", "jpg"));
});
