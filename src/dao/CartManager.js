import fs from 'fs';
import { generateId } from '../utils/manager.helpers.js';
import { ProductManager } from './ProductManager.js';

export class CartManager {
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

    static async addCart(products = []) {
        let carts = await this.getCarts();
        let id = generateId(carts);
        const newCart = {
            id,
            products: products.map((product) => ({
                productId: product.id,
                quantity: 1,
            })),
        };
        carts.push(newCart);
        await this.#saveFile(JSON.stringify(carts, null, '\t'));
        return newCart;
    }

    static async getCarts() {
        if (fs.existsSync(this.#path)) {
            let carts = await fs.promises.readFile(this.#path, 'utf-8');
            return JSON.parse(carts);
        } else {
            return [];
        }
    }

    static async getCartById(id) {
        let carts = await this.getCarts();
        let cart = carts.find((cart) => cart.id === id);
        if (!cart) {
            throw new Error(`Error: Carrito con id ${id} no encontrado`);
        }
        return cart;
    }

    static async addProductToCart(cid, pid) {
        let carts = await this.getCarts();
        let cart = carts.find((cart) => cart.id === cid);
        if (!cart) {
            throw new Error(`Error: Carrito con id ${cid} no encontrado`);
        }

        const exitsProduct = await ProductManager.getProductById(pid);
        if (!exitsProduct) {
            throw new Error(`Error: Producto con id ${pid} no encontrado`);
        }

        let productInCart = cart.products.find(
            (product) => product.productId === pid
        );
        if (productInCart) {
            productInCart.quantity++;
        } else {
            cart.products.push({ productId: pid, quantity: 1 });
        }

        await this.#saveFile(JSON.stringify(carts, null, '\t'));
        return cart;
    }
}
