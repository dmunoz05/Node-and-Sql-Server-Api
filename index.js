import app from './app.js';
import { getConnection } from './src/database/connection.js';

app.listen(3000);

getConnection()

console.log('Servidor iniciado');
