
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
  "ami": "ami-0ff8a91507f77f867",
  "region": "us-east-1"
};
var responseData;

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
    responseData = request.response;

    populateContent(responseData);
  }
}

request.send(JSON.stringify(requestData));

function populateContent(jsonObj) {
  var resultsPlace = document.getElementById("results-start").innerHTML;

  for(var i = 0; i < jsonObj.length; i++) {
    var myList = resultsPlace.createElement("<ul>");
    var listItem = resultsPlace.createElement("<li>");
    listItem.textContent = jsonObj[i];
    listItem.appendChild("</li>");
    myList.appendChild("</ul>");
    console.log("looping...");
  }
}