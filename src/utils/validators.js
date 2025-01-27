import { manageErrorClient } from './errors.js';
import { isValidObjectId } from 'mongoose';

export const findEmptyFieldsProducts = (fields) => {
    const requiredFields = [
        'title',
        'description',
        'price',
        'code',
        'stock',
        'category',
    ];
    const missingFields = requiredFields.filter((field) => !fields[field]);

    if (missingFields.length > 0) {
        return {
            valid: false,
            error: `Los siguientes campos son obligatorios: ${missingFields.join(
                ', '
            )}`,
        };
    }

    const emptyFields = Object.entries(fields).filter(
        ([key, value]) => value === undefined || value === null || value === ''
    );

    if (emptyFields.length > 0) {
        const missing = emptyFields.map(([key]) => key).join(', ');
        return {
            valid: false,
            error: `Los siguientes campos no pueden estar vacíos: ${missing}`,
        };
    }

    return { valid: true };
};

export const validateNoIdInBody = (body) => {
    if ('id' in body) {
        return {
            valid: false,
            error: 'No se puede enviar el id en el body',
        };
    }
    return {
        valid: true,
    };
};

export const validateId = (id) => {
    if (isNaN(id)) {
        return {
            valid: false,
            error: 'El id debe ser un número',
        };
    }
    return {
        valid: true,
    };
};

export const validateAllowedFields = (fields) => {
    const allowedFields = [
        'title',
        'description',
        'price',
        'code',
        'stock',
        'category',
        'thumbnails',
        'status',
    ];

    const extraFields = Object.keys(fields).filter(
        (key) => !allowedFields.includes(key)
    );

    if (extraFields.length > 0) {
        return {
            valid: false,
            error: `Los siguientes campos no son válidos: ${extraFields.join(
                ', '
            )}`,
        };
    }

    return { valid: true };
};

export const validateQueries = (queries, res) => {
    const { limit, page, sort, query, value } = queries;
    if (limit && (!Number(limit) || limit <= 0)) {
        return manageErrorClient(
            res,
            400,
            'Limit debe ser un número y debe ser mayor a 0'
        );
    }
    if (page && (!Number(page) || page <= 0)) {
        return manageErrorClient(
            res,
            400,
            'Page debe ser un número y debe ser mayor a 0'
        );
    }
    if (sort && !['asc', 'desc'].includes(sort)) {
        return manageErrorClient(res, 400, 'Sort debe ser asc o desc');
    }
    if (query && !['category', 'stock'].includes(query)) {
        return manageErrorClient(res, 400, 'Query debe ser category o stock');
    }
    if (query === 'category' && !value) {
        return manageErrorClient(res, 400, 'Value es requerido para category');
    }
    if (query === 'stock' && !value) {
        return manageErrorClient(res, 400, 'Value es requerido para stock');
    }
    if (query === 'stock' && value && !['true', 'false'].includes(value)) {
        return manageErrorClient(
            res,
            400,
            'Value para stock debe ser true o false'
        );
    }
    if (
        query === 'category' &&
        value &&
        !['training', 'running', 'urban', 'lifestyle'].includes(value)
    ) {
        return manageErrorClient(
            res,
            400,
            'Las categorías válidas son training, running, urban y lifestyle'
        );
    }
    return true;
};

export const validateProducts = (products, res) => {
    if (!Array.isArray(products)) {
        console.log('Products debe ser un array');

        return manageErrorClient(res, 400, 'Products debe ser un array');
    }
    if (products.length === 0) {
        console.log('Products no puede estar vacío');
        return manageErrorClient(res, 400, 'Products no puede estar vacío');
    }
    if (products.some((product) => !product.productId)) {
        ('Es necesario proporcionar un ID de producto a añadir');
        return manageErrorClient(
            res,
            400,
            'Es necesario proporcionar un ID de producto a añadir'
        );
    }
    if (products.some((product) => !isValidObjectId(product.productId))) {
        console.log('ID de producto inválido');
        return manageErrorClient(res, 400, 'ID de producto inválido');
    }
    if (products.some((product) => !product.quantity)) {
        console.log('Es necesario proporcionar una cantidad');
        return manageErrorClient(
            res,
            400,
            'Es necesario proporcionar una cantidad'
        );
    }
    if (products.some((product) => product.quantity <= 0)) {
        console.log('La cantidad debe ser mayor a 0');
        return manageErrorClient(res, 400, 'La cantidad debe ser mayor a 0');
    }

    return true;
};
