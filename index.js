//Mongoose package + importing models
const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;
//Allows Mongoose to connect to the database to perform CRUD operations
mongoose.connect('mongodb://localhost:27017/MyFlixDB', { useNewUrlParser: true, useUnifiedTopology: true });

//Packages
const express = require('express');
const morgan = require('morgan');
const app = express();
const uuid = require('uuid');

let topMovies = [{
        title: 'Cinderella',
        genre: 'Fantasy',
        rating: 'G',
        description: 'When her cruel stepmother prevents her from attending the Royal Ball, Cinderella gets some unexpected help from the lovable mice Gus and Jaq, and from her Fairy Godmother.',
        directors: 'Clyde Geronimi',
        directorBio: 'Clito "Clyde" Geronimi, known as Gerry, was an Italian American animation director. He is best known for his work at Walt Disney Productions.',
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/1/13/Cinderella_%28Official_1950_Film_Poster%29.png',
        released: '1950'
    },
    {
        title: 'Sleeping Beauty',
        genre: 'Fantasy',
        rating: 'G',
        description: 'After being snubbed by the royal family, a malevolent fairy places a curse on a princess which only a prince can break, along with the help of three good fairies.',
        directors: 'Clyde Geronimi',
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/4/43/Sleeping_beauty_disney.jpg',
        released: '1959'
    },
    {
        title: 'Aladdin',
        genre: 'Adventure',
        rating: 'G',
        description: 'A kindhearted street urchin and a power-hungry Grand Vizier vie for a magic lamp that has the power to make their deepest wishes come true.',
        directors: 'Ron Clements',
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/5/58/Aladdinposter.jpg',
        released: '1992'
    },
    {
        title: 'Peter Pan',
        genre: 'Adventure',
        rating: 'G',
        description: 'Wendy and her brothers are whisked away to the magical world of Neverland with the hero of their stories, Peter Pan.',
        directors: 'Clyde Geronimi',
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/4/46/PeterpanRKO.jpg',
        released: '1953'
    },
    {
        title: 'Snow White and the Seven Dwarfs',
        genre: 'Family',
        rating: 'G',
        description: 'Exiled into the dangerous forest by her wicked stepmother, a princess is rescued by seven dwarf miners who make her part of their household',
        directors: 'William Cottrell',
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/4/49/Snow_White_1937_poster.png',
        released: '1937'

    },
    {
        title: 'Dumbo',
        genre: 'Drama',
        rating: 'G',
        description: 'Ridiculed because of his enormous ears, a young circus elephant is assisted by a mouse to achieve his full potential.',
        directors: 'Samuel Armstrong',
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/a/a7/Dumbo-1941-poster.jpg',
        released: '1941'
    },
    {
        title: 'Beauty and the Beast',
        genre: 'Family',
        rating: 'G',
        description: 'A prince cursed to spend his days as a hideous monster sets out to regain his humanity by earning love.',
        directors: 'Gary Trousdale',
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/7/7c/Beautybeastposter.jpg',
        released: '1991'
    },
    {
        title: 'Alice in Wonderland',
        genre: 'Adventure',
        rating: 'G',
        description: 'Alice stumbles into the world of Wonderland. Will she get home? Not if the Queen of Hearts has her way.',
        directors: 'Clyde Geronimi',
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/c/c1/Alice_in_Wonderland_%281951_film%29_poster.jpg',
        released: '1951'
    },
    {
        title: 'Pinocchio',
        genre: 'Fantasy',
        rating: 'G',
        description: 'A living puppet, with the help of a cricket as his conscience, must prove himself worthy to become a real boy.',
        directors: 'Norman Ferguson',
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/b/ba/Pinocchio-1940-poster.jpg',
        released: '1940'
    },
    {
        title: 'Sword in the Stone',
        genre: 'Adventure',
        rating: 'G',
        description: 'A poor boy named Arthur learns the power of love, kindness, knowledge and bravery with the help of a wizard called Merlin in the path to become one of the most beloved kings in English history.',
        directors: 'Wolfgang Reitherman',
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/d/d8/SwordintheStonePoster.JPG',
        released: '1963'
    }
];

// Logging middleware
app.use(morgan('common'));

// Parse request body
app.use(express.json());

// Displays static files within the public folder
app.use(express.static('public'));

// Displays a welcome message
app.get('/', (req, res) => {
    res.send('Welcome to MyFlix!');
});

// Establishes user account
app.post('/movies/users', (req, res) => {
    res.send('Thank you for registering!');
});
// app.post('/movies/users', (req, res) => {
//     let newUser = req.body;

//     if (!newUser.name) {
//         const message = 'Please enter your name';
//         res.status(400).send(message);

//     } else {
//         newUser.id = uuid.v4();
//         users.push(newUser);
//         res.status(201).send('Thank you for registering!');
//     }
// });

// Displays array of 10 movies
app.get('/movies', (req, res) => {
    res.json(topMovies);
});

// Gets info about a specific movie title
app.get('/movies/:title', (req, res) => {
    res.json(topMovies.find((movie) => movie.title === req.params.title));
});

// Gets movies by specified genre
app.get('/movies/genres/:name', (req, res) => {
    res.send('Here is a list of the genre you requested');
});

// Gets movies by specified director
app.get('/movies/directors/:name', (req, res) => {
    res.send('Here is a list of movies by the director you requested');
})

// Adds a movie to user's favorites
app.post('/movies/users/:id/favorites/:movieTitle', (req, res) => {
    res.send('This title has been added to your favorites list');
});
//     let validUser = users.find((user) => user.id === req.params.id);
//     let validMovie = topMovies.find((movie) => movie.title === req.params.movieTitle);

//     if (validUser && validMovie) {
//         const message = 'Missing movie title';
//         res.status(400).send(message);
//     } else {
//         newMovie.id = uuid.v4();
//         topMovies.push(newMovie);
//         res.status(201).send(newMovie);
//     }
// });

// Deletes a movie from user's favorites
app.delete('/movies/users/:id/favorites/:movieTitle', (req, res) => {
    res.send('This title has been removed from your favorites list');
});
//     topMovies = topMovies.filter((obj) => { return obj.id !== req.params.id });
//     res.status(201).send('Movie with ID ' + req.params.id + 'has been deleted.');
// });

// Updates user info
app.put('/movies/users/:id', (req, res) => {
    res.send('Your information has been updated');
});
//     let updateUser = users.find((user) => user.id === req.params.id);

//     if (updateUser && req.body.firstName) {
//         updateUser.firstName = req.body.firstName;
//         res.status(201).send('Your first name has been updated.');
//     } else if (updateUser && req.body.lastName) {
//         updateUser.lastName = req.body.lastName;
//         res.status(201).send('Your last name has been updated.');
//     } else if (updateUser && req.body.eMail) {
//         updateUser.eMail = req.body.eMail;
//         res.status(201).send('Your email has been updated.');
//     } else {
//         res.status(404).send('User was not found.');
//     }
// });

// Deregisters user
app.delete('/movies/users/:id', (req, res) => {
    res.send('Your account has been deleted');
});
//     let deleteUser = users.find((user) => { return user.id === req.params.id });

//     if (deleteUser) {
//         deleteUser = users.filter((obj) => { return obj.id !== req.params.id });
//         res.status(201).send('User ' + req.params.id + ' has been deregistered.');
//     } else {
//         res.status(400).send('User not found.');
//     }
// });

// Error message
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(8080, () => {
    console.log('MyFlix is listening in port 8080.');
});