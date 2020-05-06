/* Global Variables */
const API_KEY = '2897c174293ae3e8006d0abfe1a402e4';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

const generateElement = document.querySelector('#generate');



const getWeather = async (baseUrl, zipCode, apiKey) => {
    const response = await fetch(`${baseUrl}?zip=${zipCode}&appid=${apiKey}`, {
        method: 'GET'
    });
    return response.json();
};

const saveWeather = async (path, data) => {
    await fetch(path, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    });
    return;
};

const getAllData = async (path) => {
    const response = await fetch(path, {
        method: 'GET'
    });
    return response.json();
}

generateElement.addEventListener('click', () => {
    getWeather(BASE_URL, document.querySelector('#zip').value, API_KEY).then((weather) => {
        // Create a new date instance dynamically with JS
        const d = new Date();
        const newDate = `${d.getMonth()}.${d.getDate()}.${d.getFullYear()}`;

        const data = {
            temperature: weather.main.temp,
            date: newDate,
            userResponse: document.querySelector('#feelings').value
        };

        saveWeather('http://localhost:3000/', data).then(() => {
            getAllData('http://localhost:3000/all').then((storedData) => {
                document.querySelector('#date').innerHTML = `<span>${storedData.date}</span>`;
                document.querySelector('#temp').innerHTML = `<span>${storedData.temperature}</span>`;
                document.querySelector('#content').innerHTML = `<span>${storedData.userResponse}</span>`;
            });
        });
    });
});