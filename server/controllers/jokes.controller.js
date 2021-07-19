const Joke = require('../models/jokes.model')


module.exports.findAllJokes = (req, res) => {
    Joke.find()
        .then(allJokes => res.json({ jokes: allJokes }))
        .catch(err => res.json({ message: 'Something went wrong', error: err }));
}


module.exports.findOneJoke = (req, res) => {
    Joke.findOne({ _id: req.params.id })
        .then(oneSingleJoke => res.json({ joke: oneSingleJoke }))
        .catch(err => res.json({ message: 'Something went wrong', error: err }));
}


module.exports.randomJoke = (req, res) => {
    Joke.aggregate( [ { $sample: { size: 1 } } ] )
        .then(randJoke => res.json({ joke: randJoke }))
        .catch(err => res.json({ message: 'Something went wrong', error: err }));
}


module.exports.createNewJoke = (req, res) => {
    Joke.exists({ setup: req.body.setup })
        .then(JokeExists => {
            if (JokeExists) {
                // Promise.reject() will activate the .catch() below.
                return Promise.reject('Input name already taken');
            }
            return Joke.create(req.body);
        })
        .then(saveResult => res.json({ joke: saveResult }))
        .catch(err => res.json(err));
}


module.exports.updateExistingJoke = (req, res) => {
    Joke.findOneAndUpdate(
        { _id: req.params._id },
        req.body,
        { new: true, runValidators: true }
    )
        .then(updatedJoke => res.json({ Joke: updatedJoke }))
        .catch(err => res.json({ message: 'Something went wrong', error: err }));
}


module.exports.deleteAnExistingJoke = (req, res) => {
    Joke.deleteOne({ _id: req.params._id })
        .then(result => res.json({ result: result }))
        .catch(err => res.json({ message: 'Something went wrong', error: err }));
}