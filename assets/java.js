var cityName = document.getElementById("cityName");
var currentDate = document.getElementById("currentDate");
var cityTemp = document.getElementById("cityTemp");
var cityHumid = document.getElementById("cityHumid");
var cityWind = document.getElementById("cityWind");
var cityUV = document.getElementById("cityUV");
var currentIcon = document.getElementById("current-icon");
var searchCity = document.getElementById("searchCity");
var inputCity = document.getElementById('inputCity');
var cityContainer = document.getElementById('city-container');
var forecastContainer = document.getElementById('forecastContainer');


currentDate.textContent = moment().format("M/DD/YYYY")
var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];

function getCoordinate() {
    var insertCity = inputCity.value.trim()
    
    localStorage.setItem("insertCity", JSON.stringify(insertCity));
    var stringCity = JSON.parse(localStorage.getItem("insertCity"));
    var requestCoord = "http://api.openweathermap.org/geo/1.0/direct?q=" + stringCity +  "&appid=638e975d4bf76d78330b0c4022872572";
    fetch(requestCoord)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data)
        cityName.textContent = insertCity
        cityName.setAttribute("class","text-uppercase")
        for (var i=0; i<data.length; i++) {
            localStorage.setItem("cityLat",JSON.stringify(data[i].lat))
            localStorage.setItem("cityLong",JSON.stringify(data[i].lon))
        }
        
        })
}
    

function getCurrent() {

    var getLat = JSON.parse(localStorage.getItem("cityLat"));
    var getLon = JSON.parse(localStorage.getItem("cityLong"));
    var requestCurrent = "https://api.openweathermap.org/data/2.5/onecall?lat=" + getLat +"&lon=" + getLon+ "&appid=638e975d4bf76d78330b0c4022872572&units=imperial" ;
    
    var cityTerm = inputCity.value
    cityTerm.value = "";

    searchHistory.push({"cityTerm":cityTerm});
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
    
    fetch(requestCurrent)
    .then(function (response) {
        return response.json();
    })
    .then(function (weatherData) {
        console.log(weatherData) 
            cityTemp.textContent = weatherData.current.temp + "°F";
            cityHumid.textContent = weatherData.current.humidity + "%";
            cityWind.textContent = weatherData.current.wind_speed + " mph";
            cityUV.textContent = weatherData.current.uvi;
            currentIcon.setAttribute("src","https://openweathermap.org/img/w/"+ weatherData.current.weather[0].icon +".png")
            if (weatherData.current.uvi <= 2) {
           
                cityUV.style.backgroundColor = "green";

            } else if (weatherData.current.uvi <=7) {
                
                cityUV.style.backgroundColor ="#ffc107";
            } else {
               
                cityUV.style.backgroundColor = "red";
            }
            

          
           displayForecast();
            //start forecast function
            document.getElementById("date0").textContent = moment.unix(weatherData.daily[0].dt).format(`dddd, MMM/DD`);
            document.getElementById("temp0").textContent = `Temp:  ${weatherData.daily[0].temp.day}°F`;
            document.getElementById("humid0").textContent = `Humidity: ${weatherData.daily[0].humidity}`;
            document.getElementById("date1").textContent = moment.unix(weatherData.daily[1].dt).format(`dddd, MMM/DD`);
            document.getElementById("temp1").textContent = `Temp:  ${weatherData.daily[1].temp.day}°F`;
            document.getElementById("humid1").textContent = `Humidity: ${weatherData.daily[1].humidity}`;
            document.getElementById("date2").textContent = moment.unix(weatherData.daily[2].dt).format(`dddd, MMM/DD`);
            document.getElementById("temp2").textContent = `Temp:  ${weatherData.daily[2].temp.day}°F`;
            document.getElementById("humid2").textContent = `Humidity: ${weatherData.daily[2].humidity}`;
            document.getElementById("date3").textContent = moment.unix(weatherData.daily[3].dt).format(`dddd, MMM/DD`);
            document.getElementById("temp3").textContent = `Temp:  ${weatherData.daily[3].temp.day}°F`;
            document.getElementById("humid3").textContent = `Humidity: ${weatherData.daily[3].humidity}`;
            document.getElementById("date4").textContent = moment.unix(weatherData.daily[4].dt).format(`dddd, MMM/DD`);
            document.getElementById("temp4").textContent = `Temp:  ${weatherData.daily[4].temp.day}°F`;
            document.getElementById("humid4").textContent = `Humidity: ${weatherData.daily[4].humidity}`;
            }
            
        )}      


    
function displayForecast() {
    forecastContainer.setAttribute("style", "display: block");
    
}



searchCity.addEventListener('click',() => {
    getCoordinate();
    getCurrent();
    makeHistoryButtons();
    
    
})

function makeHistoryButtons() {
    // Takes search history from local storage, and display the buttons on loading the page
    cityContainer.textContent = ""
    var pastCities = JSON.parse(localStorage.getItem("searchHistory"));
    if (pastCities) {
        for (var i = 0; i < pastCities.length; i++){
            var historyButtonEl = document.createElement("button");
            historyButtonEl.setAttribute("type", "button")
            historyButtonEl.setAttribute("class", "btn btn-info");
            historyButtonEl.textContent = pastCities[i].cityTerm;
            cityContainer.appendChild(historyButtonEl);
        } 
    }

}


cityContainer.addEventListener("click", function(event) {
    // Takes the stored data related to the history buttons, and calls the API
    // var cityTerm = event.target.textContent;


    var getLat = JSON.parse(localStorage.getItem("cityLat"));
    var getLon = JSON.parse(localStorage.getItem("cityLong"));
    var requestCurrent = "https://api.openweathermap.org/data/2.5/onecall?lat=" + getLat +"&lon=" + getLon+ "&appid=638e975d4bf76d78330b0c4022872572&units=imperial" ;
    
    fetch(requestCurrent)
    .then(function(weatherResponse){
        return weatherResponse.json()
        .then(function(weatherData){
            var currentWeather = {
                city: searchCity,
                date: moment.unix(weatherData.current.dt).format("MM/DD/YYYY"),
                icon: weatherData.current.weather[0].icon,
                temp: weatherData.current.temp,
                humidity: weatherData.current.humidity,
                wind: weatherData.current.wind_speed,
                uvi: weatherData.current.uvi

            }
            
            var fiveDayForecast = []
            for (var i = 1; i < 6; i++) {
                var forecast = {
                    day: i,
                    date: moment.unix(weatherData.daily[i].dt).format("MM/DD/YYYY"),
                    icon: weatherData.daily[i].weather[0].icon,
                    temp: weatherData.daily[i].temp.day,
                    humidity: weatherData.daily[i].humidity
                }
                fiveDayForecast.push(forecast);
            }
            
            displayForecast();
            getCurrent(currentWeather, fiveDayForecast);

            
        })
        .catch(err => {
            var errorMessage = document.createElement("p");
            errorMessage.textContent = "Unsuccessful request. Please search again";
            historyContainerEl.appendChild(errorMessage);
            console.error(err);
        });
    })
    .catch(err => {
        var errorMessage = document.createElement("p");
        errorMessage.textContent = "Unsuccessful request. Please search again";
        historyContainerEl.appendChild(errorMessage);
        console.error(err);
});
})
