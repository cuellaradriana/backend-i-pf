export const generateId = (array) => {
    let id = 1;
    if (array.length > 0) {
        id = Math.max(...array.map((item) => item.id)) + 1;
    }
    return id;
};

export const checkIfExistsByField = (array, fieldKey, fieldValue) => {
    let exist = array.find((item) => item[fieldKey] === fieldValue);
    if (exist) {
        return {
            valid: false,
            error: `El item con ${fieldKey} "${exist[fieldKey]}" ya existe.`,
        };
    }
    return {
        valid: true,
    };
};

export const validateTypeOfFields = (fields) => {
    if (
        typeof fields.title !== 'string' ||
        typeof fields.description !== 'string' ||
        typeof fields.code !== 'string' ||
        typeof fields.category !== 'string'
    ) {
        throw new Error(
            'Los campos title, description, code, y category deben ser de tipo string.'
        );
    }
    if (typeof fields.price !== 'number' || typeof fields.stock !== 'number') {
        throw new Error('Los campos price y stock deben ser de tipo number.');
    }
    if (fields.thumbnails && !Array.isArray(fields.thumbnails)) {
        throw new Error('El campo thumbnails debe ser un array.');
    }
};
