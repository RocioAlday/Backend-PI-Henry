const axios= require('axios');
const { Videogame, Genre, Platform }= require('../db');
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
            createdInDb: v.createdInDb
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

const getApiVideogamesById= async(id)=> {
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
    getApiVideogamesById,
    getApiGenres,
    getApiPlatforms
}