import { ProductsModel } from '../dao/models/products.model.js';

const products = [
    {
        title: 'Zapatillas UltraBoost 22 Adidas',
        description: 'Zapatillas para entrenamiento, color blanco',
        code: 'ADI001',
        price: 150000,
        stock: 20,
        category: 'training',
    },
    {
        title: 'Zapatillas Classic Reebok',
        description: 'Zapatillas urbanas, color negro',
        code: 'REE002',
        price: 120000,
        stock: 15,
        category: 'urban',
    },
    {
        title: 'Zapatillas Pegasus 39 Nike',
        description: 'Zapatillas para running, color azul',
        code: 'NIK003',
        price: 250000,
        stock: 10,
        category: 'running',
    },
    {
        title: 'Zapatillas Sk8-Hi Vans',
        description: 'Zapatillas urbanas de caña alta, color negro',
        code: 'VAN004',
        price: 170000,
        stock: 12,
        category: 'urban',
    },
    {
        title: 'Zapatillas Old Skool Vans',
        description: 'Zapatillas urbanas clásicas, color blanco y negro',
        code: 'VAN005',
        price: 160000,
        stock: 18,
        category: 'urban',
    },
    {
        title: 'Zapatillas RS-X Puma',
        description: 'Zapatillas lifestyle modernas, color gris',
        code: 'PUM006',
        price: 135000,
        stock: 20,
        category: 'lifestyle',
    },
    {
        title: 'Zapatillas Nano X2 Reebok',
        description: 'Zapatillas para entrenamiento intensivo, color rojo',
        code: 'REE007',
        price: 200000,
        stock: 10,
        category: 'training',
    },
    {
        title: 'Zapatillas Fresh Foam 1080 New Balance',
        description: 'Zapatillas para correr, color azul oscuro',
        code: 'NEW008',
        price: 270000,
        stock: 15,
        category: 'running',
    },
    {
        title: 'Zapatillas Chuck Taylor All Star Converse',
        description: 'Zapatillas urbanas clásicas, color rojo',
        code: 'CON009',
        price: 110000,
        stock: 25,
        category: 'urban',
    },
    {
        title: 'Zapatillas Court Legacy Nike',
        description: 'Zapatillas lifestyle casual, color blanco',
        code: 'NIK010',
        price: 140000,
        stock: 22,
        category: 'lifestyle',
    },
    {
        title: 'Zapatillas Gel-Nimbus 25 Asics',
        description: 'Zapatillas para running de alto rendimiento, color gris',
        code: 'ASI011',
        price: 280000,
        stock: 14,
        category: 'running',
    },
    {
        title: 'Zapatillas Club C 85 Reebok',
        description: 'Zapatillas urbanas clásicas, color beige',
        code: 'REE012',
        price: 145000,
        stock: 20,
        category: 'urban',
    },
    {
        title: 'Zapatillas ZoomX Invincible Run Nike',
        description:
            'Zapatillas para running con amortiguación extrema, color negro',
        code: 'NIK013',
        price: 290000,
        stock: 12,
        category: 'running',
    },
    {
        title: 'Zapatillas Authentic Vans',
        description: 'Zapatillas urbanas de perfil bajo, color blanco',
        code: 'VAN014',
        price: 130000,
        stock: 18,
        category: 'urban',
    },
    {
        title: 'Zapatillas Future Rider Puma',
        description: 'Zapatillas lifestyle con diseño retro, color verde',
        code: 'PUM015',
        price: 150000,
        stock: 16,
        category: 'lifestyle',
    },
    {
        title: 'Zapatillas FuelCell Propel New Balance',
        description: 'Zapatillas para entrenamiento ligero, color azul claro',
        code: 'NEW016',
        price: 220000,
        stock: 10,
        category: 'training',
    },
    {
        title: 'Zapatillas Cali Star Puma',
        description: 'Zapatillas lifestyle elegantes, color blanco y dorado',
        code: 'PUM017',
        price: 160000,
        stock: 12,
        category: 'lifestyle',
    },
    {
        title: 'Zapatillas Wayfarer DCShoes',
        description: 'Zapatillas urbanas resistentes, color marrón',
        code: 'DCS018',
        price: 145000,
        stock: 20,
        category: 'urban',
    },
    {
        title: 'Zapatillas Metcon 8 Nike',
        description:
            'Zapatillas para entrenamiento funcional, color gris y negro',
        code: 'NIK019',
        price: 210000,
        stock: 14,
        category: 'training',
    },
    {
        title: 'Zapatillas Clyde Hardwood Puma',
        description:
            'Zapatillas lifestyle con diseño vintage, color blanco y azul',
        code: 'PUM020',
        price: 180000,
        stock: 16,
        category: 'lifestyle',
    },
    {
        title: 'Zapatillas Floatride Energy Reebok',
        description: 'Zapatillas para running livianas, color naranja',
        code: 'REE021',
        price: 200000,
        stock: 18,
        category: 'running',
    },
    {
        title: 'Zapatillas Era Vans',
        description: 'Zapatillas urbanas modernas, color negro y blanco',
        code: 'VAN022',
        price: 125000,
        stock: 22,
        category: 'urban',
    },
    {
        title: 'Zapatillas 574 Core New Balance',
        description: 'Zapatillas lifestyle clásicas, color gris',
        code: 'NEW023',
        price: 140000,
        stock: 19,
        category: 'lifestyle',
    },
    {
        title: 'Zapatillas Revolution 6 Nike',
        description: 'Zapatillas para running cómodas, color azul marino',
        code: 'NIK024',
        price: 180000,
        stock: 15,
        category: 'running',
    },
    {
        title: 'Zapatillas Chuck 70 Converse',
        description: 'Zapatillas urbanas premium, color beige',
        code: 'CON025',
        price: 150000,
        stock: 14,
        category: 'urban',
    },
    {
        title: 'Zapatillas Workout Plus Reebok',
        description: 'Zapatillas lifestyle duraderas, color blanco',
        code: 'REE026',
        price: 155000,
        stock: 16,
        category: 'lifestyle',
    },
    {
        title: 'Zapatillas Wild Rider Puma',
        description: 'Zapatillas modernas y deportivas, color verde oliva',
        code: 'PUM027',
        price: 175000,
        stock: 13,
        category: 'lifestyle',
    },
    {
        title: 'Zapatillas Ignite DCShoes',
        description: 'Zapatillas urbanas estilizadas, color negro',
        code: 'DCS028',
        price: 130000,
        stock: 18,
        category: 'urban',
    },
    {
        title: 'Zapatillas Zoom Fly 5 Nike',
        description: 'Zapatillas para running de alta velocidad, color gris',
        code: 'NIK029',
        price: 260000,
        stock: 12,
        category: 'running',
    },
    {
        title: 'Zapatillas SL20 Adidas',
        description: 'Zapatillas para entrenamiento ligero, color amarillo',
        code: 'ADI030',
        price: 190000,
        stock: 14,
        category: 'training',
    },
    {
        title: 'Zapatillas All Star Lugged Converse',
        description: 'Zapatillas urbanas con diseño robusto, color blanco',
        code: 'CON031',
        price: 175000,
        stock: 16,
        category: 'urban',
    },
    {
        title: 'Zapatillas X9000L4 Adidas',
        description: 'Zapatillas modernas para correr, color negro',
        code: 'ADI032',
        price: 240000,
        stock: 10,
        category: 'running',
    },
    {
        title: 'Zapatillas React Infinity Run Nike',
        description:
            'Zapatillas para running con soporte adicional, color azul',
        code: 'NIK033',
        price: 250000,
        stock: 14,
        category: 'running',
    },
    {
        title: 'Zapatillas 327 New Balance',
        description:
            'Zapatillas lifestyle con diseño retro, color verde y blanco',
        code: 'NEW034',
        price: 190000,
        stock: 12,
        category: 'lifestyle',
    },
    {
        title: 'Zapatillas Atom Runner DCShoes',
        description: 'Zapatillas urbanas ligeras, color gris',
        code: 'DCS035',
        price: 140000,
        stock: 19,
        category: 'urban',
    },
    {
        title: 'Zapatillas Adistar Adidas',
        description: 'Zapatillas para largas distancias, color blanco y negro',
        code: 'ADI036',
        price: 275000,
        stock: 11,
        category: 'running',
    },
    {
        title: 'Zapatillas Futurecraft 4D Adidas',
        description: 'Zapatillas avanzadas con tecnología 4D, color gris',
        code: 'ADI037',
        price: 300000,
        stock: 9,
        category: 'running',
    },
    {
        title: 'Zapatillas Phantom Run Nike',
        description: 'Zapatillas para running con diseño elegante, color rojo',
        code: 'NIK038',
        price: 230000,
        stock: 13,
        category: 'running',
    },
    {
        title: 'Zapatillas Skye High DCShoes',
        description: 'Zapatillas urbanas de caña alta, color azul marino',
        code: 'DCS039',
        price: 150000,
        stock: 18,
        category: 'urban',
    },
    {
        title: 'Zapatillas Ridge Lux Adidas',
        description: 'Zapatillas ligeras para entrenamiento, color beige',
        code: 'ADI040',
        price: 175000,
        stock: 15,
        category: 'training',
    },
    {
        title: 'Zapatillas Classic Slip-On Vans',
        description:
            'Zapatillas urbanas sin cordones, color cuadros blanco y negro',
        code: 'VAN041',
        price: 125000,
        stock: 20,
        category: 'urban',
    },
    {
        title: 'Zapatillas Pulseboost HD Adidas',
        description: 'Zapatillas para running urbano, color gris y naranja',
        code: 'ADI042',
        price: 195000,
        stock: 14,
        category: 'running',
    },
    {
        title: 'Zapatillas UltraRange Vans',
        description: 'Zapatillas urbanas con amortiguación, color gris',
        code: 'VAN043',
        price: 160000,
        stock: 17,
        category: 'urban',
    },
];

export const seedDatabase = async () => {
    try {
        await ProductsModel.deleteMany({});
        console.log('Colección limpiada');

        await ProductsModel.insertMany(products);
        console.log('Productos insertados correctamente');
    } catch (err) {
        console.error('Error al insertar productos:', err);
    }
};