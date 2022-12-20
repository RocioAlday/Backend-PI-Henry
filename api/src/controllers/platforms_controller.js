const { getApiPlatforms } = require("../utils");
const { Platform } = require('../db');

const getPlatforms= async(req, res)=> {
    const platformsApi= await getApiPlatforms();
    try {
        for(let platform of platformsApi){
            await Platform.findOrCreate({
                where: {
                    name: platform.name
                }
            })
        }
        const platformsDb= await Platform.findAll({
            attributes: ['id', 'name']
        })
        res.status(200).json(platformsDb);
    } catch(err){
        res.status (500).json({message: err.message})
    }
}

module.exports= {
    getPlatforms
}