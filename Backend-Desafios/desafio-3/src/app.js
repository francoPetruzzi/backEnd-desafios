
const PUERTO = 8081
const express = require("express");
const app = express();

const ProductManager = require ("./product-manager");

const manager = new ProductManager ("./src/productos.json");



app.get("./products", async(req, res) => {
    try {
        const arrayProductos = await manager.leerArchivo();
        let limit = parseInt (req.query.limit);

        if (limit) {
            const arrayConLimite = arrayProductos.slice(0, limit);
            return res.send (arrayConLimite);
        } else {
            return res.send (arrayProductos);
        }

        
    } catch (error) {
        console.log(error);
        return res.send ("Error al procesar la solicitud");
    }
})

app.get("/products/:pid", async (req, res) => {
    try {
        let pid = parseInt(req.params.pdi);
        const buscado = await manager.getProductById(pid);

        if(buscado) {
            return res.send(buscado);
        } else {
            return res.send("Id de producto no encontrado");

        }

    } catch (error) {
        console.log(error);
        res.send("error al buscar el producto")

        
    }
})

app.listen(PUERTO, () => {
    console.log(`Escuchando en http://localhost:${PUERTO}`);
})