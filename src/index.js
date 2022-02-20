const express = require("express");
// const {MongoClient} = require('mongodb');
const mongoose = require("mongoose");
// const Validator = require("validator");
const PORT = process.env.PORT || 3000;
require("./connection");
const User = require("./usermessage");
const path = require("path");
const hbs = require("hbs");
const { join } = require("path/posix");
const { urlencoded } = require("express");

const app = express();


const staticPath = path.join(__dirname, '../public');
const tempPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// making paths 
app.use('/images', express.static(path.join(__dirname, '../templates/images')));
app.use('/css', express.static(path.join(__dirname, '../css')));
app.use(express.urlencoded({extended:false}));
app.use('/programs', express.static(path.join(__dirname, '../templates/views/program.hbs')));
app.use('/aboutus', express.static(path.join(__dirname, '../templates/views/aboutus.hbs')));
app.use('/imagem', express.static(path.join(__dirname, '../templates/images/team-members')));


// making handelbars engine 
app.set('view engine', 'hbs');
app.use(express.static(staticPath));

app.set('views', tempPath);
hbs.registerPartials(partialsPath);


app.get('/', (req, res) => {
    res.render('main');
})
app.get('/main', (req, res) => {
    res.render('main');
})
app.get('/programs', (req, res) => {
    res.render('programs');
})
app.get('/about', (req, res) => {
    res.render('aboutus');
})
app.get('/events', (req, res) => {
    res.render('eventspage');
})
app.post("/query-submitted", async (req, res) => {
    try {
        
        const userdata = new User(req.body);
        await userdata.save();
        res.status(201).render("main");
// res.send(req.body);
    } catch (error) {
        res.status(500).send(error);
    }
})

// Listening
app.listen(PORT, () => console.log(`Server started running on PORT ${PORT}`));