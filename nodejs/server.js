const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();
const port = 3000;

// Crear o conectar a la base de datos SQLite
const dbPath = path.join(__dirname, 'mensajes.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error al conectar con la base de datos SQLite:', err);
    } else {
        console.log('Conectado a la base de datos SQLite');
    }
});

// Crear la tabla si no existe
db.run(`CREATE TABLE IF NOT EXISTS mensajes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT,
    email TEXT,
    mensaje TEXT
)`);

// Middleware para manejar datos POST
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/api/enviar-mensaje', (req, res) => {
    const { nombre, email, mensaje } = req.body;

    // Guardar los datos en la base de datos SQLite
    const query = `INSERT INTO mensajes (nombre, email, mensaje) VALUES (?, ?, ?)`;
    db.run(query, [nombre, email, mensaje], function(err) {
        if (err) {
            console.error('Error al guardar el mensaje en la base de datos:', err);
            res.status(500).json({ error: 'Error al enviar el mensaje' });
        } else {
            console.log('Mensaje guardado en la base de datos con ID:', this.lastID);
            res.status(200).json({ mensaje: 'Mensaje enviado correctamente' });
        }
    });
});

app.listen(port, () => {
  console.log(`Servidor Node.js escuchando en el puerto ${port}`);
});

process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error('Error al cerrar la conexión con la base de datos:', err);
        } else {
            console.log('Conexión con la base de datos cerrada');
        }
        process.exit();
    });
});