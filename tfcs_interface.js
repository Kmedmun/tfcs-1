function moveThings() {
    // stuff below move around in desktop view, as user scrolls down
    if(window.innerWidth > 960) {
        if(window.pageYOffset>window.minimizeTriggerPosition-250){
            jQuery('.entry-content').addClass('shifted');
            if(window.pageYOffset>window.videoHiddenTriggerPosition){
                jQuery('#video-frame').addClass('hidden');
            }else{
                jQuery('#video-frame').removeClass('hidden');
            }
        }else{
            jQuery('.entry-content').removeClass('shifted');
            jQuery('#video-navigation').removeClass('minimized');
        }
    }else{
        // mobile view
        if(window.pageYOffset>window.mobileVideoMinimizePosition && window.pageYOffset<window.mobileVideoMinimizeEndPosition){
            jQuery('#video').addClass('minimized');
            jQuery('#video-navigation').addClass('minimized');
        }else{
            jQuery('#video').removeClass('minimized');
            jQuery('#video-navigation').removeClass('minimized');
        }
        jQuery('#video-frame').removeClass('minimized');
        jQuery('.entry-content').removeClass('shifted');
    }
}

window.onscroll=function(){
    moveThings();
};

window.onresize=function(){
    moveThings();
};

function findPosY(obj) {
    var curtop = 0;
    if (typeof (obj.offsetParent) != 'undefined' && obj.offsetParent) {
        while (obj.offsetParent) {
            curtop += obj.offsetTop;
            obj = obj.offsetParent;
        }
        curtop += obj.offsetTop;
    }
    else if (obj.y)
        curtop += obj.y;
    return curtop;
}

// add current page's title (which should be the phoneme) to navigation menu
jQuery(document).ready(function($) {
    $('.current-phoneme').html(document.title);
    $("div#video-phoneme-explanation").html($("div#phoneme-explanation").html());

    $('.trigger-hover').on('click mouseover', function() {
        $('button.recorder').css("background-color", "#ffc438");
        $('button.recorder').addClass("button-hover-effect");
        setTimeout(function() {
            $('button.recorder').removeClass("button-hover-effect");
            $('button.recorder').css("background-color", "#f0f0f0");
        }, 300);
    });

    // smooth scroll to inner links instead of jumps
    $('a[href^="#"]').on('click',function (e) {
        e.preventDefault();

        var target = this.hash;
        var $target = $(target);

        $('html, body').stop().animate({
            'scrollTop': ($target.offset().top)
        }, 500, 'swing', function () {
            window.location.hash = target;
        });
    });

    // if mobile browser
    if (window.innerWidth<960) {
        $("#video-container").height( $("#video-navigation").height()+$("#video-frame").height() );
    }
    // if(jQuery.browser.mobile){
    //     $("span.recorder").html($("span#top").html());
    //     $("span.recorder").addClass("mobile");
    //     $("#video-navigation").addClass("mobile");
    //     window.videoNavHeight = 336;
    // }else{window.videoNavHeight = 351;}

    // adapted from Jim W's code: http://stackoverflow.com/a/17494943
    // change layout based on amount of Y scroll
    window.minimizeTriggerPosition=-1;
    window.minimizeTrigger = document.getElementById('in-words');
    window.videoHiddenTriggerPosition = findPosY(document.getElementById('whats-next'))+200;

    if(window.minimizeTriggerPosition<0)window.minimizeTriggerPosition=findPosY(window.minimizeTrigger);

    window.mobileVideoMinimizePosition = findPosY(document.getElementById("video-frame")) + window.innerWidth;
    window.mobileVideoMinimizeEndPosition = findPosY(document.getElementsByClassName("phoneme-grid")[0]);

});