require('dotenv').config();

const express = require('express');
const app = express();

const jwt = require('jsonwebtoken');

app.use(express.json());

let movies = {};

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
}

app.get('/movies', authenticateToken, async (req, res) => {
    const user = req.user.name;
    res.json(movies[user] || []);
})

app.get('/movies/:title', authenticateToken, async (req, res) => {
    const user = req.user.name;
    const movie = movies[user].filter(movie => movie.title === req.params.title);
    if (!movie) return res.sendStatus(404);

    res.json(movie);
})

app.post('/movies', authenticateToken, async (req, res) => {
    const user = req.user.name;
    const movie = {
        title: req.body.title,
        review: req.body.review,
        rating: req.body.rating
    }
    if (!movies[user]) {
        movies[user] = [];
    }
    movies[user].push(movie);
    res.status(201).send();
})

app.delete('/movies/:title', authenticateToken, async (req, res) => {
    const user = req.user.name;
    if (!movies[user]) {
        return res.sendStatus(404);
    }
    const index = movies[user].findIndex(movie => movie.title === req.params.title);
    if (index === -1) {
        return res.sendStatus(404);
    }
    
    movies[user].splice(index, 1);
    res.sendStatus(204);
})

// app.post

app.listen(3000);

