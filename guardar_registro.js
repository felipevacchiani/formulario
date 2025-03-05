document.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);
    document.getElementById("identificador").value = params.get("identificador");
    document.getElementById("nombre").value = params.get("nombre");
    document.getElementById("apellido").value = params.get("apellido");
    document.getElementById("fechadecontacto").value = params.get("fechadecontacto");
    document.getElementById("monto").value = params.get("monto");
    document.getElementById("tipodeconsulta").value = params.get("tipodeconsulta");

    document.getElementById("formEditar").addEventListener("submit", function(event) {
        event.preventDefault();

        var formData = new FormData(this);

        fetch("https://script.google.com/macros/s/AKfycbyEvGn6nmN-L89vvOaL7b-YBv8lZaca_aCHMW7537eidUZYFk8V38twg_eOxWAezZUl/exec", {
            method: "POST",
            body: new URLSearchParams(formData)
        })
        .then(response => response.text())
        .then(data => {
            alert("Registro actualizado con éxito");
            window.location.href = "editar_registro.html"; // Redirige al listado
        })
        .catch(error => console.error("Error al actualizar registro:", error));
    });
});
