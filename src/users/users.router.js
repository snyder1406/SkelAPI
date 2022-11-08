const router = require('express').Router()
const passport = require('passport')

const userServices = require('./users.services')

require('../middlewares/auth.middleware')(passport)





//? rutas raiz

router.get('/', userServices.getAllUsers)

//TODO el registerUser ira en la ruta /auth/register

//! router.route('/').get( userServices.getAllUsers)

//? rutas dinamicas por ID /users/:id

//! router.get('/:id')
//! router.patch('/:id')
//! router.put('/:id')
//! router.delete('/:id')

//? Ruta de informacion propia del usuario loggeado
router.route('/me')
    .get(
        passport.authenticate('jwt', {session: false}),
        userServices.getMyUser)
    //.patch()
    //.delete()
    .patch( 
         passport.authenticate('jwt', {session: false}),
         userServices.patchMyUser)
         .delete( 
            passport.authenticate('jwt', {session: false}),
            userServices.deleteMyUser)

//? /api/v1/users/:id
router.route('/:id')
    .get(userServices.getUserById)
    .patch(userServices.patchUser)
    .delete(userServices.deleteUser)





module.exports = router