 const User = require('../models').User
 const Sequelize = require('sequelize')
 const Op = Sequelize.Op
 const sucessResponse = require('../responses/sucess.response')
 const errorResponse = require('../responses/error.response')
 const ResoursController = require('./resource.controller')


 class UsersController extends ResoursController {

     constructor() {
         super()
         this.setModel(User)
     }


     async login(req, res, next) {

         try {
             const { email, password } = req.body;
             const result = await User.verifyLogin(email, password);
             sucessResponse(res, 200, 'Usuario autenticado com sucesso', result)
         } catch (error) {
             errorResponse(res, 500, 'Nao foi possivel autenticar.')
         }

     }

     async update(req, res, next) {
         if (req.file) {
             req.body.image = req.protocol + '://' + req.headers.host + '/uploads' + req.file.filename
         }
         return await super.update(req, res, next)
     }
 }
 module.exports = new UsersController