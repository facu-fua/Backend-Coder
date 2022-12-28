const socket = io.connect(); /* error: not defined? */

const newProduct = () => {
    let titulo = document.getElementById("titulo").value;
    let precio = document.getElementById("precio").value;
    let url = document.getElementById("url").value;

    const nuevoProducto = {
        title: titulo,
        price: precio,
        thumbnail: url,
    }
    socket.emit("new-product", nuevoProducto);
    return false;
}
/* const formEventeHandler = () =>{
    let submit = document.getElementById("formSubmit");
    submit.onclick((e) =>{
        e.preventDefault();
        newProduct();
    })
} */

const renderProductos = (data) => {
    console.log(data)
    const html = data.map((elem, index) => {
            return `
            <tr>
                <td>${elem.id}</td>
                <td>${elem.title}</td>
                <td>${elem.price}</td>
                <td><img src="${elem.thumbnail}"></td>
                <td>
                <div class="botonProducto">
                <button onclick="modificarProducto(${elem.id})">Modificar</button>
                <button onclick="borrarProducto(${elem.id})">Eliminar</button>
                </div>
                </td>
            </tr>
            `;
        })
        .join(" ");
    document.getElementById("tbody").innerHTML = html;
}
socket.on("productos", function (data) {
    renderProductos(data);
});

function borrarProducto(id) {
    socket.emit("delete-product", id);
    return false
}

function modificarProducto(id) {
    console.log(`Modificado ${id}`) //tiene que abrir un formulario con los datos del producto, y permitir modificarlos
}


function addMessage() {
    const email = document.getElementById("email").value;
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const edad = document.getElementById("edad").value;
    const alias = document.getElementById("alias").value;
    const avatar = document.getElementById("avatar").value;
    const mensaje = document.getElementById("mensaje").value;

    const nuevoMensaje = {
        author: {
            id: email,
            nombre: nombre,
            apellido: apellido,
            edad: edad,
            alias: alias,
            avatar: avatar
        },
        text: mensaje
    };
    console.log(nuevoMensaje)
    socket.emit("new-message", nuevoMensaje);
    return false;
}

function renderChat(data) {
    console.log(data)
    const html = data.map((elem, index) => {
            return `
            <div>
            <strong>${elem.author.alias}</strong>:
            <em>${elem.text}</em>
            </div>
            `;
        })
        .join(" ");

    document.getElementById("messages").innerHTML = html;
}

socket.on("mensajes", function (data) {
    renderChat(data);
});