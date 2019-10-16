/* Search bar focus */
$(function() {
  const search = $("#search");
  const searchWrap = $("#search-form .search");

  $(search).focusin(function() {
    searchWrap.addClass("search-focus");
  });

  $(search).focusout(function() {
    searchWrap.removeClass("search-focus");
  });
});

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
    // const resultsHeader = document.getElementsByClassName("results-header");
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
  const regionData = getCheckedValue("region-select");

  event.preventDefault();

  amiLookup(amiData, regionData);

  console.log(amiData);
  console.log(regionData);
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