// Default call to covid19api.com which lists all the current routes available with details on each
function callCovid19API() {
  fetch("https://api.covid19api.com/")
    .then(function (response) {
      if (response.status !== 200) {
        console.log("Looks like there was a problem. Status Code: " + response.status);
        return;
      }

      // Examine the text in the response
      response.json().then(function (data) {
        console.log("covid19API.com: ", data);
        callMmediaGroup();
      });
    })
    .catch(function (err) {
      console.log("Fetch Error :-S", err);
    });
}

// Default call to mmediagroup.fr which lists current cases for different countries
function callMmediaGroup() {
  fetch("https://covid-api.mmediagroup.fr/v1/cases")
    .then(function (response) {
      if (response.status !== 200) {
        console.log("Looks like there was a problem. Status Code: " + response.status);
        return;
      }

      // Examine the text in the response
      response.json().then(function (data) {
        console.log("mmediagroup.fr: ", data);
        callOxford();
      });
    })
    .catch(function (err) {
      console.log("Fetch Error :-S", err);
    });
}

// Default call to Oxford which lists policy actions and overviews for a selected country
function callOxford() {
  fetch("https://covidtrackerapi.bsg.ox.ac.uk/api/v2/stringency/actions/usa/2021-08-5")
    .then(function (response) {
      if (response.status !== 200) {
        console.log("Looks like there was a problem. Status Code: " + response.status);
        return;
      }

      // Examine the text in the response
      response.json().then(function (data) {
        console.log("Oxford: ", data);
      });
    })
    .catch(function (err) {
      console.log("Fetch Error :-S", err);
    });
}

// Populate the States Dropdown
function populateStatesDropDown() {
  //Fill in the dropdown
  for (let i = 0; i < states.length; i++) {
    const countries = document.getElementById("states-dropdown");
    const optionTag = document.createElement("option");

    optionTag.value = states[i].id;
    optionTag.className = "state-list";
    optionTag.innerText = states[i].name;
    countries.append(optionTag);
  }
}

function showStateInfo() {
  const selectedState = document.getElementById("states-dropdown").value;

  fetch("https://data.cdc.gov/resource/9mfq-cb36.json?state=" + selectedState)
    .then(function (response) {
      if (response.status !== 200) {
        console.log("Looks like there was a problem. Status Code: " + response.status);
        return;
      }

      // Examine the text in the response
      response.json().then(function (data) {
        let filteredByLatestDate = filterCDCByLatestDate(data);

        const stateDiv = document.getElementById("stateDiv");

        stateDiv.innerHTML = "";

        const stateCol = document.createElement("div");
        stateCol.className = "col p-2";
        stateCol.innerHTML = "<h5>State: </h5>" + filteredByLatestDate[0].state;
        stateDiv.append(stateCol);

        const totalCasesCol = document.createElement("div");
        totalCasesCol.className = "col p-2";
        totalCasesCol.innerHTML = "<h5>Total Cases: </h5>" + filteredByLatestDate[0].tot_cases;
        stateDiv.append(totalCasesCol);

        const newCasesCol = document.createElement("div");
        newCasesCol.className = "col p-2";
        newCasesCol.innerHTML = "<h5>New Cases: </h5>" + Math.round(filteredByLatestDate[0].new_case);
        stateDiv.append(newCasesCol);

        const totalDeathsCol = document.createElement("div");
        totalDeathsCol.className = "col p-2";
        totalDeathsCol.innerHTML = "<h5>Total Deaths: </h5>" + filteredByLatestDate[0].tot_death;
        stateDiv.append(totalDeathsCol);

        const newDeathsCol = document.createElement("div");
        newDeathsCol.className = "col p-2";
        newDeathsCol.innerHTML = "<h5>New Deaths: </h5>" + Math.round(filteredByLatestDate[0].new_death);
        stateDiv.append(newDeathsCol);

        // unhide the accordian
        const accordianRow = document.getElementById("accordion-row");
        accordianRow.hidden = false;
        stateDiv.style = "height: 110px;";
      });
    })
    .catch(function (err) {
      console.log("Fetch Error :-S", err);
    });
}

// Filter https://data.cdc.gov/resource/9mfq-cb36.json by latest date
function filterCDCByLatestDate(obj) {
  let latestDate = 0;
  for (let i = 0; i < obj.length; i++) {
    let currentDate = parseInt(obj[i].submission_date.substring(0, 10).replace(/-/g, ""), 10);

    if (currentDate > latestDate) {
      latestDate = currentDate;
    }
  }
  const filteredObject = obj.filter(
    (d) => parseInt(d.submission_date.substring(0, 10).replace(/-/g, ""), 10) == latestDate
  );
  return filteredObject;
}

//Function for jQueryUI Accordian Menu
$(function () {
  $("#accordion").accordion();
});

