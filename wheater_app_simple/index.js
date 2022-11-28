const wrapper = document.querySelector(".wrapper");
inputPart = document.querySelector(".input-part");
infoText = document.querySelector(".info-txt");
inputField = document.querySelector("input");
locationBtn = inputPart.querySelector("button");
wIcon = document.querySelector(".weather-part img")
let api;



inputField.addEventListener("keyup", e => {
    if(e.key == "Enter" && inputField.value != "") {
        requestApi(inputField.value);
    } 
});

locationBtn.addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSucces, onError);
    } else("Your browser not support geolocation API")
})

function onSucces(succes) {
    const {latitude, longitude} = succes.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=8ffdedcca285ecc83c1ed42fbe8422a5`;
    fetchData();
}

function onError(error) {
    infoText.innerText = error.message;
    infoText.classList.add("error")
}

function requestApi (city) {
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=8ffdedcca285ecc83c1ed42fbe8422a5`;
    fetchData();
}

function fetchData() {
    infoText.innerText = "Getting weather details...";
    infoText.classList.add("pending")
    fetch(api).then(response => response.json()).then(result => weatherDetails(result));
}



function weatherDetails(info) {
    if(info.cod == "404") {
        infoText.classList.replace("pending", "error")
        infoText.innerText = `${inputField.value} isn't a valid city`;
    } else {
        const city = info.name;
        const country = info.sys.country;
        const {description, id, icon} = info.weather[0];
        const {feels_like, humidity, temp} = info.main;

        
        if (id == 800 && icon == "01d") {
            wIcon.src = "./weather_icons/01d.png"
        } else if (id == 800 && icon == "01n") {
            wIcon.src = "./weather_icons/01n.png"
        } else if (id >= 801 && id <= 804 && icon == "02d") {
            wIcon.src = "./weather_icons/02d.png"
        } else if (id >= 801 && id <= 804 && icon == "02n") {
            wIcon.src = "./weather_icons/02n.png"
        } else if (id >= 801 && id <= 804 && icon == "03d") {
            wIcon.src = "./weather_icons/03d.png"
        } else if (id >= 801 && id <= 804 && icon == "03n") {
            wIcon.src = "./weather_icons/03n.png"
        } else if (id >= 801 && id <= 804 && icon === "04d") {
            wIcon.src = "./weather_icons/04d.png"
        } else if (id >= 801 && id <= 804 && icon == "04n") {
            wIcon.src = "./weather_icons/04n.png"
        } else if (id >= 200 && id <= 232 && icon == "11d") {
            wIcon.src = "./weather_icons/11d.png"
        } else if (id >= 300 && id <= 321 && icon == "09d") {
            wIcon.src = "./weather_icons/09d.png"
        } else if (id >= 500 && id <= 504 && icon == "10d") {
            wIcon.src = "./weather_icons/10d.png"
        } else if (id >= 500 && id <= 504 && icon == "10n") {
            wIcon.src = "./weather_icons/10n.png"
        } else if (id == 511 && icon == "13d") {
            wIcon.src = "./weather_icons/13d.png"
        } else if (id >= 520 && id <= 531 && icon == "09d") {
            wIcon.src = "./weather_icons/09d.png"
        } else if (id >= 600 && id <= 622 && icon == "13d") {
            wIcon.src = "./weather_icons/13d.png"
        } else if (id >= 701 && id <= 781 && icon == "50d") {
            wIcon.src = "./weather_icons/50d.png"
        } else if (id >= 701 && id <= 781 && icon == "50n") {
            wIcon.src = "./weather_icons/50d.png"
        }

        wrapper.querySelector(".temp .numb").innerText = Math.floor(temp);
        wrapper.querySelector(".weather").innerText = description.toUpperCase();
        wrapper.querySelector(".location span").innerText = `${city}, ${country}`;
        wrapper.querySelector(".temp .numb-2").innerText = Math.floor(feels_like);
        wrapper.querySelector(".humidity span").innerText = `${humidity}%`;

        infoText.innerText = `${inputField.value} Updated`;
    }
}