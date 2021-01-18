var cityFormEl = document.querySelector("#city-form")
var cityInputEl = document.querySelector("#city.form-input")
var cityForcastEl = document.querySelector("#city-forcast")
var citySearchTerm = document.querySelector("#city-search-term")
var currentTemp = document.querySelector("#currentTemp")
var currentHumidity = document.querySelector("#currentHumidity")
var currentWindSpeed = document.querySelector("#currentWindSpeed")
var cityforcast5Day = document.querySelector("#city-forcast-5day")

var getCityForcast = function (city) { 
    var apiKey = "ff71a6292379e8d3e03df42072dd110c"
    // grab web api from openweather for city
    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey
    console.log(apiURL)
    fetch(apiURL).then(function (response) {  
        if (response.ok) {
            response.json().then(function (data) {  
                console.log(data)
                displayCityForcast(data, city, data.coord)
                getFiveDayForcast(city, data)
            })
            
        } else {
            alert("Error: " + response.statusText)
        }
    })
    .catch(function (error) {  
        alert("Unable to connect to OpenWeather")
    })
}

var getFiveDayForcast = function (city, data) { 
    var lat = data.coord.lat
    var lon = data.coord.lon
    console.log(lat, lon)
    var apiKey = "ff71a6292379e8d3e03df42072dd110c"
    var apiURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&exclude=minutely,hourly,alerts&appid=" + apiKey
    fetch(apiURL).then(function (response) {  
        if (response.ok) {
            response.json().then(function (data) {
                displayCityFiveDay(data, city)
            })
        } else {
            alert("Error: " +response.statusText)
        }
    })
    .catch(function (error) {  
        alert("Unable to conect to OpenWeather")
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
}

var displayCityForcast = function (data, city) {  
    if (city.length === 0) {
        cityForcastEl.textContent = "City not found"
        return
    }
    var cityTemp = data.main.temp
    var cityHumidity = data.main.humidity 
    var cityWind = data.wind.speed
    var currentConditions = data.weather[0]

    console.log(currentConditions)

    citySearchTerm.textContent = data.name
    currentTemp.textContent = cityTemp
    currentHumidity.textContent = cityHumidity + "%"
    currentWindSpeed.textContent = cityWind

}

var displayCityFiveDay = function (data, city) {  
    if (city.length === 0) {
        cityForcastEl.textContent = "City not found"
        return
    }
    console.log(data)

    var dailyForcast = data.daily
    console.log(dailyForcast)

    for (let i = 0; i < dailyForcast.length; i++) {
        var day = data.daily[i].dt 
        console.log(day)

        var dayEl = document.createElement("div")
        dayEl.classList = "card"
        
    }

}


// event listeners
cityFormEl.addEventListener("submit", formSubmitHandler)