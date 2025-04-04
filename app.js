// Armazena os resultados da pesquisa
let searchResults = [];

function research() {
  let section = document.getElementById("researchResults");

  let researchField = document
    .getElementById("researchField")
    .value.toLowerCase()
    .trim()
    .replace(/\s+/g, " ");

  if (!researchField) {
    section.innerHTML = `<p class="nothingWasFound">Nothing was found.</p>`;
    searchResults = [];
    return;
  }

  // Filtra os jogadores que correspondem à pesquisa
  searchResults = data.filter((item) => {
    let lowerCaseTitle = item.title.toLowerCase();
    let lowerCaseDescription = item.description.toLowerCase();
    return (
      lowerCaseTitle.includes(researchField) ||
      lowerCaseDescription.includes(researchField)
    );
  });

  if (searchResults.length === 0) {
    section.innerHTML = '<p class="nothingWasFound">Nothing was found.</p>';
    return;
  }

  // Se encontrar apenas um resultado, mostra o card completo diretamente
  if (searchResults.length === 1) {
    displayPlayerCard(searchResults[0]);
    return;
  }

  // Se houver múltiplos resultados, mostra a lista de jogadores
  displayPlayerList(searchResults);
}

function displayPlayerList(players) {
  let section = document.getElementById("researchResults");
  let resultsHTML = `
    <div class="search-info">${players.length} players found. Click on a player to see details.</div>
    <div class="player-list">
  `;

  players.forEach((player, index) => {
    resultsHTML += `
      <div class="player-list-item" onclick="displayPlayerCard(searchResults[${index}])">
        <span class="player-name">${player.title}</span>
        <span class="player-team">${player.club}</span>
      </div>
    `;
  });

  resultsHTML += `</div>`;
  section.innerHTML = resultsHTML;
  section.scrollTop = 0;
}

function displayPlayerCard(player) {
  let section = document.getElementById("researchResults");

  let cardHTML = `
    <div class="back-button" onclick="displayPlayerList(searchResults)">
      <i class="fas fa-arrow-left"></i> Back to results
    </div>
    <div class="resultItem">
      <h2>${player.title}</h2>
      <p class="littleLetters">Age: ${player.age} | Height: ${player.height} | Club: ${player.club}</p>
      <p class="description-meta">${player.description}</p>
      <a href="${player.link}" target="_blank" class="more-info-button">More information</a>
    </div>
  `;

  section.innerHTML = cardHTML;
  section.scrollTop = 0;
}

// Listener para tecla Enter
document
  .getElementById("researchField")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      research();
    }
  });

// Listener adicional para o botão Research
document.addEventListener("DOMContentLoaded", function () {
  const researchButton = document.getElementById("research");
  if (researchButton) {
    researchButton.addEventListener("click", function () {
      research();
    });
  }
});
