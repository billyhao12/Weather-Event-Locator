var userSearches = ['Seattle']
console.log(userSearches[0]);

var filterString;

$('#searchBtn').on('click',function(){
  
  var userSearch = $('#search-input').val();
  userSearches.push(userSearch);
  localStorage.setItem(1, userSearch);
  
  offset = 0;

  fetchDataWeather(userSearch);
  ifThenLoop(userSearch, filterString);   
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
  var weatherID = response.weather[0].id;
  console.log(weatherID);
  
  $('#city-name').text(response.name);
  $('#temp').text(tempInFehrinheit + '°F');
  $('#precip').text(weatherDescription);
  $('#humid').text(response.main.humidity);
  $('#wind').text(windSpeedMph + ' Mph');

  filterString = weatherFilter(weatherID);
  console.log(filterString);
  

}



// Second API Ajax Call

var availableEvents = [];
var notGate;
        
        
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
    var responseResults = response.results.length;
    console.log(responseResults);
    ifItIs0(responseResults);
    var resultsArray = response.results;
    checkEventTitles(resultsArray);
  })
};



function checkEventTitles(array){
  var dupedEvents = [];
  for(var i = 0; i < array.length; i++){
    var eventTitle = array[i].title;
    var nextEventTitle = array[i + 1].title;
    if(eventTitle === nextEventTitle){
      dupedEvents.push(i);
    }
    actuallyRenderEvents(array, dupedEvents);
  }
}

function actuallyRenderEvents(array1, array2){
  var dupedEvents = array2;
  for(var i = 0; i < array1.length; i++){
    if( i != dupedEvents[i]){
      var eventTitle = array1[i].title;
      availableEvents.push(eventTitle);
    }
  }
};

function finallyRenderEvents(array){
  var eventTitle = array[0].title;
}

function ifItIs0(number){
  if(number === 0){
    return notGate = true;
  }
};

var someRandomNumber = 1;

// useful i think, output was 'false', '0', 'true', '-1'
// do{
//   ifItIs0(someRandomNumber);
//   someRandomNumber--;
//   console.log(notGate);
//   console.log(someRandomNumber);
// }while(notGate === false)

function goToDefualtURL(someCity){
  var currentDay = moment().format('D-M-YYYY').toString();

  var defualtParams = $.param({
    'active.lte': currentDay,
    'q': someCity,
    'offset': offset,
  });

  var deafualtURL = 'https://api.predicthq.com/v1/events/?' + defualtParams;

  eventAjaxCall(deafualtURL);
};

function deafultEvents(someCity){
  var x = 0;
  console.log(availableEvents);
  do{

    goToDefualtURL(someCity);

    offset = offset + 10;
    x++;
  }while(x < 4)
}

var offset = 0;

function finalTextFunction(someCity, labels){
  // getting the current day to use as a parameter in our URL for our request to the api
  var currentDay = moment().format('D-M-YYYY').toString();

  var eventURLParams = $.param({
    'active.lte': currentDay,
    'q': someCity,
    'offset': offset,
    "label": labels,
  })
  var eventURL = 'https://api.predicthq.com/v1/events/?' + eventURLParams;
  
  eventAjaxCall(eventURL);

};

function fetchEventLabels(){
  var eventURL = 'https://api.predicthq.com/v1/events/count/?country=US'
  eventAjaxCall(eventURL);
};


function dontCrashMyBrowser(userSearch, labels){
  var n = 0;
  console.log(availableEvents);
  do{
    
    finalTextFunction(userSearch, labels);
    // adding 10 to the offset parameter to loop through responses 
    
    // add a fuction to get events to display them, that goes here
    // adding 1 to n to progress through the while loop
    offset = offset + 10;
    n++
  }while(n < 4)
};

function ifThenLoop(someCity, labels){
  notGate = finalTextFunction(someCity, labels);

  if(notGate === false){
    dontCrashMyBrowser(someCity, labels);
  }else{
    deafultEvents(someCity);  
  }

}

function weatherFilter(someNumber){
  // just need to add if condtions for the different types of weather the api responds with

  // if 'weatherDescription' is equal to some weather condtion
  // then return the approriate array converted as a string
  if(someNumber > 800|| someNumber === 300 || someNumber === 301 || someNumber === 500){
    
    var brokenCloudsArray = [
      'agriculture', 'american-football', 'attraction', 'baseball', 'basketball', 'bicycle', 'campus', 'comedy', 'comic', 'concert', 'community', 
      'craft', 'digital', 'entertainment', 'expo', 'fashion', 'festival', 'food', 'gaming', 'golf', 'holiday', 'horticulture', 'marathon', 'mlb', 'mls', 
      'movie', 'music', 'nfl', 'olympic', 'outdoor', 'preforming-arts', 'running', 'social', 'soccer', 'social', 'technolgy', 'weather'
    ] 
    var catStringBroken = brokenCloudsArray.toString();
    return catStringBroken;
  
  };
  
  if(someNumber === 501 || someNumber === 502 || someNumber === 503 || someNumber === 504){
    
    var categories = [
      'american-football', 'attraction', 'baseball', 'basketball', 'bicycle', 'campus', 'comic', 'concert', 'community', 'craft', 'digital', 
      'entertainment', 'expo', 'fashion', 'festival', 'food', 'gaming', 'golf', 'holiday', 'marathon', 'mlb', 'mls', 'movie', 'music', 'nfl' , 'olympic',
      'preforming-arts', 'running', 'social', 'technolgy', 'weather', 'weather-warning'
    ];
    var catStringModRain = categories.toString();
    return catStringModRain;
  
  };

  if(someNumber >= 200 || someNumber === 602 || somNumber === 622 || someNumber === 504 || someNumber === 522){
    
    var categories = [
      'weather', 'weather-warning'
    ];
    var catToString = categories.toString();
    return catToString;
  
  };

  // if the weather description does not match any of the above values use this defualt array
  var lastLabels = [
    'american-football', 'attraction', 'baseball', 'basketball', 'bicycle', 'comic', 'concert', 'community', 'craft', 'digital', 'entertainmant', 
    'expo', 'fashion', 'festival', 'food', 'gaming', 'golf', 'holiday', 'horticulture', 'marathon', 'mlb', 'mls', 'movie', 'music', 'olympic', 'outdoor', 'preforming-arts', 
    'running', 'social', 'soccer', 'technolgy', 'weather', 'weather-warning'
  ];
  var lastLabelsToString = lastLabels.toString();
  return lastLabelsToString;
  
};




// Third API Ajax Call this is junk dont look pls


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