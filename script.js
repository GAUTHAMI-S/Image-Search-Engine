const accessKey = "y_uP_n7LPVYXRWxnjLuf8QlCLe1kPJm4mDOqgmz8kJQ";

const formElement = document.querySelector("form");
const inputElement = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button");

let inputData = "";
let page = 1;

async function searchImages() {
  inputData = inputElement.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  const results = data.results;
  console.log(results);
  if (page === 1) {
    searchResults.innerHTML = "";
  }
  results.map((result) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search-result");
    // creating image
    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;
    // creating link
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    // link should be open in a new browser window or tab
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description;
    // adding it to imageWrapper
    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    searchResults.appendChild(imageWrapper);
  });
  page++;
  if (page > 1) {
    showMore.style.display = "block";
  }
}
formElement.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImages();
});
formElement.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    page = 1;
    searchImages();
  }
});
showMore.addEventListener("click", (event) => {
  searchImages();
});
