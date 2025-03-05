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
                    <td><button class='edit-btn' onclick='abrirModal(${JSON.stringify(registro)})'>✏️</button></td>
                </tr>`;
                tbody.innerHTML += fila;
            });
        })
        .catch(error => console.error('Error al cargar registros:', error));
}

function abrirModal(registro) {
    document.getElementById("identificador").value = registro.identificador;
    document.getElementById("nombre").value = registro.nombre;
    document.getElementById("apellido").value = registro.apellido;
    document.getElementById("fechadecontacto").value = registro.fechadecontacto;
    document.getElementById("monto").value = registro.monto;
    document.getElementById("tipodeconsulta").value = registro.tipodeconsulta;

    document.getElementById("modalEditar").style.display = "block";
}

function cerrarModal() {
    document.getElementById("modalEditar").style.display = "none";
}
