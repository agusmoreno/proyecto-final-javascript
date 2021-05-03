//classes
class Song {
    constructor(title, artist, danceability) {
        this.title = title;
        this.artist = artist;
        this.danceability = parseFloat(danceability);
    }
}

class Playlist {
    constructor(name, songs, owner) {
        this.name = name;
        this.songs = songs;
        this.owner = owner;
    }

    size() {
        return this.songs.length;
    }
}

//fake data
let fakeData = JSON.parse(data)

const songJazz1 = new Song("take five", "dave brubeck", "0.455");
const songJazz2 = new Song("giant steps", "john coltrane", "0.525");
const songJazz3 = new Song("confirmation", "charlie parker", "0.355");
const songsJazz = [songJazz1, songJazz2, songJazz3];
const playlistJazz = fakeData[0];

const songCumbia1 = new Song("paisaje", "gilda", "0.785");
const songCumbia2 = new Song("no te creas tan importante", "damas gratis", "0.825");
const songCumbia3 = new Song("una cerveza", "rafaga", "0.985");
const songsCumbia = [songCumbia1, songCumbia2, songCumbia3];
const playlistCumbia = fakeData[1];

//user input
/* let sendButton = document.getElementById("send-button");
sendButton.addEventListener("click", main); */
let sendButton = $("#send-button");
$("#send-button").on ("click", main);

function main() {
    let selectedPlaylist = $("#playlist-url").val()
    // logic
    let danceabilityAverage;
    if (selectedPlaylist == "jazz") {
        danceabilityAverage = calculatePlaylistDanceabilityAverage(playlistJazz)
    } else if (selectedPlaylist == "cumbia") {
        danceabilityAverage = calculatePlaylistDanceabilityAverage(playlistCumbia);
    }

    // output
    
    $("#danceability-value").html(danceabilityAverage);
    /* let previousValue = localStorage.getItem("historial-de-playlist");
    console.log("El valor es: " + previousValue);
    if (previousValue != null && !previousValue.includes(selectedPlaylist)) {
        localStorage.setItem("historial-de-playlist", previousValue + "," + selectedPlaylist); 
    } else if (previousValue == null){
        localStorage.setItem("historial-de-playlist", selectedPlaylist);
    }
    let playlistHistory = localStorage.getItem("historial-de-playlist");
    let playlistHistoryList = playlistHistory.split(',');
    console.log(playlistHistoryList);
    for (const playlist of playlistHistoryList) {
        let playlistLI = document.createElement("li");
        let playlistTextNode = document.createTextNode(playlist)
        playlistLI.appendChild(playlistTextNode);
        document.getElementById("history").appendChild(playlistLI);

    } */
    
}

function calculatePlaylistDanceabilityAverage(playlist) {
    let playlistAverage;
    let totalSum = 0.0;
    for (let i = 0; i < playlist.songs.length; i++) {
        totalSum = totalSum + playlist.songs[i].danceability;
    }
    playlistAverage = totalSum / playlist.songs.length;
    return playlistAverage;
}


