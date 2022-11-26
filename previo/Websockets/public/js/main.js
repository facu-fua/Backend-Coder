const socket = io.connect();

const newProduct = () =>{
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

const renderProductos = (data) =>{
    console.log(data)
    const html = data.map((elem, index) => {
            return `
            <tr>
                <td>${elem.id}</td>
                <td>${elem.title}</td>
                <td>${elem.price}</td>
                <td><img src="${elem.thumbnail}"></td>
            </tr>
            `;
        })
        .join(" ");
    document.getElementById("tbody").innerHTML = html;
}
socket.on("productos", function (data) {
    renderProductos(data);
});

function addMessage() {
    const nombre = document.getElementById("nombre").value;
    const mensaje = document.getElementById("mensaje").value;

    const nuevoMensaje = {
        fecha: Date(),
        nombre: nombre,
        mensaje: mensaje,
    };

    socket.emit("new-message", nuevoMensaje);
    return false;
}

function renderChat(data) {
    const html = data.map((elem, index) => {
        return `
            <div>
            <strong>${elem.nombre} ${elem.fecha}</strong>:
            <em>${elem.mensaje}</em>
            </div>
            `;
        })
        .join(" ");

    document.getElementById("messages").innerHTML = html;
}

socket.on("mensajes", function (data) {
    renderChat(data);
});