import { Router } from 'express';
import { ProductsManager } from '../dao/ProductsManager.js';
import { CartsManager } from '../dao/CartsManager.js';
export const router = Router();

router.get('/', async (req, res) => {
    const { limit, page, query, value, sort } = req.query;

    try {
        const products = await ProductsManager.getProducts(
            {
                limit,
                page,
                query,
                value,
                sort,
            },
            'views'
        );
        const {
            payload,
            currentPage,
            totalPages,
            prevPage,
            nextPage,
            hasPrevPage,
            hasNextPage,
            prevLink,
            nextLink,
        } = products;
        res.render('home', {
            payload,
            currentPage,
            totalPages,
            prevPage,
            nextPage,
            hasPrevPage,
            hasNextPage,
            prevLink,
            nextLink,
        });
    } catch (error) {
        res.render('errorServer', { error });
    }
});

router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts');
});

router.get('/products/:pid', async (req, res) => {
    const { pid } = req.params;
    try {
        const product = await ProductsManager.getProductById(pid);
        res.render('product', { product });
    } catch (error) {
        res.render('errorServer', { error });
    }
});

router.get('/cart/:cid', async (req, res) => {
    const { cid } = req.params;
    try {
        const cart = await CartsManager.getCartById(cid);

        const products = cart.products.map((product) => ({
            ...product,
            total: product.productId.price * product.quantity,
        }));
        cart.products = products;
        cart.totalCart = cart.products.reduce(
            (acc, product) => acc + product.total,
            0
        );
        res.render('cart', { cart });
    } catch (error) {
        res.render('errorServer', { error });
    }
});

router.get('/cartempty', async (req, res) => {
    res.render('cartempty');
});
