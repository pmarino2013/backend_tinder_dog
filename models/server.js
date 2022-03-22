const express = require("express");
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = "/api/usuarios";

    //middlewares
    this.middlewares();

    //Rutas
    this.routes();
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
    this.app.use(this.usuariosPath, require("../routes/usuarios"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Escuchando en el puerto ${this.port}`);
    });
  }
}

module.exports = Server;
