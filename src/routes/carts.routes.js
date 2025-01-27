import { Router } from 'express';
import { CartsManager } from '../dao/CartsManager.js';
import { isValidObjectId } from 'mongoose';
import { ProductsManager } from '../dao/ProductsManager.js';
import { manageErrorClient, manageErrorServer } from '../utils/errors.js';
import { validateProducts } from '../utils/validators.js';

//!!Para trabajar con FileSystem
// import { validateId } from '../utils/validators.js';
// import { CartManager } from '../dao/fs-managers/CartManagerFS.js';
// const cartsPath = './src/data/carts.json';
// CartManager.setPath(cartsPath);

export const router = Router();

router.get('/', async (req, res) => {
    try {
        const carts = await CartsManager.getCarts();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({ carts });
    } catch (error) {
        manageErrorServer(res, error);
    }
});

router.get('/:cid', async (req, res) => {
    let { cid } = req.params;
    if (!isValidObjectId(cid)) {
        return manageErrorClient(res, 400, 'ID inválido');
    }
    try {
        const cart = await CartsManager.getCartById(cid);
        if (!cart) {
            return manageErrorClient(res, 404, 'Carrito no encontrado');
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({ cart });
    } catch (error) {
        manageErrorServer(res, error);
    }
});

router.post('/', async (req, res) => {
    const { products } = req.body;
    const isValid = validateProducts(products, res);
    if (!isValid) return;
    try {
        const cart = await CartsManager.addCart(products);
        res.setHeader('Content-Type', 'application/json');
        res.status(201).json({ cart });
    } catch (error) {
        manageErrorServer(res, error);
    }
});

router.post('/:cid/product/:pid', async (req, res) => {
    let { cid, pid } = req.params;
    if (!isValidObjectId(cid) || !isValidObjectId(pid)) {
        return manageErrorClient(res, 400, 'Alguno de los ids no es válido');
    }
    try {
        const existProduct = await ProductsManager.getProductById(pid);
        if (!existProduct) {
            return manageErrorClient(res, 404, 'Producto no encontrado');
        }
        const updateCart = await CartsManager.addProductToCart(cid, pid);
        if (!updateCart) {
            return manageErrorClient(res, 404, 'Carrito no encontrado');
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({ updateCart });
    } catch (error) {
        manageErrorServer(res, error);
    }
});

router.put('/:cid', async (req, res) => {
    const { cid } = req.params;
    const { products } = req.body;
    if (!isValidObjectId(cid)) {
        return manageErrorClient(res, 400, 'ID inválido');
    }
    const isValid = validateProducts(products, res);
    if (!isValid) return;
    try {
        const updatedCart = await CartsManager.updateCart(cid, products);
        if (!updatedCart) {
            return manageErrorClient(res, 404, 'Carrito no encontrado');
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({ updatedCart });
    } catch (error) {
        manageErrorServer(res, error);
    }
});

router.put('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    if (!isValidObjectId(cid) || !isValidObjectId(pid)) {
        return manageErrorClient(res, 400, 'Alguno de los ids no es válido');
    }
    if (!quantity || quantity <= 0) {
        return manageErrorClient(res, 400, 'Quantity debe ser mayor a 0');
    }
    try {
        const result = await CartsManager.updateProductQuantity(
            cid,
            pid,
            quantity
        );
        if (result?.error === 'Carrito no encontrado') {
            return manageErrorClient(res, 404, 'Carrito no encontrado');
        }
        if (result?.error === 'Producto no encontrado en el carrito') {
            return manageErrorClient(
                res,
                404,
                'Producto no encontrado en el carrito'
            );
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({
            message: 'Cantidad actualizada',
            cart: result,
        });
    } catch (error) {
        manageErrorServer(res, error);
    }
});

router.delete('/:cid', async (req, res) => {
    const { cid } = req.params;
    if (!isValidObjectId(cid)) {
        return manageErrorClient(res, 400, 'ID inválido');
    }
    try {
        const result = await CartsManager.deleteCart(cid);
        if (result?.error === 'Carrito no encontrado') {
            return manageErrorClient(res, 404, 'Carrito no encontrado');
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({
            message: 'Carrito eliminado',
            cart: result,
        });
    } catch (error) {}
});

router.delete('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    if (!isValidObjectId(cid) || !isValidObjectId(pid)) {
        return manageErrorClient(res, 400, 'Alguno de los ids no es válido');
    }
    try {
        const result = await CartsManager.deleteProductFromCart(cid, pid);

        if (result?.error === 'Carrito no encontrado') {
            return manageErrorClient(res, 404, 'Carrito no encontrado');
        }
        if (result?.error === 'Producto no encontrado en el carrito') {
            return manageErrorClient(
                res,
                404,
                'Producto no encontrado en el carrito'
            );
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({
            message: 'Producto eliminado del carrito',
            cart: result,
        });
    } catch (error) {
        manageErrorServer(res, error);
    }
});
