/*global document, window, moment, XMLHttpRequest*/

(function() {
  
  // Set a loading status message.
  setData("title", "Loading, please wait...");
  
  var url="https://api.nasa.gov/planetary/apod?api_key=P2CM3yHTryjVXh2oKt6beXfGFxQ17wBNxOrJ7CI4";
  
  var callback = function(responseText) {
    
    // Format the copyright date using Moment.js library.
    var parsedDate = new Date(responseText.date);
    var formattedDate = moment(parsedDate).format("MMMM Do YYYY");
    
    // Only format the copyright name if it is present.
    var copyright = "";
    if (responseText.copyright)
      copyright = "&copy; " + responseText.copyright + " - ";
    
    // Set the data from the API response.
    setData("title", responseText.title);
    document.getElementById("image").src = responseText.url;
    setData("copyright", copyright);
    setData("date", formattedDate);
    setData("explanation", responseText.explanation);
    
    // Add a border to the explanation, so this doesn't show while loading.
    document.getElementById("explanation").style.border = "1px solid grey";
  };
  
  httpGetAsync(url, callback);
})();
  
function setData(id, data) {
  document.getElementById(id).innerHTML = data;
}

function httpGetAsync(url, callback) {
  
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var jsonObj = JSON.parse(xhr.responseText);
      callback(jsonObj);
    }
  }
  
  xhr.open("GET", url, true);
  xhr.send(null);
}