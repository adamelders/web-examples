(function() {
  
  // Randomly set a title on the main page.
  var titlesList = [
    "Hello, world!",
    "Hello, Earth!",
    "Hello, space!",
    "Hello, universe!"
  ];
  
  var randomId = Math.floor(Math.random() * titlesList.length);
  var newTitle = titlesList[randomId];
  
  document.getElementById("helloTitle").innerHTML = newTitle;
  
})();