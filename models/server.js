const express = require("express");
//Para manejar la subida de archivos
const fileUpload = require("express-fileupload");

const { dbConnection } = require("../database/config"); //importando la conf de la conexión con la BD
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.authPath = "/api/auth";
    this.usuariosPath = "/api/usuarios";
    this.categoriasPath = "/api/categorias";
    this.productosPath = "/api/productos";
    this.buscarPath = "/api/buscar";
    this.uploadsPath = "/api/uploads";

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

    //fileupload - carga de archivos
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath: true,
      })
    );
  }

  //Rutas
  routes() {
    this.app.use(this.authPath, require("../routes/auth"));
    this.app.use(this.usuariosPath, require("../routes/usuarios"));
    this.app.use(this.categoriasPath, require("../routes/categorias"));
    this.app.use(this.productosPath, require("../routes/producto"));
    this.app.use(this.buscarPath, require("../routes/buscar"));
    this.app.use(this.uploadsPath, require("../routes/uploads"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Escuchando en el puerto ${this.port}`);
    });
  }
}

module.exports = Server;
