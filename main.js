const fs = require('fs');
const express = require('express');

const app = express();

const server = app.listen(8080, () => {
    console.log(('listening in ' + 8080) );
});

server.on('error', err => console.log('hubo un error: ' + err))

class Contenedor {
    constructor (nombre) {
        this.nombre = nombre
    }

    getProducts() {
        app.get('/productos', (req, res) => {
            fs.promises.readFile('productos.txt', 'utf-8')
            .then(file => {
                res.send(JSON.parse(file));
            })
            .catch(err => {
                throw new Error('error: ', err)
            })
        })
    }

    getRandomProduct() {
        app.get('/productoRandom', (req, res) => {
            let Num = Math.floor(Math.random() * 3)
        
            fs.promises.readFile('productos.txt', 'utf-8')
            .then(file => {
                JSON.parse(file).find( (el) => {
                    if (el.id === Num) {
                        res.send(el);
                    } 
                })
            })
            .catch(err => {
                throw new Error('error: ', err)
            })
        })
    }
}

const uli = new Contenedor('Ulises');

uli.getProducts()

uli.getRandomProduct()






