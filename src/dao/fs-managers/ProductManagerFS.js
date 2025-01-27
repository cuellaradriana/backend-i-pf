import fs from 'fs';
import {
    checkIfExistsByField,
    generateId,
    validateTypeOfFields,
} from '../../utils/manager.helpers.js';

export class ProductManager {
    static #path = '';

    static setPath(rutaArchivo = '') {
        this.#path = rutaArchivo;
    }

    static async #saveFile(datos = '') {
        if (typeof datos != 'string') {
            throw new Error(
                `error método grabaArchivo - argumento con formato inválido`
            );
        }
        await fs.promises.writeFile(this.#path, datos);
    }

    static async addProduct(fields) {
        let products = await this.getProducts();
        validateTypeOfFields(fields);
        let validateExist = checkIfExistsByField(products, 'code', fields.code);
        if (!validateExist.valid) {
            throw new Error(validateExist.error);
        }
        if (!fields.thumbnails) {
            fields.thumbnails = [];
        }
        let id = generateId(products);
        const newProduct = { id, status: true, ...fields };
        products.push(newProduct);
        await this.#saveFile(JSON.stringify(products, null, '\t'));
        return newProduct;
    }

    static async getProducts() {
        if (fs.existsSync(this.#path)) {
            let products = await fs.promises.readFile(this.#path, 'utf-8');
            return JSON.parse(products);
        } else {
            return [];
        }
    }

    static async getProductById(id) {
        let products = await this.getProducts();
        let product = products.find((product) => product.id === id);
        if (!product) {
            throw new Error(`Error: Producto con id ${id} no encontrado`);
        }
        return product;
    }

    static async updateProduct(id, fields) {
        let products = await this.getProducts();
        let indexProduct = products.findIndex((product) => product.id === id);
        if (indexProduct === -1) {
            throw new Error(`Error: Producto con id ${id} no encontrado`);
        }
        products[indexProduct] = { ...products[indexProduct], ...fields };
        await this.#saveFile(JSON.stringify(products, null, '\t'));
        return products[indexProduct];
    }

    static async deleteProduct(id) {
        let products = await this.getProducts();
        let indexProduct = products.findIndex((product) => product.id === id);
        if (indexProduct === -1) {
            throw new Error(`Error: Producto con id ${id} no encontrado`);
        }
        products.splice(indexProduct, 1);
        await this.#saveFile(JSON.stringify(products, null, '\t'));
        return {
            message: `Producto con id ${id} eliminado con éxito`,
        };
    }
}
