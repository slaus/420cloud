//To top button
$('#back-to-top').click(function () {
    $('html, body').animate({scrollTop: 0}, 500);
}).scroolly([
    {
        alias: 'hidden',
        to: 'doc-top + 50vp',
        css: {
            opacity: '0',
            bottom: '-100px'
        }
    },
    {
        alias: 'shown',
        from: 'doc-top + 50vp',
        to: 'doc-bottom',
        css: {
            opacity: '1',
            bottom: '60px'
        }
    }
]);

//Navbar fixed position
$('.navbar').scroolly([
    {
        to: 'con-top + 100el',
        direction: 1,
        css: {
            '-transition': 'none',
            position: 'absolute',
            top: ''
        }
    },
    {
        direction: 1,
        from: 'con-top + 100el',
        css: {
            '-transition': 'none',
            position: 'fixed',
            top: '-100px'
        }
    },
    {
        to: 'con-top',
        direction: -1,
        css: {
            '-transition': 'none',
            position: 'absolute',
            top: ''
        }
    },
    {
        direction: -1,
        from: 'con-top',
        css: {
            '-transition': 'all .2s',
            position: 'fixed',
            top: '0'
        }
    }
]);

// Parallax slider
$(function () {
    $('#parallax_classic_bullets').parallax_classic({
        skin: 'bullets',
        width: 2500,
        height: 1600,
        width100Proc: true,
        defaultEasing: 'easeOutElastic',
        autoPlay: 10,
        responsive: true,
        autoHideBottomNav: false,
        showPreviewThumbs: false,
        autoHideNavArrows: false,
        showCircleTimer: true,
        showCircleTimerIE8IE7: true,
        myloaderTime: 0,
        scrollSlideDuration: 1.8,
        scrollSlideEasing: 'easeInQuint',
        thumbsWrapperMarginBottom: 20,
        behindCircleColor: '#777777',
        circleColor: '#168315',
        behindCircleAlpha: 30,
        circleAlpha: 100,
        circleRadius: 8,
        circleLineWidth: 2
    });
});

//Moving parallax elements
function onAnimationComplete() {
    setTimeout(function () {
        move1.restart();
        move2.restart();
        move3.restart();
        move4.restart();
    }, 0);
}
var move1 = new TimelineLite();
var move2 = new TimelineLite();
var move3 = new TimelineLite();
var move4 = new TimelineLite();
move1.to(".move-1", 4, {
    bezier: [{x: 5, y: 5}, {x: 0, y: 10}, {x: -5, y: 5}, {x: 0, y: 0}],
    ease: Linear.easeNone,
    onComplete: onAnimationComplete
});
move2.to(".move-2", 4, {
    bezier: [{x: 5, y: 5}, {x: 10, y: 10}, {x: -5, y: -5}, {x: 0, y: 0}],
    ease: Linear.easeNone,
    onComplete: onAnimationComplete
});
move3.to(".move-3", 4, {
    bezier: [{x: 5, y: 5}, {x: -5, y: 0}, {x: 5, y: -5}, {x: 0, y: 0}],
    ease: Linear.easeNone,
    onComplete: onAnimationComplete
});
move4.to(".move-4", 4, {
    bezier: [{x: 0, y: 5}, {x: 5, y: 5}, {x: 5, y: 0}, {x: 0, y: 0}],
    ease: Linear.easeNone,
    onComplete: onAnimationComplete
});

//Retina screens
(function () {
    document.addEventListener('DOMContentLoaded', function () {
        var HDimgs, i, img = [];
        HDimgs = document.querySelectorAll('[srcset]');
        for (i = 0; i < HDimgs.length; i++) {
            HDimgs[i] = new Image();
            img[i] = HDimgs[i];
            img[i].style.width = "" + (img[i].width / 2) + "px";
            img[i].style.height = "" + (img[i].height / 2) + "px";
            img[i].src = img[i].srcset.split(' ')[0];
            img[i].removeAttribute('srcset');
        }
    });
}).call(this);

//Subscribe form
$(function () {
    var form = $('#ajax-contact');
    var email = $('#email').val();
    console.log(email);

    $(form).submit(function (e) {
        // Stop the browser from submitting the form.
        e.preventDefault();

        // Serialize the form data.
        var formData = $(form).serialize();

        // Submit the form using AJAX.
        $.ajax({
            type: 'POST',
            url: 'https://account.420cloud.com/subscribe.php?email=' + email + '&action=subscribe&siteid=2&groupid=2',
            data: formData
        })
            .done(function (response) {

                console.log(response);
                var json = JSON.parse(response);
                console.log(json.data);
                (json.data !== null) ? alert('Thank You! Your email has been sent.') : alert('Oops! An error occurred and your email could not be sent.');

                // Clear the form.
                $('#email').val('');
            });
    });
});

//Cookie settings
$(function () {
    $("#setCookie").click(function () {
        // var date = new Date();
        // date.setTime(date.getTime() + (60 * 1000)); //Show popup every 1 minutes
        // $.cookie("popup", "", {expires: date} );
        $.cookie("popup", "1", {expires: 1}); //Show popup every 1 days
    });

    var close = function () {
        $('.wrapper').removeClass('blur');
        $('#bg_popup').empty().remove();
    };

    if ($.cookie("popup") == null) {
        setTimeout(function () {
            $('.wrapper').addClass('blur');
            $('body').prepend(
                '<div id="bg_popup">' +
                '<div id="popup">' +
                '<a href="" class="close-popup" title="Close"><i class="glyph flaticon-close"></i></a>' +
                '<iframe src="https://www.youtube.com/embed/Aq-vm9AzACA?autoplay=1&amp;rel=0&amp;showinfo=0" width="100%" height="100%" frameborder="0" allowfullscreen="allowfullscreen" id="Youtube"></iframe>' +
                '</div>' +
                '</div>'
            );
        }, 3000); //Show in 3 seconds after the site is loaded
    }
    else {
        close();
    }

    //Close popup
    $('.close-popup').click(function () {
        close();
    });
    $(document).mouseup(function (e) {
        var container = $('#bg_popup');
        if (container.has(e.target).length === 0){
            container.hide();
            close();
        }
    });
});

// 'use strict';
// function startVideo(){
//     $('body').prepend(
//         '<div id="bg_popup">'+
//         '<div id="popup">'+
//         '<a class="close-popup">'+
//         '<i class="glyph flaticon-close">'+
//         '</i>'+
//         '</a>'+
//         '<iframe id="Youtube" src="https://www.youtube.com/embed/Aq-vm9AzACA?autoplay=1&amp;rel=0&amp;showinfo=0" width="100%" height="100%" frameborder="0" allowfullscreen="allowfullscreen"></iframe>'+
//         '</div>'
//     );
//     $('body').on('click', '#bg_popup', function(){
//         $('body').find('#Youtube').empty().remove();
//         $('body').find('#bg_popup').remove();
//     });
//     localStorage.setItem('autoplay', 'false');
// }
//
// var autoplayStatus = localStorage.getItem('autoplay');
// autoplayStatus !== 'false' ? startVideo() : false;
