function cdtd() {
    var deadline = new Date("May 17, 2013 23:59:00");
    var now = new Date();
    var timeDiff = deadline.getTime() - now.getTime();
    if (timeDiff <= 0) {
        clearTimeout(timer);
        $('#countdown h1').text("It's Over!");
        $('#countdown h2').text("Now just the buisness plan...");
        // Run any code needed for countdown completion here
    } else {
        var seconds = Math.floor(timeDiff / 1000);
        var minutes = Math.floor(seconds / 60);
        var hours = Math.floor(minutes / 60);
        var waking_hours = Math.floor(hours*2/3);
        var days = Math.floor(hours / 24);
        var weeks = Math.floor(days / 7);
        days %= 7;
        hours %= 24;
        minutes %= 60;
        seconds %= 60;
        
    //     document.getElementById("daysBox").innerHTML = days;
    //     document.getElementById("hoursBox").innerHTML = hours;
    //     document.getElementById("minsBox").innerHTML = minutes;
    //     document.getElementById("secsBox").innerHTML = seconds;
        $('#countdown h1').text(weeks + ' Weeks, ' + days + ' Days, ' + hours + ' Hours.');
        $('#countdown h2').text('and ' + minutes + ' Minutes, ' + seconds + ' Seconds.');
        $('#waking-hours').text("That's only about " + waking_hours + " waking hours left. You could slep less, but try not to burn out.");
        var timer = setTimeout('cdtd()',1000);
    }
}