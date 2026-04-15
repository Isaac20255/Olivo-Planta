document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById('portfolio-container');
    if (!container) return;

    fetch('assets/source/enfoquesimg.json') 
        .then(res => {
            if (!res.ok) throw new Error("No se encontró el archivo JSON");
            return res.json();
        })
        .then(data => {
            const titulo = document.title.toLowerCase();
            let cat = "";

            // Lógica de detección robusta
            if (titulo.includes("jardineria") || titulo.includes("jardinería")) {
                cat = "jardineria";
            } else if (titulo.includes("diseno") || titulo.includes("diseño")) {
                cat = "diseno";
            } else if (titulo.includes("arquitectura")) {
                cat = "arquitectura";
            }

            console.log("Cargando categoría detectada:", cat);

            if (cat && data.proyectos[cat]) {
                container.innerHTML = ""; // Limpia por si acaso
                data.proyectos[cat].forEach(ruta => {
                    const img = document.createElement('img');
                    img.src = ruta.replace(/\\/g, '/'); 
                    img.alt = `Proyecto de ${cat}`;
                    container.appendChild(img);
                });
            }
        })
        .catch(err => console.error("Error:", err));
});