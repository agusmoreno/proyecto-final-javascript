const tokenEndpoint = 'https://accounts.spotify.com/api/token';
const getBasePlaylistEndpoint = 'https://api.spotify.com/v1/playlists/';
const getAudioFeaturesEndpoint = 'https://api.spotify.com/v1/audio-features';

function requestToken() {
     $.ajax({
        async: false,
        type: "POST",
        url: tokenEndpoint,
        data: { 'grant_type': 'client_credentials' },
        headers: {
            Authorization: 'Basic ' + keys.encoded
        },
        success: tokenRequestSuccess,
        error: tokenRequestError
    });
}

function tokenRequestSuccess(data) {
    let accessToken = data.access_token;
    localStorage.setItem("access-token", "Bearer " + accessToken);
}

function tokenRequestError(error) {
    console.log(error.responseJSON.error);
}

function getAccessToken() {
    if (localStorage.getItem("access-token") == null) { 
        requestToken();
    }
    return localStorage.getItem("access-token");
}

function requestPlaylist(playlistUrl) {
    let playlistId = playlistUrl.substring(playlistUrl.lastIndexOf("/") + 1, playlistUrl.lastIndexOf("/") + 23);
    let getPlaylistEndpoint = getBasePlaylistEndpoint + playlistId;
    $.ajax({
        url: getPlaylistEndpoint,
        success: playlistInfo,
        error: (error) => {
            if (error.status == 401) {
                requestToken()
                requestPlaylist(playlistUrl)
            } else {
                console.log(error);
            }
        }, 
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: getAccessToken()
        }
      });
}

function playlistInfo(data) {
    console.log(data);
    let playlistImage = data.images[0].url
    let playlistName = data.name
    let playlistOwner = data.owner.display_name
    let playlistTracksId = data.tracks.items.map((songItem) => songItem.track.id ).join()
    let songs = requestFeatures(playlistTracksId)
    console.log(playlistImage);
    console.log(playlistName);
    console.log(playlistOwner);
    console.log(playlistTracksId);
    console.log("canciones");
    console.log(songs);
    let playlist = new Playlist(playlistImage, playlistName, playlistOwner, songs);
    let averages = playlist.calculateFeatureAverage();
    $("#acousticness-value").html(averages.acousticness.toFixed(2));
    $("#acousticness-value").slideUp(1000)
                            .delay(5)
                            .slideDown(2000);
    $("#danceability-value").html(averages.danceability.toFixed(2));
    $("#danceability-value").slideUp(1000)
                            .delay(5)
                            .slideDown(2000);
    $("#energy-value").html(averages.energy.toFixed(2));
    $("#energy-value").slideUp(1000)
                            .delay(5)
                            .slideDown(2000);
    $("#speechiness-value").html(averages.speechiness.toFixed(2));
    $("#speechiness-value").slideUp(1000)
                            .delay(5)
                            .slideDown(2000);
    $("#liveness-value").html(averages.liveness.toFixed(2));
    $("#liveness-value").slideUp(1000)
                            .delay(5)
                            .slideDown(2000);
    $("#valence-value").html(averages.valence.toFixed(2));
    $("#valence-value").slideUp(1000)
                            .delay(5)
                            .slideDown(2000);

    $(".playlist-img").attr("src",playlistImage);
    $("#playlist-name").html(playlistName);
    $("#playlist-owner").html(playlistOwner);
    $("#playlist-tracks").html(playlist.size() + " tracks");

    $(".progress-bar-acousticness").attr("style","width: " + averages.acousticness*100 + "%;")
    $(".progress-bar-danceability").attr("style","width: " + averages.danceability*100 + "%;")
    $(".progress-bar-energy").attr("style","width: " + averages.energy*100 + "%;")
    $(".progress-bar-speechiness").attr("style","width: " + averages.speechiness*100 + "%;")
    $(".progress-bar-liveness").attr("style","width: " + averages.liveness*100 + "%;")
    $(".progress-bar-valence").attr("style","width: " + averages.valence*100 + "%;")


}

function requestFeatures(tracksId) {
    let tracks;
    $.ajax({
        url: getAudioFeaturesEndpoint,
        async: false,
        data: {
            ids: tracksId
        },
        success: (data) => {
            let songsFeatures = data.audio_features.map((features) => {
                return new Song(features.acousticness, features.danceability, features.energy, features.speechiness, features.liveness, features.valence);
            })
            tracks = songsFeatures;
        },
        error: (error) => {
            if (error.status == 401) {
                requestToken()
                requestFeatures(tracksId)
            } else {
                console.log(error);
            }
        }, 
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: getAccessToken()
        }
      });
      return tracks;
}
