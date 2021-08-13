const Twit = require('twit');
require('dotenv').config()

const T = new Twit({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    timeout_ms: 60 * 1000,
    strictSSL: true,
})

// Registro de errores
const RegistroErrores = (error, data, response) => {
    console.log(error);
}


// Rastrea un contenido por filtro
const stream = T.stream('statuses/filter', { track: '#shittytattoo' })
// Tareas
stream.on('tweet', tweet => {
    console.log(tweet);
    // Retweet
    T.post('statuses/retweet/:id', {
        id: tweet.id_str
    }, RegistroErrores)

    // Me gusta
    T.post('favorites/create', {
        id: tweet.id_str
    }, RegistroErrores)
})