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
            console.log("Todos los campos son obligatorios. ¡Completa todos los campos!");
            return;
        }

        if (this.products.some(item => item.code === code)) {
            console.log("El código debe ser único. ¡Ingresa un código diferente!");
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
        };

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

            if(!buscado) {
                console.log("producto no encontrado");
            } else {
                console.log("producto encontrado");
                return buscado
            }


        } catch (error) {
            console.log("No se pudo leer el archivo:", error.message);
        }
    }
      

    async leerArchivo() {
        try {
            const respuesta = await fs.readFile(this.path, "utf-8");
            const arrayProductos = JSON.parse(respuesta);
            return arrayProductos;
        } catch (error) {
            console.log("No se pudo leer el archivo:", error.message);
        }
    }

    async guardarArchivo(arrayProductos) {
        try {
            await fs.writeFile(this.path, JSON.stringify(arrayProductos, null, 2));
        } catch (error) {
            console.log("No se pudo escribir en el archivo:", error.message);
        }
    }

    async updateProduct (id, productoActualizado){
        try {
            const arrayProductos = await this.leerArchivo();

            const index = arrayProductos.findindex(item => item.id === id)

            if(index !== -1) {
                arrayProductos.splice(index, 1, productoActualizado);
                await this.guardarArchivo(arrayProductos)
            } else {
                console.log("no se encontro el producto");
            }
            
        } catch (error) {
            console.log("Error al actualizar el producto:", error.message);
        }
    }

    async deleteProduct (id, productoActualizado){
        try {
            const arrayProductos = await this.leerArchivo();

            const index = arrayProductos.findindex(item => item.id === id)

            if(index !== -1) {
                arrayProductos.splice(index, 1);
                await this.guardarArchivo(arrayProductos)
            } else {
                console.log("no se encontro el producto");
            }
            
        } catch (error) {
            console.log("Error al eliminar el producto:", error.message);
        }
    }
}

const manager = new ProductManager("./productos.json")

const arroz = {
    title: "arroz",
    description: "ef",
    price: 250,
    img: "asd",
    code:"asdddd",
    stock: "1234",
}

manager.addProduct(arroz)