// Default call to covid19api.com which lists all the current routes available with details on each
function callCovid19API() {
  let catObject = $.ajax({
    url: "https://api.covid19api.com/",
    contentType: "application/json",
    dataType: "json",
    success: function (result) {},
  }).done(function (obj) {
    console.log(obj);
    callMmediaGroup();
  });
}

// Default call to mmediagroup.fr which lists current cases for different countries
function callMmediaGroup() {
  let catObject = $.ajax({
    url: "https://covid-api.mmediagroup.fr/v1/cases",
    contentType: "application/json",
    dataType: "json",
    success: function (result) {},
  }).done(function (obj) {
    console.log(obj);
    callOxford();
  });
}

// Default call to Oxford which lists daily info for a selected country
function callOxford() {
  let catObject = $.ajax({
    url: "https://covidtrackerapi.bsg.ox.ac.uk/api/v2/stringency/actions/usa/2021-08-5",
    contentType: "application/json",
    dataType: "json",
    success: function (result) {},
  }).done(function (obj) {
    console.log(obj);
  });
}

// Default call to Oxford which lists policy actions and overviews for a selected country
function callOxford() {
  let catObject = $.ajax({
    url: "https://covidtrackerapi.bsg.ox.ac.uk/api/v2/stringency/actions/usa/2021-08-5",
    contentType: "application/json",
    dataType: "json",
    success: function (result) {},
  }).done(function (obj) {
    console.log(obj);
  });
}
