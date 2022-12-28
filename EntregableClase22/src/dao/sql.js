import knexLib from "knex";

class ClienteSql{

    constructor(config){
        this.knex = knexLib(config); //coneccion a bd
    }

    crearTabla(){
        return this.knex.schema.dropTableIfExists("articulos")//borra la tabla previa
        .finally(()=>{
            return this.knex.schema.createTable("articulos", tabla=>{
                tabla.increments("idArticulo").primary();
                tabla.string("nombre", 50).notNullable();
                tabla.string("codigo", 10).notNullable();
                tabla.float("precio");
                tabla.integer("stock")
            })
        })
    }

    //CRUD
    //reemplazar con los metodos del ecommerce
    insertarArticulos(articulos){
        return this.knex("articulos").insert(articulos);
    }

    obtenerArticulos(){
        return this.knex("articulos").select("*");
    }

    obtenerArticulosPorId(id){
        return this.knex("articulos").select("*").where("idArticulo", id);
    }

    actualizarArticulo(idArticulo, articulo){
        return this.knex("articulos").where("idArticulo",idArticulo).update(articulo);
    }

    borrarArticulo(idArticulo){
        return this.knex("articulos").where("idArticulo",idArticulo).del();
    }

    actualizarStockArticulo(idArticulo, nuevoStock){
        return this.knex("articulos").where("idArticulo",idArticulo).update({stock: nuevoStock});
    }

    cerrarConexion(){
        return this.knex.destroy();
    }
}

export default ClienteSql;