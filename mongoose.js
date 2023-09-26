const { default: mongoose } = require("mongoose");
require('dotenv').config()
const db = process.env.DATABASE

async function mongooseMain() {
    try {
        mongoose.connect(db)
        console.log('Connected to mongoDB successfully...')
    } catch (error) {
        console.log('error')

    }
}
module.exports = mongooseMain


