//Mongoose package + importing models
const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;


//Allows Mongoose to connect to the database to perform CRUD operations
mongoose.connect('mongodb://localhost:27017/myFlixDB', { useNewUrlParser: true, useUnifiedTopology: true });

//Packages
const express = require('express');
const morgan = require('morgan');
const app = express();
const uuid = require('uuid');
const bodyParser = require('body-parser');

let topMovies = [{
        title: 'Cinderella',
        description: 'When her cruel stepmother prevents her from attending the Royal Ball, Cinderella gets some unexpected help from the lovable mice Gus and Jaq, and from her Fairy Godmother.',
        rating: 'G',
        released: '1950',
        genre: 'Fantasy',
        genreDescription: 'Fantasy films are films that belong to the fantasy genre with fantastic themes, usually magic, supernatural events, mythology, folklore, or exotic fantasy worlds.',
        director: 'Clyde Geronimi',
        directorBio: 'Clyde Geronimi, known as Gerry, was an Italian American animation director. He is best known for his work at Walt Disney Productions.',
        birth: '1901',
        death: '1989',
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/1/13/Cinderella_%28Official_1950_Film_Poster%29.png',
        featured: 'True'
    },
    {
        title: 'Sleeping Beauty',
        description: 'After being snubbed by the royal family, a malevolent fairy places a curse on a princess which only a prince can break, along with the help of three good fairies.',
        rating: 'G',
        released: '1959',
        genre: 'Fantasy',
        genreDescription: 'Fantasy films are films that belong to the fantasy genre with fantastic themes, usually magic, supernatural events, mythology, folklore, or exotic fantasy worlds.',
        director: 'Clyde Geronimi',
        directorBio: 'Clyde Geronimi, known as Gerry, was an Italian American animation director. He is best known for his work at Walt Disney Productions.',
        birth: '1901',
        death: '1989',
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/4/43/Sleeping_beauty_disney.jpg',
        featured: 'False'
    },
    {
        title: 'Aladdin',
        description: 'A kindhearted street urchin and a power-hungry Grand Vizier vie for a magic lamp that has the power to make their deepest wishes come true.',
        rating: 'G',
        released: '1992',
        genre: 'Adventure',
        genreDescription: 'Adventure films are a genre of film whose plots feature elements of travel. They typically involve protagonists who must leave their home or place of comfort and go to far away lands to fulfill a goal. Settings play an important role in adventure films, sometimes as big as the characters themselves.',
        director: 'Ron Clements',
        directorBio: 'Ronald Francis Clements is an American animator, screenwriter, film director, and film producer. He often collaborates with fellow director John Musker.',
        birth: '1953',
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/5/58/Aladdinposter.jpg',
        featured: 'True'
    },
    {
        title: 'Peter Pan',
        description: 'Wendy and her brothers are whisked away to the magical world of Neverland with the hero of their stories, Peter Pan.',
        rating: 'G',
        released: '1953',
        genre: 'Adventure',
        genreDescription: 'Adventure films are a genre of film whose plots feature elements of travel. They typically involve protagonists who must leave their home or place of comfort and go to far away lands to fulfill a goal. Settings play an important role in adventure films, sometimes as big as the characters themselves.',
        director: 'Clyde Geronimi',
        directorBio: 'Clyde Geronimi, known as Gerry, was an Italian American animation director. He is best known for his work at Walt Disney Productions.',
        birth: '1901',
        death: '1989',
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/4/46/PeterpanRKO.jpg',
        featured: 'False'
    },
    {
        title: 'Snow White and the Seven Dwarfs',
        description: 'Exiled into the dangerous forest by her wicked stepmother, a princess is rescued by seven dwarf miners who make her part of their household',
        rating: 'G',
        released: '1937',
        genre: 'Family',
        genreDescription: 'A family film, is a film genre that contains children or relates to them in the context of home and family.',
        director: 'William Cottrell',
        directorBio: 'William Cottrell was born on November 19, 1906 in South Bend, Indiana, USA as William Harry Dennis Cottrell. He is known for his work on Snow White and the Seven Dwarfs (1937), Peter Pan (1953) and Alice in Wonderland (1951).',
        birth: '1906',
        death: '1995',
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/4/49/Snow_White_1937_poster.png',
        featured: 'False'
    },
    {
        title: 'Dumbo',
        description: 'Ridiculed because of his enormous ears, a young circus elephant is assisted by a mouse to achieve his full potential.',
        rating: 'G',
        released: '1941',
        genre: 'Drama',
        genreDescription: 'In film and television, drama is a category of narrative fiction intended to be more serious than humorous in tone.',
        director: 'Samuel Armstrong',
        directorBio: 'Samuel Armstrong was born on February 5, 1893 in Minneapolis, Minnesota, USA. He is known for his work on Dumbo (1941), Bambi (1942) and Snow White and the Seven Dwarfs (1937).',
        birth: '1893',
        death: '1976',
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/a/a7/Dumbo-1941-poster.jpg',
        featured: 'False'
    },
    {
        title: 'Beauty and the Beast',
        description: 'A prince cursed to spend his days as a hideous monster sets out to regain his humanity by earning love.',
        rating: 'G',
        released: '1991',
        genre: 'Family',
        genreDescription: 'A family film, is a film genre that contains children or relates to them in the context of home and family.',
        director: 'Gary Trousdale',
        directorBio: 'Gary A. Trousdale is an American film director, screenwriter, animator and storyboard artist, known for directing films such as Beauty and the Beast, The Hunchback of Notre Dame, and Atlantis: The Lost Empire. He frequently works with Kirk Wise and Don Hahn.',
        birth: '1960',
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/7/7c/Beautybeastposter.jpg',
        featured: 'False'
    },
    {
        title: 'Alice in Wonderland',
        description: 'Alice stumbles into the world of Wonderland. Will she get home? Not if the Queen of Hearts has her way.',
        rating: 'G',
        released: '1951',
        genre: 'Adventure',
        genreDescription: 'Adventure films are a genre of film whose plots feature elements of travel. They typically involve protagonists who must leave their home or place of comfort and go to far away lands to fulfill a goal. Settings play an important role in adventure films, sometimes as big as the characters themselves.',
        director: 'Clyde Geronimi',
        directorBio: 'Clyde Geronimi, known as Gerry, was an Italian American animation director. He is best known for his work at Walt Disney Productions.',
        birth: '1901',
        death: '1989',
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/c/c1/Alice_in_Wonderland_%281951_film%29_poster.jpg',
        featured: 'True'
    },
    {
        title: 'Pinocchio',
        description: 'A living puppet, with the help of a cricket as his conscience, must prove himself worthy to become a real boy.',
        rating: 'G',
        released: '1940',
        genre: 'Fantasy',
        genreDescription: 'Fantasy films are films that belong to the fantasy genre with fantastic themes, usually magic, supernatural events, mythology, folklore, or exotic fantasy worlds.',
        director: 'Norman Ferguson',
        directorBio: 'William Norman Ferguson was an animator for Walt Disney Studios and a central contributor to the studio\'s stylistic development in the 1930s. He is most frequently noted for his contribution to the creation of Pluto, one of the studio\'s best known and most enduring characters, and is the artist most closely associated with that character.',
        birth: '1902',
        death: '1957',
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/b/ba/Pinocchio-1940-poster.jpg',
        featured: 'False',
    },
    {
        title: 'Sword in the Stone',
        description: 'A poor boy named Arthur learns the power of love, kindness, knowledge and bravery with the help of a wizard called Merlin in the path to become one of the most beloved kings in English history.',
        rating: 'G',
        released: '1963',
        genre: 'Adventure',
        genreDescription: 'Adventure films are a genre of film whose plots feature elements of travel. They typically involve protagonists who must leave their home or place of comfort and go to far away lands to fulfill a goal. Settings play an important role in adventure films, sometimes as big as the characters themselves.',
        director: 'Wolfgang Reitherman',
        directorBio: 'Wolfgang Reitherman, also known and sometimes credited as Woolie Reitherman, was a German-American animator, director and producer who was one of the Nine Old Men of core animators at Walt Disney Productions.',
        birth: '1909',
        death: '1985',
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/d/d8/SwordintheStonePoster.JPG',
        featured: 'True',
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
app.post('/users', (req, res) => {
    Users.findOne({ Username: req.body.Username })
        .then((user) => {
            if (user) {
                return res.status(400).send(req.body.Username + 'already exists');
            } else {
                Users
                    .create({
                        Username: req.body.Username,
                        Password: req.body.Password,
                        Email: req.body.Email,
                        Birthday: req.body.Birthday
                    })
                    .then((user) => { res.status(201).json(user) })
                    .catch((error) => {
                        console.error(error);
                        res.status(500).send('Error: ' + error);
                    })
            }
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
        });
});

// Displays array of 10 movies
app.get('/movies', (req, res) => {
    res.json(topMovies);
});

// Gets info about a specific movie title
app.get('/movies/:Title', (req, res) => {
    Movies.findOne({ Title: req.params.Title })
        .then((movie) => {
            res.json(movie);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

// Gets movies by specified genre
app.get('movies/genres/:Name', (req, res) => {
    Movies.genres.findOne({ 'Genre.Name': req.params.Name })
        .then((genre) => {
            res.json(movie.Genre);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

// Gets info about a director
app.get('movies/directors/:Name', (req, res) => {
    Movies.directors.findOne({ 'Director.Name': req.params.Name })
        .then((movie) => {
            res.json(movie.Director);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

// Adds a movie to user's favorites
app.post('/users/:Username/movies/:MovieID', (req, res) => {
    Users.findOneAndUpdate({ Username: req.params.Username }, {
            $push: { FavoriteMovies: req.params.MovieID }
        }, { new: true }, // To ensure that the updated document is returned
        (err, updatedUser) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error: ' + err);
            } else {
                res.json(updatedUser);
            }
        });
});


// Deletes a movie from user's favorites
app.delete('/users/:Username/movies/:MovieID', (req, res) => {
    Users.findOneAndUpdate({ Username: req.params.Username }, {
            $pull: { FavoriteMovies: req.params.MovieID }
        }, { new: true }, // To ensure that the updated data is returned
        (err, updatedUser) => {
            if (err) {
                console.error(err);
                res.status(500).send("Error: " + err);
            } else {
                res.json(updatedUser);
            }
        });
});

// Updates user info by username
app.put('/users/:Username', (req, res) => {
    Users.findOneAndUpdate({ Username: req.params.Username }, {
            $set: {
                Username: req.body.Username,
                Password: req.body.Password,
                Email: req.body.Email,
                Birthday: req.body.Birthday,
            }
        }, { new: true }, // To ensure that the updated data is returned
        (err, updatedUser) => {
            if (err) {
                console.error(err);
                res.status.apply(500).send('Error: ' + err);
            } else {
                res.json(updatedUser);
            }
        });
});


// Deregisters user
app.delete('/users/:Username', (req, res) => {
    Users.findOneAndRemove({ Username: req.params.Username })
        .then((user) => {
            if (!user) {
                res.status(400).send(req.params.Username + ' was not found');
            } else {
                res.status(200).send(req.params.Username + ' was deleted.');
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

// Gets user by username
app.get('/users/:Username', (req, res) => {
    Users.findOne({ Username: req.params.Username })
        .then((user) => {
            res.json(user);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

// Gets all users
app.get('/users', (req, res) => {
    Users.find()
        .then((users) => {
            res.status(201).json(users);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

// Error message
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(8080, () => {
    console.log('myFlix is listening in port 8080.');
});