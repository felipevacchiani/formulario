document.addEventListener("DOMContentLoaded", cargarRegistros);

function cargarRegistros() {
    fetch('https://script.google.com/macros/s/AKfycbyeymwR5AEFbFMXDenpqBBFrsjHP5GbalV2XNai78k_IqhqyPlDoHjfNPMHFzUzVdL6/exec')
        .then(response => response.json())
        .then(data => {
            let tbody = document.querySelector("#tablaRegistros tbody");
            tbody.innerHTML = "";

            data.forEach(registro => {
                let fila = `<tr>
                    <td>${registro.identificador}</td>
                    <td>${registro.nombre}</td>
                    <td>${registro.apellido}</td>
                    <td>${registro.tipoConsulta}</td>
                    <td>${registro.monto}</td>
                    <td><button class='edit-btn' onclick='editarRegistro(${JSON.stringify(registro)})'>✏️</button></td>
                </tr>`;
                tbody.innerHTML += fila;
            });
        })
        .catch(error => console.error('Error al cargar registros:', error));
}

function editarRegistro(registro) {
    let url = `editar_registro.html?identificador=${encodeURIComponent(registro.identificador)}&nombre=${encodeURIComponent(registro.nombre)}&apellido=${encodeURIComponent(registro.apellido)}&tipoConsulta=${encodeURIComponent(registro.tipoConsulta)}&monto=${encodeURIComponent(registro.monto)}`;
    window.location.href = url;
}
