var express = require('express');
var router = express.Router();

const ProductsController = require('../controllers/products.controller')

const upload = require('./middlewares/upload.middleware')



//Product INDEX
router.get('/', ProductsController.bindMethod('index'));
//Product SHOW
router.get('/:id', ProductsController.bindMethod('show'));
//Product STORE
router.post('/', ProductsController.bindMethod('store'));
//Product UPDATE
router.patch('/:id', upload.single('image'), ProductsController.bindMethod('update'));
//Product REMOVE
router.delete('/:id', ProductsController.bindMethod('remove'));

module.exports = router;