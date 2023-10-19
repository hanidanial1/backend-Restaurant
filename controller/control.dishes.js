const Dishes = require('../DB.models/dishes')

const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET 
  });
  
  


async function add(req, res) {
    let img ;
    if(req.file !== undefined){
        data = await cloudinary.uploader.upload(req.file.path)
        img = data.secure_url;
      }
    const { name, description, price } = req.body;
    const dishes = {
        img: img,
        name,
        description,
        price,
    }
    console.log(dishes);
    if (!name || !description || !price) {
        const error = "Missing required fields";
        res.status(400).send(error);
    }

    try {
        const result = await Dishes.create(dishes);
        
        res.send(result);
    } catch (error) {
        res.status(400).send(error);
    }
}

async function gettingDishes(req, res) {
    try {
        const result = await Dishes.find()
        res.send(result)
    } catch (error) {
        console.log(error);
    }
}

async function getById(req, res) {
    const dish = req.params.id
    try {
        const searchedDish = { name: { $regex: new RegExp(dish, 'i') } };
        const result = await Dishes.find(searchedDish);
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred');
    }
}

async function updating(req, res) {
    const id = req.params.id
    try {
        await Dishes.findByIdAndUpdate(id, req.body)
    } catch (error) { throw error }
    res.send('The dish was successfully updated.')
}

async function deleting(req, res) {
    const { id } = req.params
    console.log(req.client);
    if(!req.client){
        throw new Error('your not allow to delete')
    }
    try {
        const results = await Dishes.findByIdAndDelete({ _id: id })
        console.log(results);
    } catch (error) {
      console.log(error.message)
    }
    res.send('The dish was deleted successfully.')
}

module.exports = { add, gettingDishes, updating, deleting, getById }


