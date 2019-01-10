# Liri-Bot

### Overview

LIRI is a Language Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters and gives you back data.

### Commands 

There are three commands that can be used:

1. spotify-this-song
2. movie-this
3. do-what-it-says

### Using LIRI for the First Time

When using the program is used for the first time, it will create a log.txt file where all the data will be printed.

### Spotify This Song Command

When using this command, the first input is the command "spotify-this-song" and the second input (optional) is the song title.

![terminal input for spotify-this-song with song input](./screenshots/spotify-with-song.png)

The returned log.txt file will look like this:

![log output for spotify-this-song with song input](./screenshots/spotify-with-song-log.png)

If no song is provided, it will default to "The Sign".

![terminal input for spotify-this-song without song input](./screenshots/spotify-this-song.png)

The returned log.txt file will look like this:

![log output for spotify-this-song with song input](./screenshots/spotity-this-song_without_song_log.png)

### Movie This Command

When using this command, the first input is the command "movie-this" and the second input (optional) is the movie title.

If no movie is provided, it will default to "Mr. Nobody".

The information about the movie will be returned in the log.txt file.

### Do What It Says Command

When using this command, the only input is the command "do-what-it-says".

This command will take the information in the "random.txt" file. The file contains either the song or the movie command with a corresponding secondary input (song or movie).

The information about the movie will be returned in the log.txt file.