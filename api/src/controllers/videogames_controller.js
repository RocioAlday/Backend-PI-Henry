const { getApiDbVideogames, getApiVideogamesById } = require("../utils");
const { Videogame, Genre, Platform } = require('../db');

const getVideogames= async(req, res) =>{
    const {name} = req.query;
    const videogames= await getApiDbVideogames();
    try {
        if(!name) return res.status(200).json(videogames);
        const wantedVideogame= videogames.filter(v=> v.name.toLowerCase().includes(name.toLowerCase())); // Ver/AGREGAR-- el readmy pide mostrar solo las 15 primeras conincidencias
        wantedVideogame.length ? res.status(200).json(wantedVideogame) : res.status(404).json({message: 'Videogame not found'});
    } catch(err){
        res.json({error: err.message})
    }
}

const getVideogamesById= async(req, res)=> {
    const {id} = req.params;
    if(id){
       const videogame= await getApiVideogamesById(id);
       videogame ? res.status(200).json(videogame) : res.status(404).json({message: 'Videogame not found'});
    }
}

const postVideogames= async(req, res)=> {
    const{name, description, dateOfRelease, image, genres, platforms} = req.body;

    try {
        const videogameCreated= await Videogame.create({
            name, description, dateOfRelease, image
        })

        const genresDb= await Genre.findAll({
            where: {name: genres}
        })
        await videogameCreated.addGenre(genresDb);

        const platformsDb= await Platform.findAll({
            where: {name: platforms}
        })
        await videogameCreated.addPlatform(platformsDb);

        res.status(200).json(videogameCreated)
    } catch (err) {
        res.status(500).json({msg: 'FALLA ACÁ', err});
    }
}

module.exports= {
    getVideogames,
    getVideogamesById,
    postVideogames,
}