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
            registros = data;
            mostrarPagina(1);
        })
        .catch(error => console.error('Error al cargar registros:', error));
}

function mostrarPagina(pagina) {
    paginaActual = pagina;
    let tbody = document
