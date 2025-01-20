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
