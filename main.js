// Populate the States Dropdown
function populateStatesDropDown() {
  //Fill in the dropdown
  for (let i = 0; i < states.length; i++) {
    const countries = document.getElementById("states-dropdown");
    const optionTag = document.createElement("option");

    // Create the option tags
    optionTag.value = states[i].id;
    optionTag.className = "state-list";
    optionTag.innerText = states[i].name;
    countries.append(optionTag);
  }
}

// When the user selects a state, enable the Get Info button
function enableGetInfoButton() {
  const getInfoButton = document.getElementById("getInfoButton");
  const chooseStateOption = document.getElementById("states-dropdown");

  // Remove "Choose a State" as an option so it can't be reselected
  for (let i = 0; i < chooseStateOption.options.length; i++) {
    if (chooseStateOption[i].innerText == "Choose a State") {
      chooseStateOption[i].innerHTML = "";
    }
  }

  getInfoButton.disabled = false;
}

// Make sure the user selected a state
function validateDDOption() {
  var dropDown = document.getElementById("states-dropdown");
  var strUser = dropDown.options[dropDown.selectedIndex].value;

  var strUser1 = dropDown.options[dropDown.selectedIndex].text;
  if (strUser == "") {
    alert("Please select a state");
  }
}

// Get the data for the state and display it in the accordion
function showStateInfo() {
  const selectedState = document.getElementById("states-dropdown").value;

  fetch("https://data.cdc.gov/resource/9mfq-cb36.json?state=" + selectedState, {
    // After a certain number of calls in a given time period, CDC was requesting header data

    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
    .then(function (response) {
      if (response.status !== 200) {
        console.log("Looks like there was a problem. Status Code: " + response.status);
        return;
      }

      // Examine the text in the response
      response.json().then(function (data) {
        // Filter to only show the latest date
        let filteredByLatestDate = filterCDCByLatestDate(data);

        // Get the divs
        const stateDiv = document.getElementById("stateDiv");
        const countryDiv = document.getElementById("countryDiv");
        const travelDiv = document.getElementById("travelDiv");

        // Clear the state info
        stateDiv.innerHTML = "";

        // Display the new info
        const stateCol = document.createElement("div");
        stateCol.className = "col p-2";
        stateCol.innerHTML = "<h5>State: </h5>" + filteredByLatestDate[0].state;
        stateDiv.append(stateCol);

        const totalCasesCol = document.createElement("div");
        totalCasesCol.className = "col p-2";
        totalCasesCol.innerHTML = "<h5>Total Cases: </h5>" + filteredByLatestDate[0].tot_cases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        stateDiv.append(totalCasesCol);

        const newCasesCol = document.createElement("div");
        newCasesCol.className = "col p-2";
        newCasesCol.innerHTML =
          "<h5>New Cases: </h5>" +
          Math.round(filteredByLatestDate[0].new_case)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        stateDiv.append(newCasesCol);

        const totalDeathsCol = document.createElement("div");
        totalDeathsCol.className = "col p-2";
        totalDeathsCol.innerHTML = "<h5>Total Deaths: </h5>" + filteredByLatestDate[0].tot_death.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        stateDiv.append(totalDeathsCol);

        const newDeathsCol = document.createElement("div");
        newDeathsCol.className = "col p-2";
        newDeathsCol.innerHTML =
          "<h5>New Deaths: </h5>" +
          Math.round(filteredByLatestDate[0].new_death)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        stateDiv.append(newDeathsCol);

        // unhide the accordian
        const accordianRow = document.getElementById("accordion-row");
        accordianRow.hidden = false;
      });
    })
    .catch(function (err) {
      console.log("Fetch Error :-S", err);
    });
}

// Get the data for the country and display it in the accordion
function showUSInfo() {
  // Get yesterdays date to pass into the URL. Todays values in the api will still be null
  const today = new Date();
  const yesterday = new Date(today); // Data in the API is current through the previous day
  yesterday.setDate(yesterday.getDate() - 1);
  let date = yesterday.getFullYear() + "-" + (yesterday.getMonth() + 1) + "-" + yesterday.getDate();

  // Fetch the data
  fetch("https://covidtrackerapi.bsg.ox.ac.uk/api/v2/stringency/actions/usa/" + date)
    .then(function (response) {
      if (response.status !== 200) {
        console.log("Looks like there was a problem. Status Code: " + response.status);
        return;
      }

      // Examine the text in the response
      response.json().then(function (data) {
        // Get the divs
        const countryDiv = document.getElementById("countryDiv");

        // Clear the country info
        countryDiv.innerHTML = "";

        // Display the new info
        const totalCasesCol = document.createElement("div");
        totalCasesCol.className = "col p-2";
        totalCasesCol.innerHTML = "<h5>Total Cases: </h5>" + data.stringencyData.confirmed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        countryDiv.append(totalCasesCol);

        const totalDeathsCol = document.createElement("div");
        totalDeathsCol.className = "col p-2";
        totalDeathsCol.innerHTML = "<h5>Total Deaths: </h5>" + data.stringencyData.deaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        countryDiv.append(totalDeathsCol);

        const newDeathsCol = document.createElement("div");
        newDeathsCol.className = "col p-2";
        newDeathsCol.innerHTML =
          "<h5><a href='https://ourworldindata.org/grapher/covid-stringency-index' target='_blank'>Stringency Level*:</a></h5>" + data.stringencyData.stringency;
        countryDiv.append(newDeathsCol);
      });
    })
    .catch(function (err) {
      console.log("Fetch Error :-S", err);
    });
}

// Get the data for the world and display it in the accordion
function showWorldInfo() {
  fetch("https://covid-api.mmediagroup.fr/v1/cases")
    .then(function (response) {
      if (response.status !== 200) {
        console.log("Looks like there was a problem. Status Code: " + response.status);
        return;
      }

      // Examine the text in the response
      response.json().then(function (data) {
        // Get the divs
        const worldDiv = document.getElementById("worldDiv");

        // Clear the world info
        worldDiv.innerHTML = "";

        // Convert the data to an array
        let values = Object.values(data);

        // Add up the values
        let sumOfCases = 0;
        let sumOfDeaths = 0;
        for (let i = 0; i < values.length; i++) {
          sumOfCases = sumOfCases + values[i].All.confirmed;
          sumOfDeaths = sumOfDeaths + values[i].All.deaths;
        }

        // Display the new info
        const totalCasesCol = document.createElement("div");
        totalCasesCol.className = "col p-2";
        totalCasesCol.innerHTML = "<h5>Total Cases: </h5>" + sumOfCases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        worldDiv.append(totalCasesCol);

        const totalDeathsCol = document.createElement("div");
        totalDeathsCol.className = "col p-2";
        totalDeathsCol.innerHTML = "<h5>Total Deaths: </h5>" + sumOfDeaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        worldDiv.append(totalDeathsCol);
      });
    })
    .catch(function (err) {
      console.log("Fetch Error :-S", err);
    });
}

function showPolicyInfo() {
  // Get yesterdays date to pass into the URL. Todays values in the api will still be null
  const today = new Date();
  const yesterday = new Date(today); // Data in the API is current through the previous day
  yesterday.setDate(yesterday.getDate() - 20);
  let date = yesterday.getFullYear() + "-" + (yesterday.getMonth() + 1) + "-" + yesterday.getDate();

  // Fetch the data
  fetch("https://covidtrackerapi.bsg.ox.ac.uk/api/v2/stringency/actions/usa/" + date)
    .then(function (response) {
      if (response.status !== 200) {
        console.log("Looks like there was a problem. Status Code: " + response.status);
        return;
      }

      // Examine the text in the response
      response.json().then(function (data) {
        // Get the divs
        const policyDiv = document.getElementById("policyDiv");

        // Clear the policy info
        policyDiv.innerHTML = "";

        // Display the new info
        for (let i = 0; i < data.policyActions.length; i++) {
          const descriptionCol = document.createElement("div");
          descriptionCol.className = " m-auto w-50 text-start p-2";
          descriptionCol.innerHTML = "<b>" + data.policyActions[i].policy_type_display + ": </b>" + data.policyActions[i].policy_value_display_field;
          policyDiv.append(descriptionCol);
        }
      });
    })
    .catch(function (err) {
      console.log("Fetch Error :-S", err);
    });
}

// Filter https://data.cdc.gov/resource/9mfq-cb36.json by latest date
function filterCDCByLatestDate(obj) {
  let latestDate = 0;

  // Loop through the data and find out the latest date
  for (let i = 0; i < obj.length; i++) {
    let currentDate = parseInt(obj[i].submission_date.substring(0, 10).replace(/-/g, ""), 10);

    if (currentDate > latestDate) {
      latestDate = currentDate;
    }
  }

  // Filter the data to only show info for the latest date
  const filteredObject = obj.filter((d) => parseInt(d.submission_date.substring(0, 10).replace(/-/g, ""), 10) == latestDate);
  return filteredObject;
}

//Function for jQueryUI Accordian Menu
$(function () {
  $("#accordion").accordion({
    active: 0,
    heightStyle: "content",
  });
});

//Function to build chart use graphData to populate
function drawChart(chartData) {
  var data = google.visualization.arrayToDataTable(chartData);

  var options = {
    title: "COVID Positive Tests",
    legend: { position: "bottom" },
  };

  var chart = new google.visualization.LineChart(document.getElementById("curve_chart"));

  chart.draw(data, options);
}

// Graph Data Points
function getGraphData() {
  // unhide the chart
  const chart = document.getElementById("chartDiv");
  chart.hidden = false;

  // Add selectedState variable
  const selectedState = document.getElementById("states-dropdown").value;
  //getElementByID for dates w/ slider

  let getDataByStateAndDate = $.ajax({
    // Get an array of object by state from CDC API - Hardcode dates on presentation day
    url: "https://data.cdc.gov/resource/9mfq-cb36.json?state=" + selectedState + "&$where=submission_date%20between%20%272021-05-10T12:00:00%27%20and%20%272021-08-19T14:00:00%27",
    contentType: "application/json",
    dataType: "json",
    success: function (result) {},
  }).done(function (obj) {
    // Use id "new_cases" to create an array of "new_case" with for loop

    let newCaseArray = [];
    // Add cases to the array
    for (let i = 0; i < obj.length; i++) {
      newCaseArray.push([obj[i].submission_date.substring(0, 10), parseInt(obj[i].new_case, 10)]);
    }

    // Sort by date
    newCaseArray.sort();

    // Add column headers
    newCaseArray.unshift(["Date", "Number Of Cases"]);

    drawChart(newCaseArray);
  });
}

//Dark Mode Stuff
function darkMode() {
  var element = document.body;
  element.classList.toggle("dark-mode");

  // Change the button text
  let darkButton = document.getElementById("darkButton");

  if (darkButton.innerText == "Switch To Light Mode") {
    darkButton.innerText = "Switch To Dark Mode";
  } else {
    darkButton.innerText = "Switch To Light Mode";
  }
}

// Resize google chart when window size changes
$(window).resize(function () {
  getGraphData();
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
    id: "KS",
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
