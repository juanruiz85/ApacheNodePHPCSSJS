const form = document.getElementById('contact-form');
const mensajeRespuesta = document.getElementById('mensaje-respuesta');
let mensajeTimeout; // Variable para almacenar el timeout actual

form.addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar que el formulario se envíe de forma tradicional

    const formData = new FormData(form);

    // Enviar los datos del formulario usando fetch a process.php
    fetch('process.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json()) // Convertir la respuesta a JSON
    .then(data => {
        if (data.mensaje) {
            mostrarMensaje(data.mensaje, 'success'); // Mostrar mensaje de éxito con fondo verde
        } else if (data.error) {
            mostrarMensaje(data.error, 'error'); // Mostrar mensaje de error con fondo rojo
        }
    })
    .catch(error => {
        console.error('Error:', error);
        mostrarMensaje('Error en la conexión con el servidor', 'error'); // Mostrar error de conexión con fondo rojo
    });
});

function mostrarMensaje(mensaje, tipo) {
    if (mensajeTimeout) {
        clearTimeout(mensajeTimeout); // Limpiar cualquier timeout anterior
    }

    mensajeRespuesta.textContent = mensaje;

    // Cambiar el color de fondo según el tipo de mensaje
    if (tipo === 'success') {
        mensajeRespuesta.style.backgroundColor = '#4CAF50'; // Fondo verde para éxito
    } else if (tipo === 'error') {
        mensajeRespuesta.style.backgroundColor = '#f44336'; // Fondo rojo para error
    }

    mensajeRespuesta.style.display = 'block';

    mensajeTimeout = setTimeout(() => {
        mensajeRespuesta.style.display = 'none';
    }, 3000);
}
