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

function amiLookup(ami, region) {
  var requestData = {
    "ami": ami,
    "region": region
  };

  
  console.log(method, url);

  xhr.open(method, url);
  xhr.responseType = 'json';

  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = function() {
    if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      console.log(xhr.response);
      responseData = xhr.response;
      console.log(responseData.body);
    }
  }

  xhr.send(JSON.stringify(requestData));
}

form.addEventListener("submit", function(event) {
  var amiData = document.getElementById("search").value;
  var regionData = document.getElementById("region-select").value;
  event.preventDefault();

  amiLookup(amiData, regionData);
});
