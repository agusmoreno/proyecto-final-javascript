//fake data
const songJazz1 = 0.335; //value danceability
const songJazz2 = 0.225;
const songJazz3 = 0.115;
const playlistJazz = [songJazz1, songJazz2, songJazz3];

const songCumbia1 = 1.0; //value danceability
const songCumbia2 = 0.995;
const songCumbia3 = 0.885;
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
        totalSum = totalSum + playlist[i];
    }
    playlistAverage = totalSum / playlist.length;
    return playlistAverage;
}

function alertAverage(average) {
    alert("Danceability promedio " + average);
}