var cityName = document.getElementById("cityName");
var currentIcon = document.getElementById("current-icon");
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



//pulling from weather API to get info..
// function getForecast() {

//     var getLat = JSON.parse(localStorage.getItem("cityLat"));
//     var getLon = JSON.parse(localStorage.getItem("cityLong"));
//     // console.log(stringCity)
//     var requestForecast = "https://api.openweathermap.org/data/2.5/onecall?lat=" + getLat +"&lon=" + getLon+ "&appid=638e975d4bf76d78330b0c4022872572" ;
//     fetch(requestForecast)
//     .then(function (response) {
//         return response.json();
//     })
//     .then(function (data) {
//         console.log(data)
//             var createTableRow = document.createElement('tr');
//             var tableData = document.createElement('td');
//             var cardInfo = document.createElement('p');
//             cardInfo.textContent = data.

//             tableData.appendChild(cardInfo);
//             createTableRow.appendChild(tableData);
//             forecastContainer.appendChild(createTableRow);
//       }
//     )}
    

function getCurrent() {
    
    var getLat = JSON.parse(localStorage.getItem("cityLat"));
    var getLon = JSON.parse(localStorage.getItem("cityLong"));
    var requestCurrent = "https://api.openweathermap.org/data/2.5/onecall?lat=" + getLat +"&lon=" + getLon+ "&appid=638e975d4bf76d78330b0c4022872572&units=imperial" ;
    fetch(requestCurrent)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data) 
           var weatherIcon = data.current.weather[0].icon;
            cityTemp.textContent = data.current.temp + "°F";
            cityHumid.textContent = data.current.humidity + "%";
            cityWind.textContent = data.current.wind_speed + " mph";
            cityUV.textContent = data.current.uvi;
            
            // cityUV.setAttribute = ("class", "text-white");
            if (data.current.uvi <= 2) {
           
                cityUV.style.backgroundColor = "green";

            } else if (data.current.uvi <=7) {
                
                cityUV.style.backgroundColor ="#ffc107";
            } else {
               
                cityUV.style.backgroundColor = "red";
            }
            var iconImg = $("<img>");
            iconImg.attr("src","https://openweather.map.org/img/w/" + weatherIcon + ".png")
            currentIcon.appendTo(iconImg);
            for (var i =0; i < data.daily[5]; i++) {
                var dayCard = document.createElement('tr');
                dayCard.textContent = "Temp: " + data.daily[i].temp +"°F"
                forecastContainer.appendChild(dayCard)

            }
        })}      
        
    



searchCity.addEventListener('click',() => {
    getCoordinate();
    getCurrent();
    
})
