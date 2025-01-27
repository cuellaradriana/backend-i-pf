import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { router as productsRouter } from './routes/products.routes.js';
import { router as cartsRouter } from './routes/carts.routes.js';
import { router as viewsRouter } from './routes/views.routes.js';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import { config } from './config.js';
// import { seedDatabase } from './utils/seedData.js';

const app = express();
const PORT = config.PORT;
const MONGO_URL = config.DATABASE_URL;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

app.use((req, res, next) => {
    req.io = io;
    next();
});

app.use(express.static('./src/public'));
app.engine(
    'handlebars',
    engine({
        helpers: {
            getThumbnail: (array, index) => array[index],
        },
    })
);
app.set('view engine', 'handlebars');
app.set('views', './src/views');

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export const io = new Server(server);
io.on('connection', (socket) => {
    console.log(`Cliente conectado con id: ${socket.id}`);
});

const dbConnection = async () => {
    try {
        await mongoose.connect(MONGO_URL, {
            dbName: 'Coder-ecommerce',
        });
        console.log('Base de datos conectada');
        // seedDatabase();
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
};

dbConnection();
