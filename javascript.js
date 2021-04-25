//classes
class Song {
    constructor(title, artist, danceability) {
        this.title = title;
        this.artist = artist;
        this.danceability = parseFloat(danceability);
    }
}

class Playlist {
    constructor(songs, owner) {
        this.songs = songs;
        this.owner = owner;
    }
    
    size() {
        return this.songs.length;
    }
}

//fake data
const songJazz1 = new Song("take five", "dave brubeck", "0.455");
const songJazz2 = new Song("giant steps", "john coltrane", "0.525");
const songJazz3 = new Song("confirmation", "charlie parker", "0.355");
const songsJazz = [songJazz1, songJazz2, songJazz3];
const playlistJazz = new Playlist(songsJazz, "Lu");

const songCumbia1 = new Song("paisaje", "gilda", "0.785");
const songCumbia2 = new Song("no te creas tan importante", "damas gratis", "0.825");
const songCumbia3 = new Song("una cerveza", "rafaga", "0.985");
const songsCumbia = [songCumbia1, songCumbia2, songCumbia3];
const playlistCumbia = new Playlist(songsCumbia, "Lu");

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
document.getElementById("danceability-value").innerHTML = danceabilityAverage;


// functions
function requestPlaylist() {
    return prompt("Elegi una de las playlist disponibles: \nJazz \nCumbia").toLowerCase();
}

function calculatePlaylistDanceabilityAverage(playlist) {
    let playlistAverage;
    let totalSum = 0.0;
    for (let i = 0; i < playlist.size(); i++) {
        totalSum = totalSum + playlist.songs[i].danceability;
    }
    playlistAverage = totalSum / playlist.size();
    return playlistAverage;
}

const targetNode = document.getElementById("songs");

let jazzCard = "";

for (let i=0; i < songsJazz.length;i++){

    jazzCard +=

     `<div>

    <h3>Title: ${songsJazz[i].title}</h3>

    <h4>Artist: ${songsJazz[i].artist}</h4>

    <h4>Danceability: ${songsJazz[i].danceability}</h4>

    </div>`;

    

}

targetNode.innerHTML= jazzCard;

let musicLengthNode = document.createElement("p");

musicLengthNode.innerText = `playlist tracks: ${playlistJazz.size()}`

musicLengthNode.setAttribute('style',"font-weight:bold;font-size:1.5em")



targetNode.appendChild(musicLengthNode);