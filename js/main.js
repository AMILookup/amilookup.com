/* Search bar focus */
$(function() {
  const search = $("#search");
  const searchWrap = $("#search-form > div");

  $(search).focusin(function() {
    searchWrap.addClass("search-focus");
  });

  $(search).focusout(function() {
    searchWrap.removeClass("search-focus");
  });
});

$( function() {
  $( "#region-select" ).selectmenu({
    width: false,
    // This just pushes the menu away from the button a little bit.
    position: { my : "left top+20", at : "left bottom" },
    // Adds a specific class to override the default rounded corners.
    classes: { "ui-selectmenu-button" : "ui-corner-none" }
  });
} );

// Actual AMI Lookup stuff starts here.
const amiLookupAPI = "https://4l1ispv7ia.execute-api.us-east-1.amazonaws.com/dev/ami";
const xhr = new XMLHttpRequest(),
  method = "POST",
  url = amiLookupAPI;


$.deleteStuff = function() {
  // Handle Component
  $(".results-component").removeClass("hidden");

  // Delete old rows
  $(".row").remove();
};


function parseAMIOutput(responseData) {
  body = (responseData.body);

  for (let i in body) {
    const resultsHeader = document.getElementsByClassName("results-header");
    const resultsContent = document.getElementsByClassName("content");
    const rowdiv = document.createElement("div");
    const keyDiv = document.createElement("div");
    const valueDiv = document.createElement("div");

    rowdiv.classList.add("row");
    keyDiv.classList.add("key");
    valueDiv.classList.add("value");

    rowdiv.appendChild(keyDiv);
    rowdiv.appendChild(valueDiv);
    
    console.log(body)

    if (body.hasOwnProperty(i)) {
      console.log(i)
      const keycontent = i;
      var valuecontent = body[i];
      if (i == "BlockDeviceMappings") {
        valuecontent = JSON.stringify(body[i][0]);
        // Used potentially for manipulating json later on
        // valuecontent = JSON.parse(valuecontent);
      }
      console.log(i, valuecontent)
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

      $.deleteStuff();
      parseAMIOutput(responseData);
    }
    else if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 500) {
      responseData = xhr.response;
      
      $.deleteStuff();
      parseAMIOutput(responseData);
    }
  };

  xhr.send(JSON.stringify(requestData));
};

const form = document.getElementById("search-form");
form.addEventListener("submit", function(event) {
  const amiData = document.getElementById("search").value;
  const regionData = document.getElementById("region-select").value;
  event.preventDefault();

  amiLookup(amiData, regionData);
});

// For some reason the below code doesnt work....
const viewjson = document.getElementById('view-json');
viewjson.addEventListener("submit", function(event) {
  event.preventDefault();
  console.log("Print JSON");
  console.log(responseData);
})