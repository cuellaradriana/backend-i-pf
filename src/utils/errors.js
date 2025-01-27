export const manageErrorServer = (res, error) => {
    if (res.headersSent) return;
    res.setHeader('Content-Type', 'application/json');
    return res.status(500).json({
        error: 'Ha ocurrido un error inesperado',
        detalle: `${error.message}`,
    });
};

export const manageErrorClient = (res, statusCode = 404, message = null) => {
    if (res.headersSent) return;
    res.setHeader('Content-Type', 'application/json');

    const errorMessages = {
        400: message || 'Campo o sintaxis inválidos.',
        401: message || 'No está autorizado',
        403: message || 'No tienes permisos para acceder a este recurso.',
        404: message || 'Recurso no encontrado.',
    };

    const errorResponse = {
        error: errorMessages[statusCode] || 'Error desconocido',
    };

    res.status(statusCode).json(errorResponse);
};
