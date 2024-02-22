import express from 'express';
import productRoutes from './src/routes/products.routes.js'
import dotenv from './config.js';

dotenv.config()

const app = express();

app.use(express.json())

app.use(productRoutes)

export default app;