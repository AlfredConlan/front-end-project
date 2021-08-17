// Default call to covid19api.com which lists all the current routes available with details on each
function callCovid19API() {
  let Object = $.ajax({
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
  let Object = $.ajax({
    url: "https://covid-api.mmediagroup.fr/v1/cases",
    contentType: "application/json",
    dataType: "json",
    success: function (result) {},
  }).done(function (obj) {
    console.log(obj);
    callOxford();
  });
}

// Default call to Oxford which lists policy actions and overviews for a selected country
function callOxford() {
  let Object = $.ajax({
    url: "https://covidtrackerapi.bsg.ox.ac.uk/api/v2/stringency/actions/usa/2021-08-5",
    contentType: "application/json",
    dataType: "json",
    success: function (result) {},
  }).done(function (obj) {
    console.log(obj);
  });
}

// Get a list of countries
function getCountries() {
  let Object = $.ajax({
    url: "https://api.covid19api.com/countries",
    contentType: "application/json",
    dataType: "json",
    success: function (result) {},
  }).done(function (obj) {
    let countryObj = obj;
    populateCountryDropDown(countryObj);
  });
}

// Populate the Country Dropdown
function populateCountryDropDown(countryObj) {
  // order the countries by name
  countryObj.sort(function (a, b) {
    var nameA = a.Country.toUpperCase(); // ignore upper and lowercase
    var nameB = b.Country.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    // names must be equal
    return 0;
  });

  //Fill in the dropdown
  for (let i = 0; i < countryObj.length; i++) {
    const countries = document.getElementById("country-dropdown");
    const optionTag = document.createElement("option");

    optionTag.value = countryObj[i].Iso2;
    optionTag.className = "country-list";
    optionTag.innerText = countryObj[i].Country;

    countries.append(optionTag);
  }
}

// Populate the States Dropdown
function populateStatesDropDown() {
  //Fill in the dropdown
  for (let i = 0; i < states.length; i++) {
    const countries = document.getElementById("states-dropdown");
    const optionTag = document.createElement("option");

    optionTag.value = states[i];
    optionTag.className = "state-list";
    optionTag.innerText = states[i];
    countries.append(optionTag);
  }
}

// List of states
const states = [
  "Alaska",
  "Alabama",
  "Arkansas",
  "American Samoa",
  "Arizona",
  "California",
  "Colorado",
  "Connecticut",
  "District of Columbia",
  "Delaware",
  "Florida",
  "Georgia",
  "Guam",
  "Hawaii",
  "Iowa",
  "Idaho",
  "Illinois",
  "Indiana",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Massachusetts",
  "Maryland",
  "Maine",
  "Michigan",
  "Minnesota",
  "Missouri",
  "Mississippi",
  "Montana",
  "North Carolina",
  "North Dakota",
  "Nebraska",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "Nevada",
  "New York",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Puerto Rico",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Virginia",
  "Virgin Islands",
  "Vermont",
  "Washington",
  "Wisconsin",
  "West Virginia",
  "Wyoming",
];
