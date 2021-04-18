var cityName = document.getElementById("cityName");
var currentDate = document.getElementById("currentDate");
var cityTemp = document.getElementById("cityTemp");
var cityHumid = document.getElementById("cityHumid");
var cityWind = document.getElementById("cityWind");
var cityUV = document.getElementById("cityUV");
var searchCity = document.getElementById("searchCity");
var inputCity = document.getElementById('inputCity');
var pastCities = document.getElementById('city-container');
var forecastContainer = document.getElementById('forecastContainer');


currentDate.textContent = moment().format("M/DD/YYYY")

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
            
            if (weatherData.current.uvi <= 2) {
           
                cityUV.style.backgroundColor = "green";

            } else if (weatherData.current.uvi <=7) {
                
                cityUV.style.backgroundColor ="#ffc107";
            } else {
               
                cityUV.style.backgroundColor = "red";
            }
            var currentIcon = document.getElementById("current-icon");
            var iconImg = $("<img>");
            iconImg.attr("src","https://openweather.map.org/img/w/" + weatherData.current.weather[0].icon + ".png")
            iconImg.appendTo(currentIcon);
            // forecastContainer.innerHTML = "";
            for (var i =0; i < weatherData.daily[5]; i++) {
                var weatherCards = document.createElement("div");
                weatherCards.setAttribute("class", "card");
                var cardHolder = document.createElement("div");
                cardHolder.setAttribute("class","card-body");
                var h4 = document.createElement("h4").textContent = moment.unix(weatherData.daily[i].dt).format("MM/DD/YYYY");
                var forecastIcon = weatherData.daily[i].weather[0].icon;
                var icon = document.createElement("img");
                icon.setAttribute("src","https://openweathermap.org/img/w/" + forecastIcon + ".png");
                var forecastTemp = document.createElement("p").textContent = "Temp: " + weatherData.daily[i].current.temp + "°F" ;
                var forecastHumid = document.createElement("p").textContent = "Humidity: " + weatherData.daily[i].current.humidity + "%";
                cardHolder.append(h4, icon, forecastTemp, forecastHumid);
                weatherCards.append(cardHolder);
                forecastContainer.append(weatherCards);
                console.log(forecastTemp + " " +forecastHumid)
            }
        })}      
        
    



searchCity.addEventListener('click',() => {
    getCoordinate();
    getCurrent();
    
})
