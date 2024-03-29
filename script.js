const url = 'https://api.tvmaze.com/shows/82/episodes';

let allEpisodes = [];
//You can edit ALL of the code here

const rootElem = document.getElementById('root');

function setup() {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      //here we do anything with data
      console.log(data);
      allEpisodes = data;
      makePageForEpisodes(allEpisodes);
    })
    .catch((err) => console.error(err));
}

function makeSeasonAndApisode(episode) {
  const { season, number, name } = episode;
  //const season = episode.season;
  //const number = episode.number;
  const paddedSeason = season.toString().padStart(2, '0');
  const paddedEpisode = number.toString().padStart(2, '0');
  const episodeName = name;
  return `S${paddedSeason}E${paddedEpisode} ${episodeName}`;
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById('root');
  const selectElem = document.getElementById('select-input');
  console.log(selectElem);
  //clear out the rootElement's HTML before we add the new stuff
  rootElem.innerHTML = '';
  const countParagraph = document.createElement('p');
  countParagraph.innerText = `Showing ${episodeList.length} episodes`;
  rootElem.appendChild(countParagraph);

  episodeList.forEach((episode) => {
    //add the season, apisode and name
    const paragraph = document.createElement('p'); //create element
    paragraph.textContent = ` ${makeSeasonAndApisode(episode)}`; //change it
    rootElem.appendChild(paragraph); //append it

    //add the image
    const image = document.createElement('img');
    image.src = episode.image.medium;
    rootElem.appendChild(image);

    //add the summary paragraph nb the episode.summary is actually HTML
    rootElem.innerHTML += episode.summary;

    //add it to the select element as an option (dropdown)
    const option = document.createElement('option');
    option.textContent = ` ${makeSeasonAndApisode(episode)} - ${episode.name}`;
    option.value = episode.id;
    selectElem.appendChild(option);
  });
}

const searchInput = document.getElementById('search-input');
searchInput.addEventListener('input', (event) => {
  const searchString = event.target.value.toLowerCase();
  const filteredEpisodes = allEpisodes.filter((episode) => {
    return (
      episode.summary.toLowerCase().includes(searchString) ||
      episode.name.toLowerCase().includes(searchString)
    );
  });
  makePageForEpisodes(filteredEpisodes);
});

//for select input
const selectInput = document.getElementById('select-input');
selectInput.addEventListener('change', (event) => {
  //e.target.value ===the episode id that has been clicked on
  console.log(event);
  const idSelectedByUser = Number(event.target.value);
  console.log({ idSelectedByUser });
  const selectedEpisode = allEpisodes.find(
    (episode) => episode.id === idSelectedByUser
  );
  console.log(selectedEpisode);
  if (selectedEpisode) {
    makePageForEpisodes([selectedEpisode]);
  }
});

window.onload = setup;
