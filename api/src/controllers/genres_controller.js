const { getApiGenres } = require("../utils");
const { Genre } = require('../db');

const getGenres= async(req, res)=> {
    const genresApi= await getApiGenres();
    try {
        for(let genre of genresApi){
            await Genre.findOrCreate({
                where: {
                    name: genre.name
                }
            })
        }
        const genresDb= await Genre.findAll({
            attributes: ['id', 'name']
        })
        res.status(200).json(genresDb);
    } catch(err){
        res.status (500).json({message: err.message})
    }
}

module.exports= {
    getGenres
}