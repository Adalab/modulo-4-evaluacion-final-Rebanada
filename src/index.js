
// Imports

const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
require('dotenv').config();

// Arracar el servidor

const server = express();

// Configuración del servidor

server.use(cors());
server.use(express.json({ limit: '25mb' }));

// Conexion a la base de datos

async function getConnection() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS, // <-- Pon aquí tu contraseña o en el fichero /.env en la carpeta raíz
    database: process.env.DB_NAME || 'recetas_db',
  });

  connection.connect();

  return connection;
}

// Poner a escuchar el servidor

const port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log(`Ya se ha arrancado nuestro servidor: http://localhost:${port}/`);
});

// Endpoints

//TODAS LAS RECETAS
server.get('/recetas', async (req, res) => {
  const selectRecetas = 'SELECT * FROM recetas';

  const conn = await getConnection();
  const [result] = await conn.query(selectRecetas);
  conn.end();
  res.json({ info: { count: result.length }, results: result });
});

//POR ID

server.get('/recetas/:id', async (req, res) => {
  const id = req.params.id;
  const selectReceta = 'SELECT * FROM recetas WHERE id = ?';
  const conn = await getConnection();
  const [result] = await conn.query(selectReceta, id);
  console.log(result);
  conn.end();
  res.json(result);
})

//POST AÑADIR UNA RECETA

server.post('/recetas', async (req, res) => {
  
  const nuevaReceta = req.body;
  try {
    const insert = 'INSERT INTO recetas (nombre, ingredientes, instrucciones) VALUES (?, ?, ?)';
    const conn = await getConnection();
    const [result] = await conn.query(insert, [
      nuevaReceta.nombre,
      nuevaReceta.ingredientes,
      nuevaReceta.instrucciones,
    ]);
    conn.end();
    res.json({
      success: true,
    });
  } catch (error) {
    res.json({
      success: false,
    });
  }
});


//PUT
server.put('/recetas/:id', async (req, res) => {
  const receta = req.params.receta;
  const recetaId = req.params.id;
  const{nombre, ingredientes, instrucciones} = req.body;
  try{
    const update =
    'UPDATE recetas SET nombre=?, ingredientes=?, instrucciones=? WHERE id=?';
    const conn = await getConnection();
    const [result] = await conn.query(update, [
      nombre,
      ingredientes,
      instrucciones,
      recetaId,
    ]);
    conn.end();
    res.json({
      succes: true,
    });
  } catch (error) {
    res.json({
      succes: false,
      message: error
    });
  }
});

//DELETE

server.delete('/recetas/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const deleteSql = 'DELETE FROM recetas WHERE id=?';
    const conn = await getConnection();
    const [result] = await conn.query(deleteSql, [id]);
    conn.end();
    res.json({
      success: true,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error,
    });
  }
});
