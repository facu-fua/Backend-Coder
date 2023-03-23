import productosModel from "../models/producto.js"
import mongoose from "mongoose"

class productDao{

    constructor(){
        this.productDao = new productosModel()
        //TODO connection to mongoDB in a connection file and import?
    }

    getProduct = async (id) =>{
        if(id){
            let product = ""//find the product with the given id in mongoDB;
            return product;
        }else{
            let products = "allproducts from DB";
            return products;
        }
    }
}

//TODO do the same for the rest of CRUD