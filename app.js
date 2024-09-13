function research() {
  let section = document.getElementById("researchResults");

  let researchField = document
    .getElementById("researchField")
    .value.toLowerCase()
    .trim()
    .replace(/\s+/g, " ");

  if (!researchField) {
    section.innerHTML = `<p class="nothingWasFound">Nothing was found.</p>`;
    return;
  }

  let results = "";

  for (let item of data) {
    let lowerCaseTitle = item.title.toLowerCase();
    let lowerCaseDescription = item.description.toLowerCase();

    if (
      lowerCaseTitle.includes(researchField) ||
      lowerCaseDescription.includes(researchField)
    ) {
      results += `
        <div class="resultItem">
          <h2>
            <a href="#" target="_blank">${item.title}</a>
          </h2>
          <p class="littleLetters">- Age: ${item.age} || Height: ${item.height} || Club: ${item.club}</p>
          <p class="description-meta">${item.description}</p>
          <a href=${item.link} target="_blank">More information</a>
        </div>`;
    }
  }

  if (!results) {
    results = '<p class="nothingWasFound">Nothing was found.</p>';
  }

  section.innerHTML = results;
}

document
  .getElementById("researchField")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      research();
    }
  });
