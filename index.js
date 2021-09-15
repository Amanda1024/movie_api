const express = require('express');
const morgan = require('morgan');
const app = express();

let topMovies = [{
        title: 'Cinderella',
        genre: 'Fantasy, Family, Animation',
        rating: 'G',
        description: 'WHen her cruel stepmother prevents her from attending the Royal Ball, Cinderella gets some unexpected help from the lovable mice Gus and Jaq, and from her Fairy Godmother.',
        directors: 'Clyde Geronimi, Wilfred Jackson, Hamilton Luske',
        released: '1950'

    },
    {
        title: 'Sleeping Beauty',
        genre: 'Fantasy, Family, Animation',
        rating: 'G',
        description: 'After being snubbed by the royal family, a malevolent fairy places a curse on a princess which only a prince can break, along with the help of three good fairies.',
        directors: 'Clyde Geronimi, Eric Larson, Les Clark',
        released: '1959'
    },
    {
        title: 'Aladdin',
        genre: 'Adventure, Comedy, Animation',
        rating: 'G',
        description: 'A kindhearted street urchin and a power-hungry Grand Vizier vie for a magic lamp that has the power to make their deepest wishes come true.',
        directors: 'Ron Clements, John Musker',
        released: '1992'
    },
    {
        title: 'Peter Pan',
        genre: 'Adventure, Family, Animation',
        rating: 'G',
        description: 'Wendy and her brothers are whisked away to the magical world of Neverland with the hero of their stories, Peter Pan.',
        directors: 'Clyde Geronimi, Wilfred Jackson, Hamilton Luske',
        released: '1953'
    },
    {
        title: 'Snow White and the Seven Dwarfs',
        genre: 'Family, Fantasy, Animation',
        rating: 'G',
        description: 'Exiled into the dangerous forest by her wicked stepmother, a princess is rescued by seven dwarf miners who make her part of their household',
        directors: 'William Cottrell, David Hand, Wilfred Jackson',
        released: '1937'

    },
    {
        title: 'Dumbo',
        genre: 'Adventure, Drama, Animation',
        rating: 'G',
        description: 'Ridiculed because of his enormous ears, a young circus elephant is assisted by a mouse to achieve his full potential.',
        directors: 'Samuel Armstrong, Norman Ferguson, Wilfred Jackson',
        released: '1941'
    },
    {
        title: 'Beauty and the Beast',
        genre: 'Family, Fantasy, Animation',
        rating: 'G',
        description: 'A prince cursed to spend his days as a hideous monster sets out to regain his humanity by earning love.',
        directors: 'Gary Trousdale, Kirk Wise',
        released: '1991'
    },
    {
        title: 'Alice in Wonderland',
        genre: 'Adventure, Family, Animation',
        rating: 'G',
        description: 'Alice stumbles into the world of Wonderland. Will she get home? Not if the Queen of Hearts has her way.',
        directors: 'Clyde Geronimi, Wilfred Jackson, Hamilton Luske',
        released: '1951'
    },
    {
        title: 'Pinocchio',
        genre: 'Comedy, Family, Animation',
        rating: 'G',
        description: 'A living puppet, with the help of a cricket as his conscience, must prove himself worthy to become a real boy.',
        directors: 'Norman Ferguson, T. Hee, Wilfred Jackson',
        released: '1940'
    },
    {
        title: 'Sword in the Stone',
        genre: 'Adventure, Comedy, Animation',
        rating: 'G',
        description: 'A poor boy named Arthur learns the power of love, kindness, knowledge and bravery with the help of a wizard called Merlin in the path to become one of the most beloved kings in English history.',
        directors: 'Wolfgang Reitherman, Clyde Geronimi, David Hand',
        released: '1963'
    }
];

// Logging middleware
app.use(morgan('common'));

// Displays array of 10 movies
app.get('/movies', (req, res) => {
    res.json(topMovies);
})

// Displays a welcome message
app.get('/', (req, res) => {
    res.send('Welcome to MyFlix!');
});

// Displays static files within the public folder
app.use(express.static('public'));

// Error message
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(8080, () => {
    console.log('MyFlix is listening in port 8080.');
});