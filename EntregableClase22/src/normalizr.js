const normalizr = require("normalizr");
const normalize = normalizr.normalize;
const schema = normalizr.schema;
const denormalize = normalizr.denormalize;
const util = require("util")

//Aca va el objeto obtenido ya sea de la DB o de un archivo local

const ContenedorMensajes = require("./Containers/contenedorMensajes");
const objetoMensaje = new ContenedorMensajes("./Persistence/mensajes.txt");
const obtenerMensajes = async () => {
    try {
        const array = await objetoMensaje.getMensajes()
        const objeto = {
            id: 1,
            chats: array
        }
        return objeto
    } catch (error) {
        console.log(error)
    }
};
const mensajes = obtenerMensajes()
const dataC = {
    id: 1,
    chat: [{
            "author": {
                "id": "facu@jeje.com",
                "nombre": "Facundo",
                "apellido": "Fajardo",
                "edad": "96",
                "alias": "facu",
                "avatar": ""
            },
            "text": "qweqweq"
        },
        {
            "author": {
                "id": "facu@hotmail.com",
                "nombre": "Facundo",
                "apellido": "Fajardo",
                "edad": "76",
                "alias": "facu",
                "avatar": "www.image.com"
            },
            "text": "wwweeeqq"
        }
    ]
}
//Esquema del objeto normalizado TERMINAR
const author1 = new schema.Entity("author", {Entity: {}});
const text1 = new schema.Entity("text")
const messagge = new schema.Entity("messagge", {
    author: author1,
    text: text1
})
const chat = new schema.Entity("chat", {
    chat: [messagge]
})

function print(obj) {
    console.log(util.inspect(obj, false, null, true))
}

// Normalizado
const normalizado = (data) => {
    const chatNormalizado = normalize(data, chat);
    print(chatNormalizado);

    // Desnormalizado
    //const chatDesnormalizado = denormalize(chatNormalizado.result, chat, chatNormalizado.entities);
    //print(chatDesnormalizado)

    //Longitudes y % compresion
    //const longitudOriginal = JSON.stringify(data).length;
    //const longitudNormalized = JSON.stringify(chatNormalizado).length;
    //const longitudDenormalized = JSON.stringify(chatDesnormalizado).length;
    //const porcentajeCompresion = (longitudNormalized * 100) / longitudOriginal;
    //print(`Compresion: ${porcentajeCompresion.toFixed(2)}%`)
}

normalizado(mensajes);
normalizado(dataC)

//export default normalizado;