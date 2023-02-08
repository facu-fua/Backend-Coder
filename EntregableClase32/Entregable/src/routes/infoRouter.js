import express from "express";
import compression from "compression";
const os = require('os')
import logger from "../../logger"

const args = process.argv.slice(2);
const nroCPUs = os.cpus().length;
const info = {
    processid: `ID del proceso: ${process.pid}`,
    nodeversion: `Version node.js: ${process.version}`,
    system: `Sistema operativo: ${process.platform}`,
    rss: `Memoria utilizada: ${Math.round((process.memoryUsage().rss/1024)/1024)} MB`,
    dirname: `Ruta del proyecto: ${process.cwd().replace(/\\/g, '/')}`,
    args: `Argumentos: ${args}`,
    execpath: `Ruta ejecucion del entorno: ${process.execPath.replace(/\\/g, '/')}}`,
    cpus: `Numero cpus: ${nroCPUs}`
    }

const infoRouter = express.Router();
infoRouter.get("/info", compression(), (req, res) => {
    //console.log("console.log bloqueante")
    logger.info("Route: /info/compress Method: GET ");
    res.send(info)
})

export default infoRouter;