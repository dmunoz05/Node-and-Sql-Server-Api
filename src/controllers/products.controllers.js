import { getConnection } from '../database/connection.js'
import sql from 'mssql'

export const getProducts = async (req, res) => {
    const pool = await getConnection()
    const result = await pool.request().query('SELECT * FROM webstore.dbo.products')
    res.json(result.recordset)
}

export const getProduct = async (req, res) => {
    const id = req.params.id
    const pool = await getConnection()
    const result = await pool.request().input('id', sql.Int, id).query('SELECT * FROM webstore.dbo.products WHERE id = @id')
    if(result.rowsAffected[0] === 0) {
        return res.status(404).json({ message: "Product not found"})
    }
    res.json(result.recordset[0])
}

export const createProduct = async (req, res) => {
    const { name, price, quantity, description } = req.body
    const pool = await getConnection()
    const result = await pool.request()
    .input('name', sql.VarChar, name)
    .input('price', sql.Decimal, price)
    .input('quantity', sql.Int, quantity)
    .input('description', sql.Text, description)
    .query('INSERT INTO webstore.dbo.products (name, price, quantity, description) VALUES (@name, @price, @quantity, @description);SELECT SCOPE_IDENTITY() AS id')
    res.json({
        id:result.recordset[0].id,
        name: name,
        price: price,
        quantity: quantity,
        description: description
    })
}

export const updateProduct = async (req, res) => {
    const id = req.params.id
    const { name, price, quantity, description } = req.body
    const pool = await getConnection()
    const result = await pool.request()
    .input('id', sql.Int, id)
    .input('name', sql.VarChar, name)
    .input('price', sql.Decimal, price)
    .input('quantity', sql.Int, quantity)
    .input('description', sql.Text, description)
    .query('UPDATE webstore.dbo.products SET name = @name, price = @price, quantity = @quantity, description = @description WHERE id = @id')
    if(result.rowsAffected[0] === 0) {
        return res.status(404).json({ message: "Product not found"})
    }
    res.json({
        id: id,
        name: name,
        price: price,
        quantity: quantity,
        description: description
    })
}

export const deleteProduct = async (req, res) => {
    const id = req.params.id
    const pool = await getConnection()
    const result = await pool.request().input('id', sql.Int, id).query('DELETE FROM webstore.dbo.products WHERE id = @id')
    if(result.rowsAffected[0] === 0) {
        return res.status(404).json({ message: "Product not found"})
    }
    return res.json({ message: "Product deleted"})
}