document.addEventListener("DOMContentLoaded", cargarRegistros);

function cargarRegistros() {
    fetch('https://script.google.com/macros/s/AKfycbyEvGn6nmN-L89vvOaL7b-YBv8lZaca_aCHMW7537eidUZYFk8V38twg_eOxWAezZUl/exec')
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
