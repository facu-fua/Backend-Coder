class usuario{

    constructor(nombre, apellido, libros, mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    };

    getFullName(){
        return `El nombre del usuario es ${this.nombre}`
    }

    addMascota(mascota){
        this.mascotas.push(mascota)
    }

    countMascotas(){
        return this.mascotas.length
    }

    addBook(nombre,autor){
        this.libros.push(
            {
            nombre: nombre, 
            autor: autor
        })
    }

    getBookNames(){
        let array = []
        this.libros.forEach(libro =>{
            console.log(libro)
            array.push(libro.nombre)
        })
        return array
    }
}


const usuario1 = new usuario("Carlos","Fernandez", [{nombre:"Dada", autor: "Alberto"}], ["Blanca","Apolo"])
usuario1.addBook("hello","alvarez")
console.log(usuario1.getFullName())
usuario1.addMascota("lala")
console.log(usuario1.countMascotas(), usuario1.mascotas)
console.log(usuario1.getBookNames())