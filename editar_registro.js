document.addEventListener("DOMContentLoaded", cargarRegistros);

function cargarRegistros() {
    fetch('https://script.google.com/macros/s/AKfycbyEvGn6nmN-L89vvOaL7b-YBv8lZaca_aCHMW7537eidUZYFk8V38twg_eOxWAezZUl/exec')
        .then(response => response.json())
        .then(data => {
            let tbody = document.querySelector("#tablaRegistros tbody");
            tbody.innerHTML = "";

            data.forEach(registro => {
                let fila = `<tr>
                    <td>${registro.identificador || '-'}</td>
                    <td>${registro.nombre || '-'}</td>
                    <td>${registro.apellido || '-'}</td>
                    <td>${registro.fechadecontacto || '-'}</td>
                    <td>${registro.monto || '-'}</td>
                    <td>${registro.tipodeconsulta || '-'}</td>
                    <td><button class='edit-btn' onclick='redirigirAEditar(${JSON.stringify(registro)})'>✏️</button></td>
                </tr>`;
                tbody.innerHTML += fila;
            });
        })
        .catch(error => console.error('Error al cargar registros:', error));
}

function redirigirAEditar(registro) {
    let url = `editar.html?identificador=${encodeURIComponent(registro.identificador)}&nombre=${encodeURIComponent(registro.nombre)}&apellido=${encodeURIComponent(registro.apellido)}&fechadecontacto=${encodeURIComponent(registro.fechadecontacto)}&monto=${encodeURIComponent(registro.monto)}&tipodeconsulta=${encodeURIComponent(registro.tipodeconsulta)}`;
    window.location.href = url;
}
