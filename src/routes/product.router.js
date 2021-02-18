var express = require('express');
var router = express.Router();

const ProductsController = require('../controllers/products.controller')
const UsersController = require('../controllers/users.controller')


const verifyAccessToken = require('./middlewares/verifyAcessToken.middlewares')
const verifyOwner = require('./middlewares/verifyOwner.middlewares')
const upload = require('./middlewares/upload.middleware')

const onlyAllowsOwner = [verifyAccessToken, verifyOwner]

//Product INDEX
router.get('/:userId/portfolios', verifyAccessToken, ProductsController.bindMethod('index'));
//Product SHOW
router.get('/:userId/portfolios/:id', onlyAllowsOwner, ProductsController.bindMethod('show'));
//Product STORE
router.post('/:userId/portfolios', onlyAllowsOwner, upload.single('pic'), ProductsController.bindMethod('store'));
//Product UPDATE
router.patch('/:userId/portfolios/:id', onlyAllowsOwner, upload.single('pic'), ProductsController.bindMethod('update'));
//Product REMOVE
router.delete('/:userId/portfolios/:id', onlyAllowsOwner, ProductsController.bindMethod('remove'));