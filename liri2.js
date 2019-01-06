require("dotenv").config();

const fs = require("fs");
const axios = require("axios");
const Spotify = require('node-spotify-api');
const keys = require("./keys.js");
const spotify = new Spotify(keys.spotify);
let [node, file, action, title] = process.argv;

switch (action) {
    case "spotify-this-song":
        spotifyThisSong(title);
        break;
    case "movie-this":
        movieThis(title);
        break;
    case "do-what-it-says":
        doWhatItSays();
        break;

    default:
        console.log("please use one of the following actions: spotify-this-song, movie-this, or do-what-it-says.");
        break;
}

function spotifyThisSong(song) {
    if (song === undefined) {
        song = "The Sign";
    }
    function artistName(artist) {
        return artist.name;
    };

    spotify.search({
        type: 'track',
        query: song
    },
        function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            fs.appendFile('log.txt',
                `
------------SONG------------
Artist: ${data.tracks.items[0].artists.map(artistName)}
Song: ${data.tracks.items[0].name}
Preview Link: ${data.tracks.items[0].preview_url}
Album: ${data.tracks.items[0].album.name}`,
                (err) => {
                    if (err) return console.log(err);

                    console.log("The song information was added to your log.")
                })
        });
}

function movieThis(movie) {
    if (movie === undefined) {
        movie = "Mr. Nobody";
    }
    axios
        .get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy")
        .then(function (response) {
            fs.appendFile('log.txt',
                `
------------MOVIE------------
Movie Title: ${response.data.Title}
Year: ${response.data.Year}
IMDB rating: ${response.data.Ratings[0].Value}
Rotten Tomato rating: ${response.data.Ratings[1].Value}
Country of Production: ${response.data.Country}
Language: ${response.data.Language}
Plot: ${response.data.Plot}
Actors: ${response.data.Actors}`,
                (err) => {
                    if (err) return console.log(err);

                    console.log("The movie information was added to your log.")
                })
        })
}

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            console.log(err);
        }
        let dataArr = data.split(",");

        switch (dataArr[0]) {
            case "spotify-this-song":
                spotifyThisSong(dataArr[1]);
                break;
            case "movie-this":
                movieThis(dataArr[1]);
                break;
        }
    })
}

