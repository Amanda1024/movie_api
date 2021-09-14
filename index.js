const express = require('express');
morgan = require('morgan');
const app = express();

let topMovies = [{
        title: 'Cinderella'
    },
    {
        title: 'Sleeping Beauty'
    },
    {
        title: 'Aladdin'
    },
    {
        title: 'Peter Pan'
    },
    {
        title: 'Snow White'
    },
    {
        title: 'Dumbo'
    },
    {
        title: 'Beauty and the Beast'
    },
    {
        title: 'Alice in Wonderland'
    },
    {
        title: 'Pinnochio'
    },
    {
        title: 'Sword in the Stone'
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

// Displays static files withing the public folder
app.use(express.static('public'));

// Error message
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(8080, () => {
    console.log('MyFlix is listening in port 8080.');
});