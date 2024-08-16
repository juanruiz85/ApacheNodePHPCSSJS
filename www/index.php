<!DOCTYPE html>
<html>
<head>
    <title>Formulario con Mensaje Flotante</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Formulario de Contacto</h1>
    <form id="contact-form">
        <input type="text" name="nombre" placeholder="Nombre" required>
        <input type="email" name="email" placeholder="Correo electrónico" required>
        <textarea name="mensaje" placeholder="Mensaje" required></textarea>
        <button type="submit">Enviar</button> 
    </form>

    <div id="mensaje-respuesta" class="mensaje-oculto"></div>

    <script src="script.js"></script>
</body>
</html>