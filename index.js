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