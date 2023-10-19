const AddedMeal = require('../DB.models/addedToCart')
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET 
});

async function addMeal(req, res) {

  const { img:img, name, description, price, status, quantity } = req.body;
  const addedMeal = {
    img: img,
    name,
    description,
    price,
    status,
    quantity,
  };

if(!addedMeal){
    throw new Error('please dont send fucking shits')
}
try {
    const result = await AddedMeal.create(addedMeal)
} catch (error) {
    console.log(error.message);
}

  res.send("your in controller");
}

async function gettingAddedMeals(req, res) {
  try {
    const result = await AddedMeal.find();
    res.send(result);
  } catch (error) {
    console.log(error);
  }
}



async function updatingMonut(req, res) {
    const id = req.params.id
    try {
        await AddedMeal.findByIdAndUpdate(id, req.body)
    } catch (error) { throw error }
    res.send('The dish was successfully updated.')
}

async function deletingAddedMeal(req, res) {
    const { id } = req.params

    try {
        const results = await AddedMeal.findByIdAndDelete({ _id: id })
        console.log(results);
        const newData =await AddedMeal.find()
       res.send(newData)
    } catch (error) {
      console.log(error.message)
    }
   
}

module.exports = { addMeal,updatingMonut, gettingAddedMeals,deletingAddedMeal };
