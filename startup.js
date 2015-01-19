// Check for touch enabled device, returns true if touch events exists
var is_touch_device = 'ontouchstart' in document.documentElement;
var oldstate = false;
var myInterval = null;
var checkingURL = false;



$(document).ready(function () {


    $('#loadmsg').html('Testing Connection');
   

    var handleExists = function (exists) {
        checkingURL = false;

        //do more stuff based on the boolean value of exists
        if (exists) {

            try{
                setTimeout(clearInterval(myInterval), 500);
                //window.location.href = "http://KENCQT2LV1.na.int.grp:8080/MOREMaintenance/index.html";
              
            }
            catch (err)
            {
                setTimeout(clearInterval(myInterval), 500);

            }
          
        }
        else {
            setTimeout(clearInterval(myInterval), 500);
            $('#loadmsg').html('Internet Destination Is Not Available.');
            $("#try_again").css('display', 'block');
        }
    }


    function urlExists(url) {
        if (checkingURL == false) {
            checkingURL = true;
            $.ajax({
               // type: 'HEAD',
                url: url,
                success: function () {
                    handleExists(true);
                },
                error: function () {
                    handleExists(false);
                }
            });
        }
        else
        {
            //skip it this time
        }
    }


    var NetworkUpCounter = 0;

   

   
    myInterval = setInterval(function () {
        oldState = navigator.onLine ? 'online' : 'offline';
        if (oldState == "offline") {
            NetworkUpCounter = 0;
            $('#loadmsg').html('Network Connection Down.');
        }
        else {

            NetworkUpCounter += 1;
            //skip the first time through to give network time to settle;
            if (NetworkUpCounter > 1) {
                $('#loadmsg').html('Network Ready.');
                // clearInterval(myInterval);
                urlExists('http://KENCQT2LV1.na.int.grp:8080/MOREMaintenance/index.html');
            }
        }
    }, 1500);


});
// Document.ready: END
