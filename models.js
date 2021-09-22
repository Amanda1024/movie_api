const mongoose = require('mongoose');

let movieSchema = mongoose.Schema({
    Title: { type: String, required: true },
    Description: { type: String, required: true },
    Rating: String,
    Released: String,
    Genre: {
        Name: String,
        Description: String
    },
    Director: {
        Name: String,
        Bio: String,
        Birth: String,
        Death: String
    },
    ImagePath: String,
    Featured: Boolean
});

let userSchema = mongoose.Schema({
    Username: { type: String, requires: true },
    Password: { type: String, required: true },
    Email: { type: String, required: true },
    Birthday: Date,
    FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie ' }]
});

// let genreSchema = mongoose.Schema({
//     Name: { type: String, required: true },
//     Description: { type: String, requires: true }
// });

// let directorSchema = mongoose.Schema({
//     Name: { type: String, required: true },
//     Bio: { type: String, required: true },
//     Birth: { type: String, required: true },
//     Death: { type: String },
//     Movies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }]
// });



//Creates models (will auto-populate in the db as lowercase and plural)
let Movie = mongoose.model('Movie', movieSchema);
let User = mongoose.model('User', userSchema);
// let Genre = mongoose.model('Genre', genreSchema);
// let Director = mongoose.model('Director', directorSchema);

//Allows index.js to import models
module.exports.Movie = Movie;
module.exports.User = User;
// module.exports.Genre = Genre;
// module.exports.Director = Director;