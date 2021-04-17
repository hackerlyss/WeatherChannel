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





//pulling from weather API to get info..
function getForecast() {
    var insertCity = inputCity.value.trim()
    
    localStorage.setItem("insertCity", JSON.stringify(insertCity));
    var stringCity = JSON.parse(localStorage.getItem("insertCity"));
    // console.log(stringCity)
    var requestForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + stringCity+ "&appid=638e975d4bf76d78330b0c4022872572" ;
    fetch(requestForecast)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data)
        for (var i=0; i< data.length; i++) {
            var createTableRow = document.createElement('tr');
            var tableData = document.createElement('td');
            var cardInfo = document.createElement('p');
            cardInfo.textContent = data[i].list.dt_txt;

            tableData.appendChild(cardInfo);
            createTableRow.appendChild(tableData);
            forecastContainer.appendChild(createTableRow);
        }
    })
    }
function getCurrent() {
    var insertCity = inputCity.value.trim();
    localStorage.setItem("insertCity", JSON.stringify(insertCity));
    var stringCity = JSON.parse(localStorage.getItem("insertCity"));
    var requestCurrent = "api.openweathermap.org/data/2.5/weather?q=" + stringCity + "&appid=638e975d4bf76d78330b0c4022872572";
    fetch(requestCurrent)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        for (var i = 0; data.length; i++) {
            
        }
    })
}



searchCity.addEventListener('click',getForecast)
