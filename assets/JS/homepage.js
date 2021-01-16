var cityFormEl = document.querySelector("#city-form")
var cityInputEl = document.querySelector("#city.form-input")
var cityForcastEl = document.querySelector("#city-forcast")

var getCityForcast = function (city) { 
    var apiKey = "ff71a6292379e8d3e03df42072dd110c"
    // grab web api from openweather for city
    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q={" + city + "}&appid={" + apiKey + "}"
    console.log(apiURL)
    fetch(apiURL).then(function (response) {  
        if (response.ok) {
            console.log(response)
        } else {
            alert("Error: " + response.statusText)
        }
    })
    .catch(function (error) {  
        alert("Unable to connect to OpenWeather")
    })
}

var formSubmitHandler = function (event) {  
    event.preventDefault()

    // get value from input element
    var city = cityInputEl.value.trim()

    if (city) {
        getCityForcast(city)
        cityInputEl.value = ""
    } else {
        alert("Please Enter A City Name")
    }
    console.log(city)
    savePastCity()
}

var loadPastCity = function () {  
    var pastCity = JSON.parse(localStorage.getItem("pastCity"))


    
}

var savePastCity = function () {  
    localStorage.setItem("pastCity", JSON.stringify(city))
}

var displayCityForcast = function (city) {  
    if (city.length === 0) {
        cityForcastEl.textContent = "City not found"
        return
    }

    
}


// event listeners
loadPastCity()
cityFormEl.addEventListener("submit", formSubmitHandler)