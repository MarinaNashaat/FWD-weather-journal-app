/* Global Variables */
const apiKey = '&appid=532c1fc95b367b8ec9591e9f3748f785&units=imperial';


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();

document.getElementById("generate").addEventListener('click', function () {
    let data = {
        zipCode: document.getElementById("zip").value,
        feel: document.getElementById("feelings").value,
        date: newDate
    }
    getWeather(data.zipCode)
        .then(function (info) {
            data.temp = info.main.temp
            postData('http://localhost:4000/postData', data)
        })
        .then(updateUI())
})
const getWeather = async (zipCode) => {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}${apiKey}`)
    try {
        const data = await res.json();
        return data;
    }
    catch (error) {
        console.log(error, "error");
    }
}

const postData = async (url = '', data = {}) => {

    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
};


const updateUI = async () => {
    const responseData = await fetch('http://localhost:4000/all');
    try {
        const allData = await responseData.json();
        document.getElementById("date").innerHTML = allData.date;
        document.getElementById("temp").innerHTML = allData.temp + 'degrees';
        document.getElementById("content").innerHTML = allData.feel;

    }
    catch (error) {
        console.log("error", error);
    }
}