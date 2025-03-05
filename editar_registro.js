document.addEventListener("DOMContentLoaded", () => {
    cargarRegistros();
});

let registros = [];
let registrosPorPagina = 10;
let paginaActual = 1;

function cargarRegistros() {
    fetch('https://script.google.com/macros/s/AKfycbyEvGn6nmN-L89vvOaL7b-YBv8lZaca_aCHMW7537eidUZYFk8V38twg_eOxWAezZUl/exec')
        .then(response => response.json())
        .then(data => {
            if (!Array.isArray(data)) {
                console.error("Error: La respuesta de la API no es un array", data);
                return;
            }

            registros = data;
            if (registros.length === 0) {
                document.querySelector("#tablaRegistros tbody").innerHTML = `<tr><td colspan="7">No hay registros disponibles.</td></tr>`;
            } else {
                mostrarPagina(1);
            }
        })
        .catch(error => console.error('Error al cargar registros:', error));
}

function mostrarPagina(pagina) {
    paginaActual = pagina;
    let tbody = document.querySelector("#tablaRegistros tbody");
    tbody.innerHTML = "";

    let inicio = (pagina - 1) * registrosPorPagina;
    let fin = inicio + registrosPorPagina;
    let registrosPagina = registros.slice(inicio, fin);

    registrosPagina.forEach(registro => {
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

    document.getElementById("pageInfo").textContent = `Página ${pagina} de ${Math.ceil(registros.length / registrosPorPagina)}`;
    document.getElementById("prevPage").disabled = (pagina === 1);
    document.getElementById("nextPage").disabled = (pagina === Math.ceil(registros.length / registrosPorPagina));
}

document.getElementById("prevPage").addEventListener("click", () => {
    if (paginaActual > 1) {
        mostrarPagina(paginaActual - 1);
    }
});

document.getElementById("nextPage").addEventListener("click", () => {
    if (paginaActual < Math.ceil(registros.length / registrosPorPagina)) {
        mostrarPagina(paginaActual + 1);
    }
});

function redirigirAEditar(registro) {
    let url = `editar.html?identificador=${encodeURIComponent(registro.identificador)}&nombre=${encodeURIComponent(registro.nombre)}&apellido=${encodeURIComponent(registro.apellido)}&fechadecontacto=${encodeURIComponent(registro.fechadecontacto)}&monto=${encodeURIComponent(registro.monto)}&tipodeconsulta=${encodeURIComponent(registro.tipodeconsulta)}`;
    window.location.href = url;
}
