// const endpoint =
//   "https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json";

// const restaurants = [];

// fetch(endpoint)
//   .then((blob) => blob.json())
//   .then((data) => restaurants.push(...data));

// function findMatches(wordToMatch, restaurants) {
//   return restaurants.filter((place) => {
//     const regex = new RegExp(wordToMatch, "gi");
//     return place.category.match(regex) || place.name.match(regex);
//   });
// }

// function displayMatches() {
//   const matchArray = findMatches(this.value, restaurants);
//   const html = matchArray.map((place) => {
//       const regex = new RegExp(this.value, 'gi');
//       const restaurantName = place.name.replace(regex, `<span class="h1">${this.value}</span>`);
//       return `
//            <li>
//              <span class="name">${restaurantName}</span><br />
//              <span class="category">${place.category}</span><br />
//              <address class="address">
//                 ${place.address_line_1}<br />
//                  ${place.city}<br />
//                  ${place.zip}
//             </address>
//            </li>
//          `;
//     })
//     .join("");
// //   const suggestions = document.querySelector(".suggestions");
//   suggestions.innerHTML = html;
// }

// const userinputs = document.querySelector(".userinput");
// const suggestions = document.querySelector(".suggestions");

// // userinputs.addEventListener("change", displayMatches);
// // userinputs.addEventListener("keypress", displayMatches);
// userinputs.addEventListener("keydown", displayMatches);
// userinputs.addEventListener("keyup", displayMatches);

function matchWord(wordMatch, data) {
  return data.filter((item) => {
    const regex = new RegExp(wordMatch, 'gi'); // This matches case-insensitively through the whole string
    // check names first
    // we could also check owners or compliance!
    return item.name.match(regex) || item.category.match(regex);
  });
}

function displayMatches(e, dataSet) {
  console.log(e.target.value);
  const matches = matchWord(e.target.value, dataSet);
  let placesHTML = matches.map((place) => `
    <li>
        <span class="name">${place.name}</span><br>
        <span class="category">${place.category}</span>
        <address>${place.address_line_1}<br>
        ${place.city}<br>
        ${place.zip}<address>
    </li>
    `);
  if (e.target.value.length == 0) {
    placesHTML = [];
  }
  return placesHTML;
}

async function mainThread() {
  const data = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json');
  const json = await data.json();
  const input = document.querySelector('input[type="text"]');
  input.addEventListener('input', (e) => {
    const makeMatchesList = displayMatches(e, json);
    const target = document.querySelector('.suggestions');
    target.innerHTML = makeMatchesList;
  });
}

window.onload = mainThread;