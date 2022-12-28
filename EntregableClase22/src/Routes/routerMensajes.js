const express = require('express');
const routerMensajes = express.Router()
routerMensajes.use(express.json());
const ContenedorMensajes = require('../Containers/contenedorMensajes');
const objetoMensaje = new ContenedorMensajes('../Persistence/mensajes.txt');
const normalizado = require("../normalizr")


routerMensajes.get('/api/mensajes', async (req, resp) => {
    try {
        const array1 = await objetoMensaje.getMensajes()
        const normalizer = normalizado(array1)
        console.log(normalizer)
        resp.json(array1)
    } catch (error) {
        console.log(error)
    }
})

routerMensajes.post('/api/mensajes', async (req, resp) => {
    const { body } = req
    try {
        const mensaje = await objetoMensaje.nuevoMensaje(body)
        resp.json(mensaje)
    } catch (error) {
        console.log(error)
    }
})