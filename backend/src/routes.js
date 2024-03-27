const routes = require('express').Router();
const { addPost, feedPost, register, login } = require('./handler');

routes.get('/', feedPost);
routes.post('/add', addPost);
routes.post('/login', login)
routes.post('/register', register)

module.exports = routes;