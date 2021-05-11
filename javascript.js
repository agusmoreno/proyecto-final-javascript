//classes
class Song {
    constructor(acousticness, danceability, energy, speechiness, liveness, valence) {
        this.acousticness = acousticness;
        this.danceability = danceability;
        this.energy = energy;
        this.speechiness = speechiness;
        this.liveness = liveness;
        this.valence = valence;
    }
}

class Playlist {
    constructor(image, name, owner, songs) {
        this.image = image;
        this.name = name;
        this.owner = owner;
        this.songs = songs;
        
    }
    size() {
        return this.songs.length;
    }
    calculateFeatureAverage() {
        let avg = this.songs.reduce((previousSong, currentSong) => {

        return {
            acousticness : previousSong.acousticness + currentSong.acousticness,
            danceability : previousSong.danceability + currentSong.danceability,
            energy : previousSong.energy + currentSong.energy,
            speechiness : previousSong.speechiness + currentSong.speechiness,
            liveness : previousSong.liveness + currentSong.liveness,
            valence : previousSong.valence + currentSong.valence
        };
        });
        
       avg.acousticness = avg.acousticness / this.size();
       avg.danceability = avg.danceability / this.size();
       avg.energy = avg.energy / this.size();
       avg.speechiness = avg.speechiness / this.size();
       avg.liveness = avg.liveness / this.size();
       avg.valence = avg.valence / this.size();
       
      return avg;
    }
}
let sendButton = $("#send-button");
$("#send-button").on ("click", main);

function main() {
    let selectedPlaylist = $("#playlist-url").val()
    requestPlaylist(selectedPlaylist)
}