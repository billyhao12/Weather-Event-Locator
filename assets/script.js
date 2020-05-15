var userSearches = ['Seattle']
console.log(userSearches[0]);

$('#searchBtn').on('click',function(){
  
  var userSearch = $('#search-input').val();
  userSearches.push(userSearch);
  localStorage.setItem(1, userSearch);
  
  offset = 0;

  fetchDataWeather(userSearch);
  dontCrashMyBrowser(userSearch);
  console.log(userSearches);
});

        
// First API Ajax Call
    
// !Changed the function to accept and argument eqaul to 
// !the url for the ajax call inside of the function
function weatherAjaxCall(URL){
    
  $.ajax({
    url: URL,
    method: "GET"
  }).then(function(response) {
    // We store all of the retrieved data inside of an object called "response"
    
    // Log the resulting object
    console.log(response);

    displayWeather(response);

  });
};

function fetchDataWeather(someCity){
  var weatherApiKey = '7bb104f282f38f6d6a105af6428f8f9f';
  var weatherQueryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + someCity + '&appid=' + weatherApiKey;
  weatherAjaxCall(weatherQueryURL);
};

  

function displayWeather(response){
      
  // !Converting the response's value for temperature into Fehrinheit 
  // !and the value for wind speed into Miles per Hour
  var tempInFehrinheit = parseInt((response.main.temp - 273.5) * 9/5 + 32);
  var windSpeedMph = parseInt(response.wind.speed * 2.237);
  var weatherDescription = response.weather[0].description;
  
  $('#city-name').text(response.name);
  $('#temp').text(tempInFehrinheit + '°F');
  $('#precip').text(weatherDescription);
  $('#humid').text(response.main.humidity);
  $('#wind').text(windSpeedMph + ' Mph');

  localStorage.setItem(2, weatherDescription);

}



// Second API Ajax Call

var availableEvents = [];
        
        
// vSCi2VPEx4e_Ti-4yMMsxZ8bFF5I8vkSuk0IY5AtrlraTxnzMb4z-w



function eventAjaxCall(URL){
  $.ajax({
    url: URL,
    method: 'GET',
    headers: {
      Authorization: 'Bearer MWawfGb5SJteul4Khvx6yGQUzdrgvoQ9lNdd-LG-'
    },
  }).then(function(response){
    console.log(response);
  })
}

var offset = 0;

function finalTextFunction(someCity){
  // getting the current day to use as a parameter in our URL for our request to the api
  var currentDay = moment().format('D-M-YYYY').toString();

  var eventURLParams = $.param({
    'active.gte': currentDay,
    'q': someCity,
    'offset': offset,
  })
  var eventURL = 'https://api.predicthq.com/v1/events/?' + eventURLParams;
  
  eventAjaxCall(eventURL);

};

function dontCrashMyBrowser(userSearch){
  var n = 0;
  
  do{
    
    finalTextFunction(userSearch);
    // adding 10 to the offset parameter to loop through responses 
    offset = offset + 10;
    // add a fuction to get events to display them, that goes here
    // adding 1 to n to progress through the while loop
    n++
  
  }while(n < 10)
}

function weatherFilter(){
  // just need to add if condtions for the different types of weather the api responds with
  var weatherDescsription = localStorage.getItem(2);
  // if 'weatherDescription' is equal to some weather condtion
  // then return the approriate object
  if(weatherDescsription === 'broken clouds'){
    var brokenCloudsObj = {
      categories: ['public-holidays', 'school-holidays', 'concerts'],
    };
    var catStringBroken = brokenCloudsObj.categories.toString();
    return catStringBroken;
  };
  
  if(weatherDescsription === 'Clouds'){
    var categories = ['public-holidays','concerts', 'school-holidays'];
    var catStringClouds = categories.toString();
    return catStringClouds;
  };

  if(weatherDescsription ==='moderate rain'){
    var categories = ['public-holidays', 'concerts', 'school-holidays'];
    var catStringModRain = categories.toString();
    return catStringModRain;
  }
};


// Third API Ajax Call

function thirdAjaxCall(url){
  $.ajax({
    url: url,
    method: 'GET',
  }).then(function(response){
    console.log(response);
  })
};

function getResponse(){
  var currentDay = '15'
  var currentMonth = moment().format('M');
  var thirdAjaxParams = $.param({
    'api_key': '37abb6aa08df3dfb7dae41dc542c8044ec356ecf',
    'country': 'US',
    'month': currentMonth,
    'day': currentDay,
    'year': '2020',
  });
  var thirdURL = 'https://calendarific.com/api/v2/holidays?' + thirdAjaxParams;
  thirdAjaxCall(thirdURL);
};
getResponse();

var holidayIndex = 0;
function testFunction(response){
  var holidayArray = resposne.response.holidays;
  var someDate = '2020-5-5';
  do{}while(holidayIndex > 0)
}

function findCurrentDay(response){
  var holidaysArray = response.response.holidays;
  for(var i = 0; i < holidaysArray.length; i++){
    var workingObj = holidaysArray[i];
    var holidayDate = workingObj.date.iso;
    var currentDay = moment().format('YYYY-M-D');
    console.log(currentDay);
    if(currentDay === holidayDate){
      console.log(workingObj);
    }else{
      return console.log('no holiday today');
    }
  }
};