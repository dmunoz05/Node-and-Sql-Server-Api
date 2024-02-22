import sql from 'mssql';
import { environments } from './../../environments.js';

const dbSettings = {
    user: environments.user,
    password: environments.password,
    server: environments.server,
    database: environments.database,
    options: {
        encrypt: false,
        trustServerCertificate: true,
    }
}

export const getConnection = async () => {
    try {
        const pool = await sql.connect(dbSettings)
        const result = await pool.request().query('SELECT GETDATE()')
        // console.log(result);
        return pool
    } catch (error) {
        console.log(error);
    }
}