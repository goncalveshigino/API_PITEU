var express = require('express');
var router = express.Router();

const ProductsController = require('../controllers/products.controller')



const verifyAccessToken = require('../middlewares/verifyAcessToken.middlewares')
const verifyOwner = require('../middlewares/verifyOwner.middlewares')
const verifyAccessManager = require("../middlewares/verifyAccessManager.middleware");

const upload = require('../middlewares/upload.middleware')



//Product INDEX
router.get('/', ProductsController.bindMethod('index'));
//Product SHOW
router.get('/id', ProductsController.bindMethod('show'));
//Product STORE
router.post('/', upload.single('pic'), ProductsController.bindMethod('store'));
//Product UPDATE
router.patch('/id', upload.single('pic'), ProductsController.bindMethod('update'));
//Product REMOVE
router.delete('/id', ProductsController.bindMethod('remove'));

module.exports = router;