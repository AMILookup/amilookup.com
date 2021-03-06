// Get page elements
const form = document.getElementById("search-form");
const search = document.getElementById("search");
const loading = document.getElementById("loading");
const resultsComponent = document.getElementById("results-component");
const resultsContent = document.getElementById("content");
const resultsRow = document.querySelector("row");

function deleteStuff() {
  // Make the component visible
  resultsComponent.classList.remove("hidden");

  // Delete old rows
  while(resultsContent.firstChild) {
    resultsContent.removeChild(resultsContent.firstChild);
  }
};

// Actual AMI Lookup stuff starts here.
const amiLookupAPI = "https://4l1ispv7ia.execute-api.us-east-1.amazonaws.com/dev/ami";
const xhr = new XMLHttpRequest(),
  method = "POST",
  url = amiLookupAPI;

// Parse the Json output
function parseAMIOutput(responseData) {
  body = (responseData.body);

  for (let i in body) {
    const resultsContent = document.getElementsByClassName("content");
    const rowdiv = document.createElement("div");
    const keyDiv = document.createElement("div");
    const valueDiv = document.createElement("div");

    rowdiv.classList.add("row");
    keyDiv.classList.add("key");
    valueDiv.classList.add("value");

    rowdiv.appendChild(keyDiv);
    rowdiv.appendChild(valueDiv);

    if (body.hasOwnProperty(i)) {
      const keycontent = i;
      var valuecontent = body[i];
      if (i == "BlockDeviceMappings") {
        valuecontent = JSON.stringify(body[i][0], null, 2);
      }
      keyDiv.innerHTML = keycontent;
      valueDiv.innerHTML = valuecontent;
    }
    
    resultsContent[0].appendChild(rowdiv);
  }
};

function amiLookup(ami, region) {
  const requestData = {
    "ami": ami,
    "region": region
  };

  xhr.open(method, url);
  xhr.responseType = 'json';

  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = function() {
    if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      responseData = xhr.response;

      deleteStuff();
      parseAMIOutput(responseData);
      loading.classList.add("hidden");
    }
    else if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 500) {
      responseData = xhr.response;
      
      deleteStuff();
      parseAMIOutput(responseData);
    }
  };

  xhr.send(JSON.stringify(requestData));
};

form.addEventListener("submit", function(event) {
  let amiData = document.getElementById("search").value;
  let regionData = getCheckedValue("region-select");
  let regionErrorText = document.getElementById("region-error");

  event.preventDefault();

  if(regionData === null) {
    console.log("no region selected");
    regionErrorText.classList.remove("hidden");
  } else {
    console.log("region selected");
    loading.classList.remove("hidden");
    amiLookup(amiData, regionData);
    regionErrorText.classList.add("hidden");
  }

  console.log(amiData);
  console.log(regionData);
  console.log("-- BREAK --"); // This helps me when looking at the console output
});


function getCheckedValue(groupName) {
  var radios = document.getElementsByName(groupName);
  for(i = 0; i < radios.length; i++) {
      if(radios[i].checked) {
          return radios[i].value;
      }
  }
  return null;
}