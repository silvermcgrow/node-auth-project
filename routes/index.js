const express = require('express');
const routes = express.Router();

routes.post('/register', (req,res) => {
    res.send('Register Success!!!!');
});
routes.post('/login', (req,res) => {
    res.send('Login Success!!!!');
});

module.exports = routes;