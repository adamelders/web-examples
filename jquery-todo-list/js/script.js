$(function() {
  
  // Make the to-do list sortable.
  $('#todoList ul').sortable({
    items: "li:not('.listTitle, .addItem')", // Do not sort .listTitle and .addItem classes
    connectWith: "ul", // Allow items to connect with other unordered lists (days)
    dropOnEmpty: true, // Allow dropping onto an empty unordered list.
    placeholder: "emptySpace" // Apply emptySpace class to placeholder
  });
  
  // When user presses the Enter/Return key, add the item to the list.
  $('input').keydown(function(e) {
    if (e.keyCode == 13) { // Enter key
      var item = $(this).val(); // Get the value that the user entered
      
      $(this).parent().parent().append('<li>' + item + '</li>'); // Add the new item to the list.
      $(this).val(''); // Clear the input text.
    }
  });
  
  // When the user drags an item over the delete box, we need to remove the item.
  $('#trash').droppable({
    drop: function(event, ui) {
      ui.draggable.remove();
    }
  });
  
});