var true_deadline = new Date("March 25, 2013 23:59:00");
var timer;
var deadline = true_deadline;
$('#no-ext-button').hide();
$('#custom-ext-controls input').keyup(validate_custom);
validate_custom();

function cdtd() {
    update_countdown()
    timer = setTimeout('cdtd()', 1000);
}
function update_countdown(){
    var now = new Date();
    var timeDiff = deadline.getTime() - now.getTime();
    if (timeDiff <= 0) {
        clearTimeout(timer);
        $('#countdown p').text("");
        $('#countdown h1').text("It's Over!");
        $('#countdown h2').text("Now just the buisness plan...");
    } else {
        // Calcualte values
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
        // Assemble text
        var txt_weeks = "";
        var txt_days = "";
        var txt_hours = "";
        var txt_minutes = "";
        var txt_seconds = "";
        // Link together
        // Weeks
        if(weeks>1) {
            txt_weeks = weeks + ' Weeks';
        } else if (weeks==1) {
            txt_weeks = weeks + ' Week';
        }
        // Days
        if(txt_weeks!="") {
            txt_days = ', ';
        }
        if(days>1) {
            txt_days += days + ' Days';
        } else if (days==1) {
            txt_days += days + ' Day';
        } else {
            txt_days = '';
        }
        // Hours
        if(txt_days!="" | txt_weeks!="") {
            txt_hours = ', ';
        }
        if(hours>1) {
            txt_hours += hours + ' Hours';
        } else if (hours==1) {
            txt_hours += hours + ' Hour';
        } else {
            txt_hours = "";
        }
        // Minutes
        if(minutes>1) {
            txt_minutes = minutes + ' Minutes';
        } else if (minutes==1) {
            txt_minutes = minutes + ' Minute';
        } else {
            txt_minutes = '0 Minutes';
        }
        // Seconds
        if(seconds>1) {
            txt_seconds = ', ' + seconds + ' Seconds';
        } else if (seconds==1) {
            txt_seconds = ', ' + seconds + ' Second';
        } else {
            txt_seconds = '';
        }
        
        var top_line = txt_weeks + txt_days + txt_hours;
        if(top_line!="") {
            $('#countdown h1').text(top_line + '.');
            $('#countdown h2').text('and ' + txt_minutes + txt_seconds);
        } else {
            $('#countdown h1').text(txt_minutes + txt_seconds);
            $('#countdown h2').text('');
        }
        // Set
        
        $('#waking-hours').text("That's only about " + waking_hours + " waking hours left. You could sleep less, but try not to burn out."); 
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
