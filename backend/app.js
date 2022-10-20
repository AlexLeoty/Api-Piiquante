const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const sauceRoutes = require('./routes/sauces')
const userRoutes = require('./routes/user');
const path = require('path');


mongoose.connect('mongodb+srv://'+ process.env.MONGO_DB_USER +':'+ process.env.MONGO_DB_USER_MDP +'@cluster0.dmvpehz.mongodb.net/?retryWrites=true&w=majority',
{UseNewUrlParser: true,
useUnifiedTopology: true})
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use(express.json());

app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'origin, X-Requested-With, Content, Accept, Content-type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});



app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname,'images')));

module.exports = app;