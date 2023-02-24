console.log('%c HI', 'color: firebrick')

const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = "https://dog.ceo/api/breeds/list/all";

const breedList = document.getElementById("dog-breeds");
const breedDropDown = document.getElementById("breed-dropdown");
const imageContainer = document.getElementById("dog-image-container");

let breeds = [];

document.addEventListener("DOMContentLoaded", function () {
    fetchImages();
    fetchBreeds();
});

function fetchImages() {
    fetch(imgUrl)
    .then(response => response.json())
    .then(data => {
        for (let i=0; i < data.message.length; i++) {
            let image = document.createElement("img");
            image.src = data.message[i];
            imageContainer.appendChild(image);
        }
    });
}

function fetchBreeds() {
    fetch(breedUrl)
    .then(response => response.json())
    .then(data => {
        for (const breed in data.message) {
            breeds.push(breed);
        }
        breeds.forEach(breed => displayBreedList(breed))
    })
}

function displayBreedList(breed) {
    let breedItem = document.createElement("li");
    breedItem.textContent = breed;
    breedList.appendChild(breedItem);
    breedItem.addEventListener("click", function (event) {
        event.target.style.color = "red";
    });
}

function filterBreeds(event) {
    let filteredBreeds = [];
    while (breedList.hasChildNodes()) {
        breedList.removeChild(breedList.firstChild);
    }
    filteredBreeds.push(breeds.filter(breed => breed.charAt(0) == event.target.value));
    filteredBreeds[0].forEach(breed => displayBreedList(breed));
}

breedDropDown.addEventListener("change", filterBreeds);