//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makeSeasonAndApisode(episode) {
  const { season, number } = episode;
  //const season = episode.season;
  //const number = episode.number;
  const paddedSeason = season.toString().padStart(2, "0");
  const paddedEpisode = number.toString().padStart(2, "0");
  return `S${paddedSeason}E${paddedEpisode}`;
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;
  rootElem.innerHTML = "";
  const countParagraph = document.createElement("p");
  countParagraph.innerText = `Showing ${episodeList.length} episodes`;
  rootElem.appendChild(countParagraph);

  episodeList.forEach((episode) => {
    const paragraph = document.createElement("p");
    paragraph.textContent = ` ${makeSeasonAndApisode(episode)}`;
    rootElem.appendChild(paragraph);
    const image = document.createElement("img");
    image.src = episode.image.medium;
    rootElem.appendChild(image);

  
    rootElem.innerHTML += episode.summary;
  });
}

const searchInput = document.getElementById("search-input");
searchInput.addEventListener("input", (event) => {
  const searchString = event.target.value.toLowerCase();
  const filteredEpisodes = getAllEpisodes().filter((episode) => {
    return (
      episode.summary.toLowerCase().includes(searchString) ||
      episode.name.toLowerCase().includes(searchString)
    );
  });
  makePageForEpisodes(filteredEpisodes);
});
window.onload = setup;
