import { Router } from 'express';
import { ProductManager } from '../dao/ProductManager.js';
import {
    findEmptyFieldsProducts,
    validateAllowedFields,
    validateId,
    validateNoIdInBody,
} from '../utils/validators.js';
import { io } from '../app.js';

export const router = Router();
export const productsPath = './src/data/products.json';
ProductManager.setPath(productsPath);

router.get('/', async (req, res) => {
    try {
        const { limit } = req.query;
        const products = await ProductManager.getProducts();
        const limitNumber = limit ? parseInt(limit) : products.length;
        const limitedProducts = products.slice(0, limitNumber);

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({ products: limitedProducts });
    } catch (error) {
        res.status(500).json({
            error: 'Hubo un error al recuperar los productos',
        });
    }
});

router.get('/:pid', async (req, res) => {
    try {
        let { pid } = req.params;
        pid = parseInt(pid);
        const isValidId = validateId(pid);
        if (!isValidId.valid) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(400).json({ error: isValidId.error });
        }
        const product = await ProductManager.getProductById(pid);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({ product });
    } catch (error) {
        res.setHeader('Content-Type', 'application/json');
        res.status(404).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const { thumbnails, ...fieldsToValidate } = req.body;
        const noIdInBody = validateNoIdInBody(req.body);
        const emptyFields = findEmptyFieldsProducts(fieldsToValidate);
        if (!emptyFields.valid || !noIdInBody.valid) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(400).json({
                error: emptyFields.error || noIdInBody.error,
            });
        }
        const product = await ProductManager.addProduct(req.body);
        req.io.emit('newProduct', product);
        res.setHeader('Content-Type', 'application/json');
        res.status(201).json({ product });
    } catch (error) {
        res.setHeader('Content-Type', 'application/json');
        res.status(400).json({ error: error.message });
    }
});

router.put('/:pid', async (req, res) => {
    try {
        let { pid } = req.params;
        pid = parseInt(pid);
        const isValidId = validateId(pid);
        const noIdInBody = validateNoIdInBody(req.body);
        const allowedFields = validateAllowedFields(req.body);
        if (!isValidId.valid || !allowedFields.valid || !noIdInBody.valid) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(400).json({
                error:
                    isValidId.error || noIdInBody.error || allowedFields.error,
            });
        }
        const productToUpdate = await ProductManager.updateProduct(
            pid,
            req.body
        );
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({ productToUpdate });
    } catch (error) {
        res.setHeader('Content-Type', 'application/json');
        res.status(400).json({ error: error.message });
    }
});

router.delete('/:pid', async (req, res) => {
    try {
        let { pid } = req.params;
        pid = parseInt(pid);
        const isValidId = validateId(pid);
        if (!isValidId.valid) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(400).json({ error: isValidId.error });
        }
        const productToDelete = await ProductManager.deleteProduct(pid);
        req.io.emit('deleteProduct', pid);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(productToDelete);
    } catch (error) {
        res.setHeader('Content-Type', 'application/json');
        res.status(400).json({ error: error.message });
    }
});
