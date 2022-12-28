const normalizr = require("normalizr");
const normalize = normalizr.normalize;
const schema = normalizr.schema;
const denormalize = normalizr.denormalize;

//Aca va el objeto obtenido ya sea de la DB o de un archivo local


//Esquema del objeto normalizado
const author = new schema.Entity("author", {}, {
    idAttribute: "email"
});
const text = new schema.Entity("text");
const messagge = new schema.Entity("messagge", {
    author: author,
    text: text
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
    const chatDesnormalizado = denormalize(chatNormalizado.result, chat, chatNormalizado.entities);
    print(chatDesnormalizado)

    //Longitudes y % compresion
    const longitudOriginal = JSON.stringify(data).length;
    const longitudNormalized = JSON.stringify(chatNormalizado).length;
    const longitudDenormalized = JSON.stringify(chatDesnormalizado).length;
    const porcentajeCompresion = (longitudNormalized * 100) / longitudOriginal;
    print(`Compresion: ${porcentajeCompresion.toFixed(2)}%`)
}

export default normalizado;