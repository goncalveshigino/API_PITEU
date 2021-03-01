var express = require('express');
var router = express.Router();


const UsersController = require('../controllers/users.controller')




const verifyAccessToken = require('../routes/middlewares/verifyAcessToken.middlewares')
const verifyOwner = require('../routes/middlewares/verifyOwner.middlewares')
const verifyAccessManager = require("../routes/middlewares/verifyAccessManager.middleware");

const upload = require('../routes/middlewares/upload.middleware')


const onlyAllowsOwner = [verifyAccessToken, verifyOwner]

//LOGIN
router.post('/login', UsersController.bindMethod('login'));
//INDEX
router.get('/', verifyAccessToken, UsersController.bindMethod('index'));
//SHOW
router.get('/:id', verifyAccessToken, UsersController.bindMethod('show'));
//STORE
router.post('/', UsersController.bindMethod('store'));
//UPDATE
router.patch('/:id', onlyAllowsOwner, UsersController.bindMethod('update'));
//DELETE
router.delete('/:id', onlyAllowsOwner, UsersController.bindMethod('remove'));


module.exports = router;