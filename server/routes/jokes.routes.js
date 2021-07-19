const JokeController = require('../controllers/jokes.controller');

module.exports = app => {
    app.get('/api/jokes', JokeController.findAllJokes);
    app.get('/api/jokes/:_id', JokeController.findOneJoke);
    app.get('/api/jokes/random', JokeController.randomJoke);
    app.post('/api/jokes/new', JokeController.createNewJoke);
    app.put('/api/jokes/:_id', JokeController.updateExistingJoke);
    app.delete('/api/jokes/delete/:_id', JokeController.deleteAnExistingJoke);
}
