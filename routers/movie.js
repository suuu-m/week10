const Actor = require("../models/actor");
const Movie = require("../models/movie");
const mongoose = require("mongoose");

module.exports = {
    getAll: function (req, res) {
        Movie.find()
            .populate("actors")
            .exec(function (err, movies) {
                if (err) return res.status(400).json(err);

                res.json(movies);
            });
    },

    createOne: function (req, res) {
        let newMovieDetails = req.body;
        newMovieDetails._id = new mongoose.Types.ObjectId();
        Movie.create(newMovieDetails, function (err, movie) {
            if (err) return res.status(400).json(err);

            res.json(movie);
        });
    },

    getOne: function (req, res) {
        Movie.findOne({
                _id: req.params.id,
            })
            .populate("actors")
            .exec(function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();

                res.json(movie);
            });
    },

    updateOne: function (req, res) {
        Movie.findOneAndUpdate({
                _id: req.params.id,
            },
            req.body,
            function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();

                res.json(movie);
            }
        );
    },

    deleteOne: function (req, res) {
        Movie.findOneAndRemove({
                _id: req.params.id,
            },
            function (err) {
                if (err) return res.status(400).json(err);

                res.json();
            }
        );
    },


/////////////Add Actors into Movie
    addActor: function (req, res) {
        Movie.findOne({
                _id: req.params.id,
            },
            function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();

                Actor.findOne({
                        _id: req.params.actorId,
                    },
                    function (err, actor) {
                        if (err) return res.status(400).json(err);
                        if (!actor) return res.status(404).json();

                        movie.actors.push(actor);
                        movie.save(function (err) {
                            if (err) return res.status(500).json(err);
                            res.json(movie);
                        });
                    }
                );
            }
        );
    },
    getBetweenYears: function (req, res) {
        let query = {
            year: {
                $gte: parseInt(req.params.y1),
                $lte: parseInt(req.params.y2)
            }
        };

        console.log(query);

        Movie.find(query).exec(function (err, obj) {
            if (err) console.log(err);

            console.log(obj);

            res.json(obj);
            console.log('Done');

        })

    },


/////////////Delete Movies By aYear
    deleteByaYear: function(req, res){
        let year = req.params.aYear;
        console.log(year);
        Movie.deleteMany({
            year: {$lte: year}
        }, function(err, movies){
            if(err) return res.status(400).json(err);

            res.json(movies);
        })
    }
};