const fs = require("fs")

class Contenedor {
    constructor(fileName) {
        this.fileName = fileName;
    }

    save(product) {
        this.getAll().then((productArray) => {
            if (productArray) {
                if (productArray.length) {
                    product.id = productArray[productArray.length - 1].id + 1
                }
                else {
                    product.id = 1
                    productArray = []
                }
                productArray.push(product)
                try {
                    fs.writeFileSync(this.fileName, JSON.stringify(productArray, null, 2))
                    console.log("Se guardo el objeto con exito")
                } catch (error) {
                    console.error(error)
                }
            }
            else{
                console.error("No se pudo traer los productos")
            }
        })
    }
    getById(id) {
        this.getAll().then((productArray) => {
                if (productArray.length) {
                    let product = productArray.find(producto => producto.id === id)
                    if (product) {
                        console.log(product)
                        return product;
                    }
                    else {
                        console.log(`No existe el producto con id: ${id}`)
                    }
                }
                else {
                    console.log(`El archivo está vacio`)
                }
        })
    }
    async getAll() {
        try {
            let products = fs.readFileSync(this.fileName, 'utf-8')
            return JSON.parse(products)
        }
        catch (e) {
            console.error(e)
            return []
        }
    }
    deleteById(id) {
        this.getAll().then((productArray) => {
                if (productArray.length) {
                    let index = productArray.findIndex(producto => producto.id === id);
                    if (index != -1) {
                        productArray.splice(index, 1);
                        fs.writeFileSync(this.fileName, JSON.stringify(productArray, null, 2))
                        console.log(`Se borro correctamente el producto con id: ${id}`)
                    }
                    else {
                        console.log(`No existe el producto con id: ${id}`)
                    }
                }
                else {
                    console.log(`El archivo está vacio`)
                }
        })
    }
    deleteAll() {
        let emptyProductArray = []
        try {
            fs.writeFileSync(this.fileName, JSON.stringify(emptyProductArray, null, 2))
            console.log("Se borraron todos los productos correctamente")
        } catch (error) {
            console.error(error)
        }
    }
}
module.exports = Contenedor
