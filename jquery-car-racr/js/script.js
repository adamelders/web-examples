$(function() {
    
    // Click event handler for the the Race! button
    $('#go').click(function() {
        
        // Build a function that checks to see if a car has won the race
        function checkIfComplete() {
            if (isComplete == false) {
                isComplete = true;
            }
            else {
                place = 'second';
            }
        }
        
        // Get the width of the cars
        var carWidth = $('#car1').width();
        
        // Get the width of the racetrack
        var raceTrackWidth = $(window).width() - carWidth;
        
        // Generate a random number
        var raceTime1 = Math.floor((Math.random() * 5000) + 1);
        var raceTime2 = Math.floor((Math.random() * 5000) + 1);
        
        // Set a flag variable to false by default
        var isComplete = false;
        
        // Set a flag variable to first by default
        var place = 'first';
        
        // Animate car 1
        $("#car1").animate({
            
            // Move the car the width of the racetrack
            left: raceTrackWidth
            
        }, raceTime1, function() {
            
            // Animation is complete
            checkIfComplete();
            
            // Give results of the race
            $('#raceInfo1 span').text('Finished in ' + place + ' place and clocked in at ' + raceTime1 + ' milliseconds!');
        });
        
        // Animate car 2
        $('#car2').animate({
            
            // Move the car the width of the racetrack
            left: raceTrackWidth
            
        }, raceTime2, function() {
            
            // Animation is complete
            checkIfComplete();
            
            // Give results of the race
            $('#raceInfo2 span').text('Finished in ' + place + ' place and clocked in at ' + raceTime2 + ' milliseconds!');
        });
    });
    
    // Click event handler for the Reset button
    $('#reset').click(function() {
        $('.car').css('left', '0');
        $('.raceInfo span').text('');
    });
});