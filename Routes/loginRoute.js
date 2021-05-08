const express = require('express');
const router = express.Router();
const login = require('../controllers/login');

 router.post('/',login.login);
 router.post ('/register',login.register);

 module.exports = router;