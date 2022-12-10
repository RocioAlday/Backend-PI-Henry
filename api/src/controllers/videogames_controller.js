const { getApiDbVideogames, getApiVideogamesById } = require("../utils");
const { Videogame, Genre } = require('../db');

const getVideogames= async(req, res) =>{
    const {name} = req.query;
    const videogames= await getApiDbVideogames();
    try {
        if(!name) return res.status(200).json(videogames);
        const wantedVideogame= videogames.filter(v=> v.name.toLowerCase().includes(name.toLowerCase())); 
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
    //platforms y genres seleccionables  --> consultar
    try {
        const videogameCreated= await Videogame.create({
            name, description, dateOfRelease, image, platforms
        })

        const genresDb= await Genre.findAll({
            where: {name: genres}
        })

        videogameCreated.addGenre(genresDb);
        res.status(200).json(videogameCreated)
    } catch (err) {
        res.status(500).json({msg: err});
    }
}

module.exports= {
    getVideogames,
    getVideogamesById,
    postVideogames,
}