const axios= require('axios');
const { Videogame, Genre, Platform }= require('../db');
require('dotenv').config();
const { API_KEY } = process.env;

const getApiVideogames= async()=> {
    const numberOfPages= 5;  // al hacer un get me trae en la primer pág un total de 20 videojuegos--> para traer 100, necesito 5 pages
    let result = [];
    for(let i=1; i<= numberOfPages; i++){
        const apiUrl= `https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`;
        const  apiInfo = await axios(apiUrl, { headers: { "Accept-Encoding": "gzip,deflate,compress" },});
        const results= await apiInfo.data.results;
    
        const apiVideogames = results.map(v => ({
            name : v.name,
            id: v.id,
            genres: v.genres.map(g => g.name),   
            image: v.background_image,
            rating: v.rating,
            }));

        result= [...result].concat(apiVideogames); 
        // console.log(result.length);
    }
    return result;
}

const getDbVideogames= async()=> {
    try {
        const videogames= await Videogame.findAll({
            include: [
                {
                    model: Platform,
                    attributes: ['id', 'name'], 
                    through: { attributes: [] },
                },
                {
                    model: Genre,
                    attributes: ['id', 'name'], 
                    through: { attributes: [] },
                }
            ],
        });

        return videogames.map(v => ({
            id: v.id,
            name: v.name,
            image: v.image,
            genres: v.genres.map(g => g.name), 
            platforms: v.platforms.map(p=> p.name),
            createdInDb: v.createdInDb,
            rating: v.rating
        }));
    } catch (err){
        console.log(err);
    }
}

const getApiDbVideogames= async()=> {
    try {
        const [apiResult, dbResult]= await Promise.all([getApiVideogames(), getDbVideogames()]);
        return apiResult.concat(dbResult);
    } catch(err){
        console.log(err);
    }
}

const getAllVideogamesById= async(id)=> {
    if(typeof(Number(id)) === 'number' && id.length<8) {
    const apiUrl= `https://api.rawg.io/api/games/${id}?key=${API_KEY}`;
    const  apiInfo = await axios(apiUrl, { headers: { "Accept-Encoding": "gzip,deflate,compress" },});
    const videogame= await apiInfo.data;
// console.log(videogame);
    return{
        name: videogame.name,
        image: videogame.background_image,
        genres:  videogame.genres.map(g => g.name), 
        description: videogame.description,
        dateOfRelease: videogame.released,
        rating: videogame.rating,
        platforms: videogame.platforms.map(p=> p.platform.name)
    }
} else {
    if (typeof(id) === 'string' && id.length>7){
        const videogameDb= await Videogame.findAll({ 
            where: { id: id }, 
            include: [
                {
                    model: Platform,
                    attributes: ['name'], 
                    through: { attributes: [] },
                },
                {
                    model: Genre,
                    attributes: ['name'], 
                    through: { attributes: [] },
                }
            ],
            
        });
 
        return {
          name: videogameDb[0].dataValues.name,
          image: videogameDb[0].dataValues.image,
          genres: videogameDb[0].dataValues.genres.map(g=> g.name),
          description: videogameDb[0].dataValues.description,
          dateOfRelease: videogameDb[0].dataValues.dateOfRelease,
          rating:videogameDb[0].dataValues.rating,
          platforms: videogameDb[0].dataValues.platforms.map(p=> p.name),
        }
    } 
}
}

const getApiGenres= async()=> {
    const apiUrl= `https://api.rawg.io/api/genres?key=${API_KEY}`;
    const  apiInfo = await axios(apiUrl, { headers: { "Accept-Encoding": "gzip,deflate,compress" },});
    const result= await apiInfo.data.results;
    
    return result.map(g=> ({
        id: g.id,
        name: g.name
    }))
}

const getApiPlatforms= async()=> {
    const apiUrl= `https://api.rawg.io/api/platforms?key=${API_KEY}`;
    const  apiInfo = await axios(apiUrl, { headers: { "Accept-Encoding": "gzip,deflate,compress" },});
    const result= await apiInfo.data.results;
    
    return result.map(p=> ({
        id: p.id,
        name: p.name
    }))
}


module.exports = {
    getApiDbVideogames,
    getAllVideogamesById,
    getApiGenres,
    getApiPlatforms
}