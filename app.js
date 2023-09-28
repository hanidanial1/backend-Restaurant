const express = require('express');

 require('dotenv').config();
const cors = require('cors');
const db = require('./mongoose');
const router = require('./routes/routing-dishes');
const app = express();
const port =  process.env.PORT || 3000

const path = require('path');

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

db()

app.use('/menu', router)
app.get('/uploads/:picId', (req, res) => {
    const picId = req.params.picId;
    const imgPath = path.join(__dirname, 'uploads', picId);
    res.sendFile(imgPath);
});


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
