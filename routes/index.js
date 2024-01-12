const express = require('express');
const { registerUser, loginUser, getUsers } = require('../controllers/userController');
const { userRegisterValidate, userLoginValidate } = require('../utils/userValidations');
const { validateToken } = require('../utils/auth');
const routes = express.Router();

routes.post('/register', userRegisterValidate, registerUser);
routes.post('/login',userLoginValidate , loginUser);
routes.get('/users',validateToken , getUsers);

module.exports = routes;