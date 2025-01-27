import { CartsModel } from './models/carts.model.js';

export class CartsManager {
    static async getCarts() {
        return await CartsModel.find().lean();
    }

    static async getCartById(cid) {
        return await CartsModel.findById(cid)
            .populate('products.productId')
            .lean();
    }

    static async addCart(products = []) {
        return await CartsModel.create({ products });
    }

    static async addProductToCart(cid, pid) {
        const cart = await CartsModel.findById(cid);
        if (!cart) {
            return null;
        }
        const existProduct = cart.products.find(
            (product) => product.productId == pid
        );
        if (existProduct) {
            existProduct.quantity++;
        } else {
            cart.products.push({ productId: pid, quantity: 1 });
        }
        return await CartsModel.findByIdAndUpdate(
            cid,
            { products: cart.products },
            { new: true }
        );
    }

    static async deleteProductFromCart(cid, pid) {
        const cart = await CartsModel.findById(cid);
        if (!cart) {
            return { error: 'Carrito no encontrado' };
        }

        const existProduct = cart.products.find(
            (product) => product.productId.toString() === pid
        );

        if (!existProduct) {
            return { error: 'Producto no encontrado en el carrito' };
        }

        cart.products = cart.products.filter(
            (product) => product.productId.toString() !== pid
        );

        const updatedCart = await CartsModel.findByIdAndUpdate(
            cid,
            { products: cart.products },
            { new: true }
        );

        return updatedCart;
    }

    static async updateCart(cid, products) {
        const cart = await CartsModel.findById(cid);
        if (!cart) {
            return null;
        }
        cart.products = products;
        return await CartsModel.findByIdAndUpdate(
            cid,
            { products: cart.products },
            { new: true }
        );
    }

    static async updateProductQuantity(cid, pid, quantity) {
        const cart = await CartsModel.findById(cid);
        if (!cart) {
            return { error: 'Carrito no encontrado' };
        }
        const product = cart.products.find(
            (product) => product.productId.toString() === pid
        );
        if (!product) {
            return { error: 'Producto no encontrado en el carrito' };
        }
        product.quantity = quantity;
        return await CartsModel.findByIdAndUpdate(
            cid,
            { products: cart.products },
            { new: true }
        );
    }

    static async deleteCart(cid) {
        const cart = await CartsModel.findById(cid);
        if (!cart) {
            return { error: 'Carrito no encontrado' };
        }
        cart.products = [];
        return await CartsModel.findByIdAndUpdate(
            cid,
            { products: cart.products },
            { new: true }
        );
    }
}
