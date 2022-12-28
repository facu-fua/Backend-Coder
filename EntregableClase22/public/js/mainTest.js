const faker = require("@faker-js/faker");
const fs = require("fs");
faker.locale = "es";

let productos = [];

const productosFaker = () =>{
    for (i=0; i<5; i++){
        let producto = {
            nombre: faker.commerce.product(),
            precio: faker.commerce.price(),
            imagen: faker.image.imageUrl(50,50,true)
        }
        productos.push(producto)
    }
}

const renderProductosFaker = () =>{
    productosFaker();
    const body = document.getElementById("tbodyTest");
    const html = productos.map((elem, index) => {
        return `
        <tr>
            <td>${elem.nombre}</td>
            <td>${elem.precio}</td>
            <td><img src="${elem.imagen}"></td>
        </tr>
        `;
    })
    .join(" ");
    body.innerHTML = html;
}

renderProductosFaker();