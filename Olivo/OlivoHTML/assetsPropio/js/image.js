document.addEventListener("DOMContentLoaded", function () {
    fetch('assets/source/src.json')
        .then(response => {
            if (!response.ok) throw new Error("No se pudo cargar el archivo src.json");
            return response.json();
        })
        .then(data => {
            // --- 1. CARGAR BANNER (BOOTSTRAP) ---
            const bannerContainer = document.querySelector('#carouselExampleIndicators .carousel-inner');
            const bannerIndicators = document.querySelector('#carouselExampleIndicators .carousel-indicators');

            if (bannerContainer && data.banner) {
                bannerContainer.innerHTML = data.banner.map((img, index) => `
                    <div class="carousel-item ${index === 0 ? 'active' : ''}">
                        <img src="${img}" class="d-block w-100" alt="Banner" style="object-fit: cover; height: 500px;">
                    </div>
                `).join('');

                if (bannerIndicators) {
                    bannerIndicators.innerHTML = data.banner.map((_, index) => `
                        <li data-target="#carouselExampleIndicators" data-slide-to="${index}" class="${index === 0 ? 'active' : ''}"></li>
                    `).join('');
                }
                $('#carouselExampleIndicators').carousel();
            }

            // --- 2. CARGAR SERVICIOS ---
            const serviciosContainer = document.getElementById('servicios-container');
            if (serviciosContainer && data.servicios) {
                serviciosContainer.innerHTML = data.servicios.map(s => `
                    <div class="col-lg-4 col-md-6 mb-4">
                        <a href="${s.link}" style="text-decoration: none; color: inherit; display: block;" class="h-100">
                            <div class="olv-about-item h-100">
                                <div class="olv-card-header">
                                    <h3>${s.titulo}</h3>
                                </div>
                                <p>${s.enfoque}</p> 
                                <div class="olv-img-container">
                                    <img src="${s.ruta}" alt="${s.titulo}" style="width:100%;">
                                </div>
                                <button class="btn-ver-mas">Ver más</button>
                            </div>
                        </a>
                    </div>
                `).join('');
            }

            // --- 3. CARGAR EQUIPO ---
            const equipoContainer = document.getElementById('equipo-container');
            if (equipoContainer && data.equipo) {
                equipoContainer.innerHTML = data.equipo.map(e => `
                    <div class="col-lg-4">
                        <div class="chef-item">
                            <div class="thumb">
                                <img src="${e.img}" alt="${e.nombre}">
                            </div>
                            <div class="down-content">
                                <h4>${e.nombre}</h4>
                                <span>${e.cargo}</span>
                            </div>
                        </div>
                    </div>
                `).join('');
            }

            // --- 4. CARGAR PLANTAS ---
            const intCont = document.getElementById('contenedor-interiores');
            const extCont = document.getElementById('contenedor-exteriores');
            const crearCardPlanta = (p) => `
                <div class="col-lg-6">
                    <div class="tab-item">
                        <img src="${p.img}" alt="${p.nombre}">
                        <h4>${p.nombre}</h4>
                        <p>${p.desc}</p>
                        <div class="price"><h6>$${p.precio}</h6></div>
                    </div>
                </div>`;

            if (intCont && data.plantas?.interiores) {
                intCont.innerHTML = data.plantas.interiores.map(crearCardPlanta).join('');
            }
            if (extCont && data.plantas?.exteriores) {
                extCont.innerHTML = data.plantas.exteriores.map(crearCardPlanta).join('');
            }
        })
        .catch(error => console.error("Error cargando el JSON:", error));
});