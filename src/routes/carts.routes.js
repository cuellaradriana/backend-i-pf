import { Router } from 'express';
import { validateId } from '../utils/validators.js';
import { CartManager } from '../dao/CartManager.js';

export const router = Router();

const cartsPath = './src/data/carts.json';
CartManager.setPath(cartsPath);

router.post('/', async (req, res) => {
    try {
        const { products } = req.body;
        if (!products) {
            res.setHeader('Content-Type', 'application/json');
            return res
                .status(400)
                .json({ error: 'No se puede crear un carrito sin productos' });
        }
        const cart = await CartManager.addCart(products);
        res.setHeader('Content-Type', 'application/json');
        res.status(201).json({ cart });
    } catch (error) {
        res.setHeader('Content-Type', 'application/json');
        res.status(400).json({ error: error.message });
    }
});
router.get('/:cid', async (req, res) => {
    try {
        let { cid } = req.params;
        cid = parseInt(cid);
        const isValidId = validateId(cid);
        if (!isValidId.valid) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(400).json({ error: isValidId.error });
        }
        const cart = await CartManager.getCartById(cid);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({ cart });
    } catch (error) {
        res.setHeader('Content-Type', 'application/json');
        res.status(404).json({ error: error.message });
    }
});
router.post('/:cid/product/:pid', async (req, res) => {
    try {
        let { cid, pid } = req.params;
        cid = parseInt(cid);
        pid = parseInt(pid);
        const isValidId = validateId(cid) && validateId(pid);
        if (!isValidId.valid) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(400).json({ error: isValidId.error });
        }
        const updateCart = await CartManager.addProductToCart(cid, pid);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({ updateCart });
    } catch (error) {
        res.setHeader('Content-Type', 'application/json');
        res.status(404).json({ error: error.message });
    }
});
