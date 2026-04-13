function initMap() {
    const ubicacion = { lat: 9.9810583, lng: -84.2400729 };

    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 17,
        center: ubicacion,
    });

    const marker = new google.maps.Marker({
        position: ubicacion,
        map: map,
        title: "Olivo - Alajuela"
    });
}