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

var amiLookupAPI = "https://1atjjwt237.execute-api.us-east-1.amazonaws.com/dev/ami";
var requestData = {
  "ami": search,
  "region": region
};

var ami = document.getElementById("search").value;
var region = document.getElementById("region-select").value;
console.log(ami);
console.log(region);

// search.addEventListener("keydown", function (e) {
//   if (e.keyCode === 13) {
//     amilookup(ami, region);
//   }
// })
//
// search.onclick = amilookup(ami, region);

function amilookup(ami, region) {

  var request = new XMLHttpRequest(),
    method = "POST",
    url = amiLookupAPI;
  console.log(method, url);

  request.open(method, url);
  request.responseType = 'json';

  request.setRequestHeader("Content-Type", "application/json");

  request.onreadystatechange = function() {
    if(request.readyState === XMLHttpRequest.DONE && request.status === 200) {
      console.log(request.response);
    }
  }

  request.send(JSON.stringify(requestData));
  console.log(request);
};
