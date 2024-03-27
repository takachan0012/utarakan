const client = require('./db');
const { nanoid } = require('nanoid');

const tablePost = process.env.DB_POSTUSER;
const tableUsers = process.env.DB_USERS;

const login = async (req, res) => {
    const { key } = req.body;
    if (key === undefined) {
        return res.status(400).json({
            status: 'error',
            message: 'fill column correctly',
        })
    }
    const query = {
        name: 'auth-user',
        text: `SELECT id FROM ${tableUsers} WHERE id = $1`,
        values: [key]
    }
    const response = await client.query(query);
    if (response.rowCount === 1) {
        return res.status(200).json({
            status: 'success',
            message: 'user authenticated',
        })
    }
    return res.status(400).json({
        status: 'error',
        message: 'user not found',
    })
}

const register = async (req, res) => {
    const { username } = req.body;
    if (username === undefined) {
        res.status(400).json({
            status: 'error',
            message: 'fill column correctly',
        })
    }
    const id = nanoid(16);
    const query = {
        name: 'register-user',
        text: `INSERT INTO ${tableUsers}(id, username) VALUES($1, $2)`,
        values: [id, username],
    }
    try {
        const response = await client.query(query);
        if (response.rowCount === 1) {
            res.status(200).json({
                status: 'success',
                message: 'user registered',
                data: {
                    id,
                }
            })
        }
    } catch (e) {
        return res.status(400).json({
            status: 'error',
            message: 'username already exist',
        })
    }
}

const addPost = async (req, res) => {
    const { title, description, user_id } = req.body;
    if (title === undefined || description === undefined || user_id === undefined) return res.status(400).json({
        status: 'error',
        message: 'fill column correctly',
    })
    const id = nanoid(16);
    const query = {
        name: 'add-todo',
        text: `INSERT INTO ${tablePost}(id,title,description,user_id) VALUES($1, $2, $3,$4)`,
        values: [id, title, description, user_id],
    };
    const response = await client.query(query);
    if (response.rowCount === 1) {
        res.status(200).json({
            status: 'success',
            message: 'Post added successfully',
            data: {
                id,
            }
        })
    }
}

const feedPost = async (req, res) => {
    const query = {
        name: 'feed-post',
        text: `SELECT * FROM ${tablePost}`
    }
    const response = await client.query(query);
    if (response.rowCount > 0) {
        res.status(200).json({
            status: 'success',
            data: response.rows
        })
    }
}


module.exports = { addPost, feedPost, register, login }