document.addEventListener("DOMContentLoaded", function () {
    // 1. Sincronizar el texto del Rango de Ingreso (Formato CR)
    const incomeInput = document.getElementById('income');
    const incomeVal = document.getElementById('income_val');

    if (incomeInput && incomeVal) {
        incomeInput.addEventListener('input', function() {
            // Usa 'es-CR' para que el separador de miles sea un punto (ej: 1.000.000)
            incomeVal.textContent = Number(this.value).toLocaleString('es-CR');
        });
    }

    // 2. Calcular Edad y guardarla en el campo oculto
    const birthdateInput = document.getElementById('birthdate');
    const ageHidden = document.getElementById('age_hidden');

    if (birthdateInput && ageHidden) {
        birthdateInput.addEventListener('change', function() {
            if (this.value) {
                const fechaNacimiento = new Date(this.value);
                const hoy = new Date();
                let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
                const mes = hoy.getMonth() - fechaNacimiento.getMonth();
                
                if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
                    edad--;
                }
                ageHidden.value = edad;
            }
        });
    }
});