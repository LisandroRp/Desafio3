const express = require('express');
const app = express();
const Contenedor = require('./Contenedor.js');

const contenedor = new Contenedor('./productos.txt');
let products = [];

const server = app.listen(8080, async () => {
    console.log(`Servidor Corriendo en el puerto: ${server.address().port}`)
    let data = await contenedor.getAll();
    products = data;
});

app.get('/', (req, res) => {
    res.json(`Servidor Corriendo en el puerto: ${server.address().port}`);
})

app.get('/productos', (req, res) => {
    if (products.length > 0) {
        res.json({
            products: products
        }) 
    } else {
        res.send('El archivo está vacio')
    }
})

app.get('/productoRandom', (req, res) => {

    if (products.length > 0) {    
        let randomProduct = products[Math.floor(Math.random()*products.length)];
        res.json({
            product: randomProduct
        })
    } else {
        console.log('El archivo está vacio');
        res.send('El archivo está vacio')
    }  
})