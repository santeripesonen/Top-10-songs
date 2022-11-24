
function showError(errorMessage) {
    const inputField = document.getElementById("todo-input")
    const inputError = document.getElementById("input-error")
    inputError.textContent = errorMessage;
    inputField.style.border = "2px solid red"
    inputError.classList.remove("hidden")

    setTimeout(() => {
        inputField.style.border = "none"
        inputError.classList.add("hidden")
    }, 3000)
}

function loadTop10() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        const result = JSON.parse(this.responseText);
        // if result is error, show it
        if (result.error) {
            showError(result.message);
            return;
        }
        var trackList = document.getElementById("track-list");
        // empty the existing track list
        trackList.innerHTML = "";
        var i = 1
        result.tracks.track.forEach((track) => {
            // add tracks to the list
            var li = document.createElement("li");
            var a = document.createElement("a");
            a.appendChild(document.createTextNode(i + ". " + track.artist.name + ": " + track.name));
            a.href = track.url;
            a.target = "_blank";
            li.append(a);
            trackList.appendChild(li);
            i++;
        });
    }
    // get country input
    const country = document.getElementById("todo-input").value;

    // get top 10 data from lastfm api, using the country and api_key
    xhttp.open("GET", "https://ws.audioscrobbler.com/2.0/?method=geo.gettoptracks&country=" + country + "&limit=10&api_key=63a083f0fe54a3f5f42eb900d351c474&format=json", true);
    xhttp.send();
}
