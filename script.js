//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makeSeasonAndApisode(episode) {
  const { season, number } = episode;
  //const season = episode.season;
  //const number = episode.number;
  const paddedSeason = season.toString().padStart(2,"0");
const paddedEpisode = number.toString().padStart(2, "0");
  return `S${paddedSeason}E${paddedEpisode}`;
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;
  episodeList.forEach((episode) => {
    const paragraph = document.createElement("p");
    paragraph.textContent = ` ${makeSeasonAndApisode(episode)}`;
    rootElem.appendChild(paragraph);
    const image = document.createElement('img');
    image.src = episode.image.medium;
    rootElem.appendChild(image);

    const summaryParagraph = document.createElement("p");
    summaryParagraph.innerHTML = episode.summary;
    rootElem.appendChild(summaryParagraph);
  });
}

window.onload = setup;
