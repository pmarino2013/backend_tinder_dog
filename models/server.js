const express = require("express");
const { dbConnection } = require("../database/config"); //importando la conf de la conexión con la BD
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.authPath = "/api/auth";
    this.usuariosPath = "/api/usuarios";
    this.categoriasPath = "/api/categorias";
    //Path de productos 🤔

    //conectar BD
    this.conectarDB();

    //middlewares
    this.middlewares();

    //Rutas
    this.routes();
  }

  //llamando función para conectar base de datos
  async conectarDB() {
    await dbConnection();
  }

  //middlewares

  middlewares() {
    //CORS
    this.app.use(cors());

    //lectura y parseo del body
    this.app.use(express.json());

    //directorio público
    this.app.use(express.static("public"));
  }

  //Rutas
  routes() {
    this.app.use(this.authPath, require("../routes/auth"));
    this.app.use(this.usuariosPath, require("../routes/usuarios"));
    this.app.use(this.categoriasPath, require("../routes/categorias"));
    //ruta de productos 🤔
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Escuchando en el puerto ${this.port}`);
    });
  }
}

module.exports = Server;
