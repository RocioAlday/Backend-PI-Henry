const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { getVideogames, getVideogamesById, postVideogames } = require('../controllers/videogames_controller')
const { getGenres }= require('../controllers/genres_controller')
const { getPlatforms }= require('../controllers/platforms_controller')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/videogames', getVideogames)
router.get('/videogames/:id', getVideogamesById)
router.post('/videogames', postVideogames)
router.get('/genres', getGenres);
router.get('/platforms', getPlatforms)

module.exports = router;
