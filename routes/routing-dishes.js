const { addMeal , gettingAddedMeals,deletingAddedMeal, updatingMonut } = require('../controller/addedToCartController.js')
const { createClient, loginUser } = require('../controller/clientController.js')
const { gettingDishes, add, updating, deleting, getById } = require('../controller/control.dishes')
const jwtAuth = require('../middlewares/jwtAuth.js')
const upload = require('../middlewares/upload')
const router = require('express').Router()

//menu routes
router.get('/', gettingDishes )
router.get('/dishId/:id',jwtAuth,getById)
router.post('/addMeal',jwtAuth,upload.single("img") ,add)
router.put('/update/:id', updating )
router.delete('/delete/:id',jwtAuth, deleting )

//client routes
router.post("/addClient", createClient)
router.post("/login",loginUser)

//added meals
router.post("/addedToCart", addMeal)
router.get("/getAddedMeals", gettingAddedMeals)
router.delete("/deleteAddedMeal/:id",deletingAddedMeal)
router.put("/changeMeal/:id" ,updatingMonut)



module.exports = router


