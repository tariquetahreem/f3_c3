// Function to fetch and display the current image of the day
function getCurrentImageOfTheDay() {
    const currentDate = new Date().toISOString().split("T")[0];
    const apiKey = '0EERTXVc4hSbe0Pl4DSkg6lCYb1Is36rhMu3pELS'; 

    fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${currentDate}`)
        .then(response => response.json())
        .then(data => {
            const currentImageContainer = document.getElementById('current-image-container');
            currentImageContainer.innerHTML = `
                <h2>${data.title}</h2>
                <img src="${data.url}" alt="${data.title}">
                <p>${data.explanation}</p>
            `;
        })
        .catch(error => console.error(error));
}

// Function to fetch and display the image for a selected date
function getImageOfTheDay(date) {
    const apiKey = '0EERTXVc4hSbe0Pl4DSkg6lCYb1Is36rhMu3pELS'; 

    fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`)
        .then(response => response.json())
        .then(data => {
            const currentImageContainer = document.getElementById('current-image-container');
            currentImageContainer.innerHTML = `
                <h2>${data.title}</h2>
                <img src="${data.url}" alt="${data.title}">
                <p>${data.explanation}</p>
            `;

            // Save the date to local storage and add it to the search history
            saveSearch(date);
        })
        .catch(error => console.error(error));
}

// Function to save a search date to local storage
function saveSearch(date) {
    let searches = JSON.parse(localStorage.getItem('searches')) || [];
    searches.push(date);
    localStorage.setItem('searches', JSON.stringify(searches));

    // Add the date to the search history
    addSearchToHistory(date);
}

// Function to add a search date to the search history
function addSearchToHistory(date) {
    const searchHistory = document.getElementById('search-history');
    const searchItem = document.createElement('li');
    searchItem.textContent = date;

    // When a user clicks on a specific list item, fetch and display the data for that date
    searchItem.addEventListener('click', () => {
        getImageOfTheDay(date);
    });

    searchHistory.appendChild(searchItem);
}

// Event listener for the search form submission
const searchForm = document.getElementById('search-form');
searchForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const searchInput = document.getElementById('search-input');
    const selectedDate = searchInput.value;

    if (selectedDate) {
        getImageOfTheDay(selectedDate);
    }
});

// Load the current image of the day when the page loads
getCurrentImageOfTheDay();
