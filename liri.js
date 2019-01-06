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
        console.log("please select an action.");
        break;
}

function spotifyThisSong(song) {
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
            // console.log(data);
            console.log(`Artist: ${data.tracks.items[0].artists.map(artistName)}`);
            console.log(`Song: ${data.tracks.items[0].name}`);
            console.log(`Preview Link: ${data.tracks.items[0].preview_url}`);
            console.log(`Album: ${data.tracks.items[0].album.name}`);
        });
}

function movieThis(movie) {
    axios
        .get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy")
        .then(function (response) {
            console.log(`Movie Title: ${response.data.Title}`);
            console.log(`Year: ${response.data.Year}`);
            console.log(`IMDB rating: ${response.data.Ratings[0].Value}`);
            console.log(`Rotten Tomato rating: ${response.data.Ratings[1].Value}`);
            console.log(`Country: ${response.data.Country}`);
            console.log(`Language: ${response.data.Language}`);
            console.log(`Plot: ${response.data.Plot}`);
            console.log(`Actors: ${response.data.Actors}`);
        })
}

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            console.log(err);
        }
        let dataArr = data.split(",");
        console.log(dataArr);

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

