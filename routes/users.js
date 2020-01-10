const Express = require('express');
const routes=Express.Router();
const bodyParser= require('body-parser');
const cors= require('cors');
const userController= require('../controllers/users')
routes.use(bodyParser.json());

routes.use(bodyParser.urlencoded({extended:false}));
routes.use(cors.apply());

routes.get('/twitter/users/get/:id',userController.getUserById);
routes.post('/twitter/users/login',userController.login);
routes.post('/twitter/users/signup',userController.signUp);



module.exports = routes;
