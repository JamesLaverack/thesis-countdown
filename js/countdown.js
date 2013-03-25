var true_deadline = new Date("May 17, 2013 23:59:00");
var deadline = true_deadline;
$('#no-ext-button').hide();
$('#custom-ext-controls input').keyup(validate_custom);
validate_custom();

function cdtd() {
    update_countdown()
    var timer = setTimeout('cdtd()',1000);
}
function update_countdown(){
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
        
        $('#countdown h1').text(weeks + ' Weeks, ' + days + ' Days, ' + hours + ' Hours.');
        $('#countdown h2').text('and ' + minutes + ' Minutes, ' + seconds + ' Seconds.');
        $('#waking-hours').text("That's only about " + waking_hours + " waking hours left. You could slep less, but try not to burn out."); 
    }
}
function extend_deadline(extention_in_hours) {
    deadline = new Date(true_deadline.getTime() + 1000*60*60*extention_in_hours);
    if(extention_in_hours==0) {
        $('#no-ext-button').fadeOut();
    } else {
        $('#no-ext-button').fadeIn();
    }
    update_countdown();
}

function validate_custom() {
    
    var txt = $('#custom-ext-controls input').val();
    var num = parseInt(txt);
    // Reset
    $('#custom-ext-group').removeClass("error warning success");
    $('#custom-ext-controls span').text("");
    $('#custom-ext-submit').addClass("disabled");
    $('#custom-ext-submit').bind('click', false);
    if (txt=="") {
        // Do nothing
    } else if (isNaN(num)) {
        $('#custom-ext-group').addClass("error");
        $('#custom-ext-controls span').text("That's not a number.");
    } else if (num<0) {
        $('#custom-ext-group').addClass("warning");
        $('#custom-ext-controls span').text("Very funny, positive numbers only.");
    } else {
        $('#custom-ext-group').addClass("success");
        $('#custom-ext-submit').removeClass("disabled");
        $('#custom-ext-submit').unbind('click', false);
    }
}

function custom_extend_deadline() {
    var txt = $('#custom-ext-controls input').val();
    extention_in_hours = parseInt(txt);
    extend_deadline(extention_in_hours);
    $('#custom-ext-modal').modal('hide')
}