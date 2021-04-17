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
function getForecast() {

    var getLat = JSON.parse(localStorage.getItem("cityLat"));
    var getLon = JSON.parse(localStorage.getItem("cityLong"));
    // console.log(stringCity)
    var requestForecast = "https://api.openweathermap.org/data/2.5/onecall?lat=" + getLat +"&lon=" + getLon+ "&appid=638e975d4bf76d78330b0c4022872572" ;
    fetch(requestForecast)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data)
            var createTableRow = document.createElement('tr');
            var tableData = document.createElement('td');
            var cardInfo = document.createElement('p');
            cardInfo.textContent = data.

            tableData.appendChild(cardInfo);
            createTableRow.appendChild(tableData);
            forecastContainer.appendChild(createTableRow);
      }
    )}
    

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
           
            cityTemp.textContent = data.current.temp + "°F";
            cityHumid.textContent = data.current.humidity + "%";
            cityWind.textContent = data.current.wind_speed + " mph";
            currentIcon.textContent = data.current.weather[0].icon;

            // cityUV.setAttribute = ("class", "text-white");
            if (data.current.uvi <= 2) {
                cityUV.textContent = data.current.uvi;
                cityUV.setAttribute("class", "badge bg-#198754");

            }
            if (3 <= data.current.uvi <= 5) {
                cityUV.textContent = data.current.uvi;
                cityUV.setAttribute("class", "badge bg-warning");
            }
            if (6 <= data.current.uvi <=7) {
                cityUV.textContent = data.current.uvi;
                cityUV.setAttribute("class","badge bg-#0dcaf0");
            }
            if(8 <= data.current.uvi <=10) {
                cityUV.textContent = data.current.uvi;
                cityUV.setAttribute("class","badge bg-danger")
            }
            if (data.current.uvi > 10) {
                cityUV.textContent = data.current.uvi;
                cityUV.setAttribute("class", "badge bg-#6f42c1")
            }
            
        
    })
}



searchCity.addEventListener('click',() => {
    getCoordinate();
    getCurrent();
    getForecast();
})
