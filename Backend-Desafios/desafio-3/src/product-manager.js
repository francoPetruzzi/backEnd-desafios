const fs = require("fs").promises;

class ProductManager {
    static ultId = 0;

    constructor(path) {
        this.products = [];
        this.path = path;
    }

    

    async addProduct(nuevoObjeto) {
        let { title, description, price, img, code, stock } = nuevoObjeto;

        if (!title || !description || !price || !img || !code || !stock) {
            console.log("Todos los campos son obligatorios, completalo o moriras en 24 hs");
            return;
        }

        if (this.products.some(item => item.code === code)) {
            console.log("El codigo debe ser unico, rata de dos patas!");
            return;
        }

        const newProduct = {
            id: ++ProductManager.ultId,
            title,
            description,
            price,
            img,
            code,
            stock
        }


        this.products.push(newProduct);

        

        await this.guardarArchivo(this.products);

    }

    getProducts() {
        console.log(this.products);
    }

    async getProductById(id) {
        try {
            const arrayProductos = await this.leerArchivo();
            const buscado = arrayProductos.find(item => item.id === id);

            if (!buscado) {
                console.log("Producto no encontrado");
            } else {
                console.log("Siii, lo encontramos! ");
                return buscado;
            }

        } catch (error) {
            console.log("Error al leer el archivo ", error);
        }

    }

    

    async leerArchivo() {
        try {
            const respuesta = await fs.readFile(this.path, "utf-8");
            const arrayProductos = JSON.parse(respuesta);
            return arrayProductos;

        } catch (error) {
            console.log("Eerror al leer un archivo", error);
        }
    }

    async guardarArchivo(arrayProductos) {
        try {
            await fs.writeFile(this.path, JSON.stringify(arrayProductos, null, 2));
        } catch (error) {
            console.log("Error al guardar el archivo", error);
        }
    }

    
    async updateProduct(id, productoActualizado) {
        try {
            const arrayProductos = await this.leerArchivo();

            const index = arrayProductos.findIndex(item => item.id === id);

            if (index !== -1) {
                
                arrayProductos.splice(index, 1, productoActualizado);
                await this.guardarArchivo(arrayProductos);
            } else {
                console.log("no se encontró el producto");
            }

        } catch (error) {
            console.log("Error al actualizar el producto", error);
        }
    }

    async deleteProduct(id) {
        try {
            const existingProducts = await this.leerArchivo();
            const indexToDelete = existingProducts.findIndex(product => product.code === code);
            
            if (indexToDelete === -1) {
                console.log("Producto no encontrado. ¡Ingresa un código válido!");
                return;
            }
            
            existingProducts.splice(indexToDelete, 1);

            await this.guardarArchivo(existingProducts);

            console.log("Producto eliminado exitosamente.");
            
        } catch (error) {
            console.log("Error al eliminar el producto:", error.message);
        }
    }

}

module.exports = ProductManager;