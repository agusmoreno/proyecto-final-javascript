//classes
class Song {
    constructor(title, artist, danceability) {
        this.title = title;
        this.artist = artist;
        this.danceability = parseFloat(danceability);
    }
}

//fake data
const songJazz1 = new Song("take five", "dave brubeck", "0.455");
const songJazz2 = new Song("giant steps", "john coltrane", "0.525");
const songJazz3 = new Song("confirmation", "charlie parker", "0.355");
const playlistJazz = [songJazz1, songJazz2, songJazz3];

const songCumbia1 = new Song("paisaje", "gilda", "0.785");
const songCumbia2 = new Song("no te creas tan importante", "damas gratis", "0.825");
const songCumbia3 = new Song("una cerveza", "rafaga", "0.985");
const playlistCumbia = [songCumbia1, songCumbia2, songCumbia3];

//user input
let selectedPlaylist;
selectedPlaylist = requestPlaylist();
while (selectedPlaylist != "jazz" && selectedPlaylist != "cumbia") {
    alert("Ingresar uno de los valores disponibles");
    selectedPlaylist = requestPlaylist();
}


// logic
let danceabilityAverage;
if (selectedPlaylist == "jazz") {
    danceabilityAverage = calculatePlaylistDanceabilityAverage(playlistJazz)
} else if (selectedPlaylist == "cumbia") {
    danceabilityAverage = calculatePlaylistDanceabilityAverage(playlistCumbia);
}

// output
alertAverage(danceabilityAverage);


// functions
function requestPlaylist() {
    return prompt("Elegi una de las playlist disponibles: \nJazz \nCumbia").toLowerCase();
}

function calculatePlaylistDanceabilityAverage(playlist) {
    let playlistAverage;
    let totalSum = 0.0;
    for (let i = 0; i < playlist.length; i++) {
        totalSum = totalSum + playlist[i].danceability;
    }
    playlistAverage = totalSum / playlist.length;
    return playlistAverage;
}

function alertAverage(average) {
    alert("Danceability promedio " + average);
}