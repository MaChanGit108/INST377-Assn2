const endpoint =
  "https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json";

const restaurants = [];

fetch(endpoint)
  .then((blob) => blob.json())
  .then((data) => restaurants.push(...data));

function findMatches(wordToMatch, restaurants) {
  return restaurants.filter((place) => {
    const regex = new RegExp(wordToMatch, "gi");
    return place.category.match(regex) || place.name.match(regex);
  });
}

function displayMatches() {
  const matchArray = findMatches(this.value, restaurants);
  const html = matchArray.map((place) => {
      const regex = new RegExp(this.value, 'gi');
      const restaurantName = place.name.replace(regex, `<span class="h1">${this.value}</span>`);
      return `
           <li>
             <span class="name">${restaurantName}</span><br />
             <span class="category">${place.category}</span><br />
             <address class="address">
                ${place.address_line_1}<br />
                 ${place.city}<br />
                 ${place.zip}
            </address>
           </li>
         `;
    })
    .join("");
//   const suggestions = document.querySelector(".suggestions");
  suggestions.innerHTML = html;
}

const userinputs = document.querySelector(".userinput");
const suggestions = document.querySelector(".suggestions");

// userinputs.addEventListener("change", displayMatches);
// userinputs.addEventListener("keypress", displayMatches);
userinputs.addEventListener("keydown", displayMatches);
userinputs.addEventListener("keyup", displayMatches);