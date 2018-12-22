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

var amiLookupAPI = "https://1atjjwt237.execute-api.us-east-1.amazonaws.com/dev/ami";
var form = document.getElementById("search-form");
var responseData;
var xhr = new XMLHttpRequest(),
  method = "POST",
  url = amiLookupAPI;

function parseAMIOutput(responseData) {
  body = (responseData.body);
  console.log(body);
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
  }

  xhr.send(JSON.stringify(requestData));
};

form.addEventListener("submit", function(event) {
  var amiData = document.getElementById("search").value;
  var regionData = document.getElementById("region-select").value;
  event.preventDefault();

  amiLookup(amiData, regionData);
});