// List of states
const states = [
  {
    name: "Alaska",
    id: "AK",
  },
  {
    name: "Alabama",
    id: "AL",
  },
  {
    name: "Arkansas",
    id: "AR",
  },
  {
    name: "Arizona",
    id: "AZ",
  },
  {
    name: "California",
    id: "CA",
  },
  {
    name: "Colorado",
    id: "CO",
  },
  {
    name: "Connecticut",
    id: "CT",
  },

  {
    name: "Delaware",
    id: "DE",
  },
  {
    name: "Florida",
    id: "FL",
  },
  {
    name: "Georgia",
    id: "GA",
  },
  {
    name: "Hawaii",
    id: "HI",
  },
  {
    name: "Iowa",
    id: "IA",
  },
  {
    name: "Idaho",
    id: "ID",
  },
  {
    name: "Illinois",
    id: "IL",
  },
  {
    name: "Indiana",
    id: "IN",
  },
  {
    name: "Kansas",
    id: "KA",
  },
  {
    name: "Kentucky",
    id: "KY",
  },
  {
    name: "Louisiana",
    id: "LA",
  },
  {
    name: "Massachusetts",
    id: "MA",
  },
  {
    name: "Maryland",
    id: "MD",
  },
  {
    name: "Maine",
    id: "ME",
  },
  {
    name: "Michigan",
    id: "MI",
  },
  {
    name: "Minnesota",
    id: "MN",
  },
  {
    name: "Missouri",
    id: "MO",
  },
  {
    name: "Mississippi",
    id: "MS",
  },
  {
    name: "Montana",
    id: "MT",
  },
  {
    name: "North Carolina",
    id: "NC",
  },
  {
    name: "North Dakota",
    id: "ND",
  },
  {
    name: "Nebraska",
    id: "NE",
  },
  {
    name: "New Hampshire",
    id: "NH",
  },
  {
    name: "New Jersey",
    id: "NJ",
  },
  {
    name: "New Mexico",
    id: "NM",
  },
  {
    name: "Nevada",
    id: "NV",
  },
  {
    name: "New York",
    id: "NY",
  },
  {
    name: "Ohio",
    id: "OH",
  },
  {
    name: "Oklahoma",
    id: "OK",
  },
  {
    name: "Oregon",
    id: "OR",
  },
  {
    name: "Pennsylvania",
    id: "PA",
  },
  {
    name: "Rhode Island",
    id: "RI",
  },
  {
    name: "South Carolina",
    id: "SC",
  },
  {
    name: "South Dakota",
    id: "SD",
  },
  {
    name: "Tennessee",
    id: "TN",
  },
  {
    name: "Texas",
    id: "TX",
  },
  {
    name: "Utah",
    id: "UT",
  },
  {
    name: "Virginia",
    id: "VA",
  },
  {
    name: "Vermont",
    id: "VT",
  },
  {
    name: "Washington",
    id: "WA",
  },
  {
    name: "Wisconsin",
    id: "WI",
  },
  {
    name: "West Virginia",
    id: "WV",
  },
  {
    name: "Wyoming",
    id: "WY",
  },
];

//Function to build chart
function drawChart() {
  var data = google.visualization.arrayToDataTable([
    ["Date", "Positives"],
    ["1", 1000],
    ["2", 1170],
    ["3", 660],
    ["4", 1030],
  ]);

  var options = {
    title: "COVID Positive Tests",
    legend: { position: "bottom" },
  };

  var chart = new google.visualization.LineChart(document.getElementById("curve_chart"));

  chart.draw(data, options);
}
// // Filter https://data.cdc.gov/resource/9mfq-cb36.json by state
// function filterCDCByState(obj) {
//   const selectedState = document.getElementById("states-dropdown").value;
//   const filteredObject = obj.filter((d) => d.state == selectedState);

//   return filteredObject;
// }

// // Get a list of countries
// function getCountries() {
//   let Object = $.ajax({
//     url: "https://api.covid19api.com/countries",
//     contentType: "application/json",
//     dataType: "json",
//     success: function (result) {},
//   }).done(function (obj) {
//     let countryObj = obj;
//     populateCountryDropDown(countryObj);
//   });
// }

// // Populate the Country Dropdown
// function populateCountryDropDown(countryObj) {
//   // order the countries by name
//   countryObj.sort(function (a, b) {
//     var nameA = a.Country.toUpperCase(); // ignore upper and lowercase
//     var nameB = b.Country.toUpperCase(); // ignore upper and lowercase
//     if (nameA < nameB) {
//       return -1;
//     }
//     if (nameA > nameB) {
//       return 1;
//     }
//     // names must be equal
//     return 0;
//   });

//   //Fill in the dropdown
//   for (let i = 0; i < countryObj.length; i++) {
//     const countries = document.getElementById("country-dropdown");
//     const optionTag = document.createElement("option");

//     optionTag.value = countryObj[i].Iso2;
//     optionTag.className = "country-list";
//     optionTag.innerText = countryObj[i].Country;

//     countries.append(optionTag);
//   }
// }
// Graph Data Points
function getGraphData() {
  // Add selectedState variable
  const selectedState = document.getElementById("states-dropdown").value;

  let getDataByStateAndDate = $.ajax({
    // Get an array of object by state from CDC API - Hardcode dates on presentation day
    url:
      "https://data.cdc.gov/resource/9mfq-cb36.json?state=" +
      selectedState +
      "&$where=submission_date%20between%20%272021-08-10T12:00:00%27%20and%20%272021-08-19T14:00:00%27",
    contentType: "application/json",
    dataType: "json",
    success: function (result) {},
  }).done(function (obj) {
    console.log("CDC: ", obj);
    // Use id "new_cases" to create an array of "new_case" with for loop
  });
}

// Populate graph div id = curve_chart with new cases from for loop
