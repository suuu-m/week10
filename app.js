const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

const actors = require('./routers/actor');
const movies = require('./routers/movie');
const path= require('path');


const app = express();

app.listen(8080);


app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use("/", express.static(path.join(__dirname, "dist/week10Ang")));

mongoose.connect('mongodb://localhost:27017/moviesDB', { useUnifiedTopology: true, useNewUrlParser: true },function (err) {
    if (err) {
        return console.log('Mongoose - connection error:', err);
    }
    console.log('Connect Successfully');

});


//Actor endpoints 
app.get('/actors', actors.getAll);
app.post('/actors', actors.createOne);
app.get('/actors/:id', actors.getOne);
app.put('/actors/:id', actors.updateOne);
app.delete('/actors/:id', actors.deleteOne);
app.post('/actors/movies/:id', actors.addMovie);
app.get('/actors/deleteActorMovies', actors.deleteActorMovies);
//Movie endpoints

app.get('/movies', movies.getAll);
app.post('/movies', movies.createOne);
app.get('/movies/:id', movies.getOne);
app.put('/movies/:id', movies.updateOne);
app.delete('/movies/:id', movies.deleteOne); //delete movie by id
// app.post('/movies/actors/:id', movies.addActor); //Add actors into Movie
app.get('/movies/:y1/:y2', movies.getBetweenYears);
// app.delete('/movies/:id/actors/:aid', movies.deleteActor);
app.delete('/movies/by-year/:aYear', movies.deleteByaYear); //delete movies by aYear
app.post('/movies/actors/:id/:actorId', movies.addActor); //Add actors into Movie