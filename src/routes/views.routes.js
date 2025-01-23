import { Router } from 'express';
import { ProductManager } from '../dao/ProductManager.js';
import { productsPath } from './products.routes.js';
ProductManager.setPath(productsPath);

export const router = Router();

router.get('/', async (req, res) => {
    try {
        const products = await ProductManager.getProducts();
        res.render('home', { products });
    } catch (error) {
        res.render('errorServer', { error });
    }
});

router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts');
});
