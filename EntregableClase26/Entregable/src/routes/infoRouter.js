import express from "express";

const infoRouter = express.Router();

infoRouter.get("/info", (req, res) => {
/* una vista sencilla los siguientes datos:
- Argumentos de entrada
- Path de ejecución
- Nombre de la plataforma (sistema operativo)
- Process id
- Versión de node.js
- Carpeta del proyecto
- Memoria total reservada (rss)
*/
})

export default infoRouter;