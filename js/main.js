/* Search bar focus */
/*
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
*/

$( function() {
  $( "#region-select" ).selectmenu({
    width: false,
    // This just pushes the menu away from the button a little bit.
    position: { my : "left top+20", at : "left bottom" },
    // Adds a specific class to override the default rounded corners.
    classes: { "ui-selectmenu-button" : "ui-corner-none" }
  });
} );

var amiLookupAPI = "https://4l1ispv7ia.execute-api.us-east-1.amazonaws.com/dev/ami";
var responseData;
var xhr = new XMLHttpRequest(),
  method = "POST",
  url = amiLookupAPI;

function parseAMIOutput(responseData) {
  body = (responseData.body);
  for (var i in body) {
    var resultsHeader = document.getElementsByClassName("results-header");
    var resultsComponent = document.getElementsByClassName("content");
    var rowdiv = document.createElement("div");
    var keyDiv = document.createElement("div");
    var valueDiv = document.createElement("div");

    rowdiv.classList.add("row");
    keyDiv.classList.add("key");
    valueDiv.classList.add("value");

    rowdiv.appendChild(keyDiv);
    rowdiv.appendChild(valueDiv);

    if (body.hasOwnProperty(i)) {
      var keycontent = i;
      var valuecontent = body[i];
      keyDiv.innerHTML = keycontent;
      valueDiv.innerHTML = valuecontent;
    }
    resultsComponent[0].appendChild(rowdiv);
  }
};

function amiLookup(ami, region) {
  var requestData = {
    "ami": ami,
    "region": region
  };

  xhr.open(method, url);
  xhr.responseType = 'json';

  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = function() {
    if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      responseData = xhr.response;

      parseAMIOutput(responseData);
    }
    else if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 500) {
      responseData = xhr.response;

      parseAMIOutput(responseData);
    }
  };

  xhr.send(JSON.stringify(requestData));
};

var form = document.getElementById("search-form");
form.addEventListener("submit", function(event) {
  var amiData = document.getElementById("search").value;
  var regionData = document.getElementById("region-select").value;
  event.preventDefault();

  amiLookup(amiData, regionData);
});
// For some reason the below code doesnt work....
var viewjson = document.getElementById('view-json');
viewjson.addEventListener("submit", function(event) {
  event.preventDefault();
  console.log("Print JSON");
  console.log(responseData);
})