const express = require('express');
const route = express.Router();
const user = require('../../controllers/userController');



route.get('/:Id',user.getFiles)






module.exports = route