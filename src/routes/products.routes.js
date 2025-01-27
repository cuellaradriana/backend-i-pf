import { Router } from 'express';
import {
    findEmptyFieldsProducts,
    validateAllowedFields,
    validateNoIdInBody,
    validateQueries,
    // validateId,
} from '../utils/validators.js';
import { ProductsManager } from '../dao/ProductsManager.js';
import { manageErrorServer, manageErrorClient } from '../utils/errors.js';
import { isValidObjectId } from 'mongoose';

//!! Para usar file system
// import { ProductManager } from '../dao/fs-managers/ProductManagerFS.js';
// export const productsPath = './src/data/products.json';
// ProductManager.setPath(productsPath);

export const router = Router();

router.get('/', async (req, res) => {
    const { limit, page, query, value, sort } = req.query;
    const isValid = validateQueries(req.query);
    if (!isValid) return;
    try {
        const products = await ProductsManager.getProducts(
            {
                limit,
                page,
                query,
                value,
                sort,
            },
            'products'
        );

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(products);
    } catch (error) {
        manageErrorServer(res, { status: 'error', message: error.message });
    }
});

router.get('/:pid', async (req, res) => {
    let { pid } = req.params;
    if (!isValidObjectId(pid)) {
        return manageErrorClient(res, 400, 'ID inválido');
    }
    try {
        const product = await ProductsManager.getProductById(pid);
        if (!product) {
            return manageErrorClient(res, 404, 'Producto no encontrado');
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({ product });
    } catch (error) {
        manageErrorServer(res, error);
    }
});

router.post('/', async (req, res) => {
    const { thumbnails, ...fieldsToValidate } = req.body;
    const noIdInBody = validateNoIdInBody(req.body);
    const emptyFields = findEmptyFieldsProducts(fieldsToValidate);
    if (!emptyFields.valid || !noIdInBody.valid) {
        return manageErrorClient(
            res,
            400,
            emptyFields.error || noIdInBody.error
        );
    }
    try {
        const exist = await ProductsManager.getProductBy({
            ...fieldsToValidate.code,
        });
        if (exist) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(400).json({ error: 'El código ya existe' });
        }
        const newProduct = await ProductsManager.addProduct(req.body);
        req.io.emit('addProduct', newProduct);
        res.setHeader('Content-Type', 'application/json');
        res.status(201).json({ newProduct });
    } catch (error) {
        manageErrorServer(res, error);
    }
});

router.put('/:pid', async (req, res) => {
    let { pid } = req.params;
    if (!isValidObjectId(pid)) {
        return manageErrorClient(res, 400, 'ID inválido');
    }
    const noIdInBody = validateNoIdInBody(req.body);
    const allowedFields = validateAllowedFields(req.body);
    if (!allowedFields.valid || !noIdInBody.valid) {
        return manageErrorClient(
            res,
            400,
            allowedFields.error || noIdInBody.error
        );
    }
    const toUpdate = req.body;
    try {
        const productToUpdate = await ProductsManager.updateProduct(
            pid,
            toUpdate
        );
        if (!productToUpdate) {
            return manageErrorClient(res, 404, 'Producto no encontrado');
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({ productToUpdate });
    } catch (error) {
        manageErrorServer(res, error);
    }
});

router.delete('/:pid', async (req, res) => {
    let { pid } = req.params;
    if (!isValidObjectId(pid)) {
        return manageErrorClient(res, 400, 'ID inválido');
    }
    try {
        const productToDelete = await ProductsManager.deleteProduct(pid);
        if (!productToDelete) {
            return manageErrorClient(res, 404, 'Producto no encontrado');
        }
        req.io.emit('deleteProduct', productToDelete._id);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(productToDelete);
    } catch (error) {
        manageErrorServer(res, error);
    }
});
