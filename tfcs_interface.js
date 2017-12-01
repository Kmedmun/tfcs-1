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
        }
    }else{
        // mobile view is simpler
        if(window.pageYOffset>window.mobileVideoMinimizePosition && window.pageYOffset<window.mobileVideoMinimizeEndPosition){
            jQuery('#video').addClass('minimized');
        }else{
            jQuery('#video').removeClass('minimized');
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

// modified from http://air.ghost.io/recording-to-an-audio-file-using-html5-and-js/
// appends an audio element to playback and download recording
function createAudioElement(blobUrl) {
    window.audioEl = document.createElement('audio');
    window.audioEl.onpause = function() {jQuery("button.playback").removeClass("playing");};
    window.audioEl.onplay = function() {jQuery("button.playback").addClass("playing");};
    window.sourceEl = document.createElement('source');
    window.sourceEl.src = blobUrl;
    window.sourceEl.type = 'audio/webm';
    window.audioEl.appendChild(sourceEl);
}

function startRecord() {
    // request permission to access audio stream
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
        // store streaming data chunks in array
        const chunks = [];
        // if nonexistent, create media recorder instance to initialize recording
        if (!window.recorder) {window.recorder = new MediaRecorder(stream);}
        // function to be called when data is received
        window.recorder.ondataavailable = e => {
          // add stream data to chunks
          chunks.push(e.data);
          // if recorder is 'inactive' then recording has finished
          if (window.recorder.state == 'inactive') {
              // convert stream data chunks to a 'webm' audio format as a blob
              const blob = new Blob(chunks, { type: 'audio/webm' });
              // convert blob to URL so it can be assigned to a audio src attribute
              createAudioElement(URL.createObjectURL(blob));
          }
        };
        // start recording with delay time between receiving 'ondataavailable' events
        window.recorder.start(500);
      }).catch(console.error);
}

function stopRecord() {
    window.recorder.stop();
}

var recording = false;
function toggleRecord() {
    if (window.audioEl && !window.audioEl.paused) {
        playBack(); // stop playback
    }
    if (recording) {
        stopRecord();
    } else {
        startRecord();
    }
    recording = !recording;
    jQuery("button.record").toggleClass("recording");
}

function playBack() {
    if (recording) {
        toggleRecord();
    }

    // give a short timeout so that recorded audio blob can be properly put into audio object (and therefore played)
    setTimeout(function(){
        if (window.audioEl) {
            if (window.audioEl.paused) {
                window.audioEl.play();
            } else {
                window.audioEl.pause();
                window.audioEl.currentTime = 0;
            }
        } else {
            console.log('no recordings yet')
        }
    }, 50);
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

    // if mobile browser: hide recorder buttons and related text
    if(jQuery.browser.mobile){
        $("span.recorder").html($("span#top").html());
        $("span.recorder").addClass("mobile");
        $("span.mobile-instruction").addClass("mobile");
        $("div#flashcontent").addClass("display-none");
        $("#video-navigation").addClass("mobile");
        window.videoNavHeight = 336;
    }else{window.videoNavHeight = 351;}

    // adapted from Jim W's code: http://stackoverflow.com/a/17494943
    // change layout based on amount of Y scroll
    window.minimizeTriggerPosition=-1;
    window.minimizeTrigger = document.getElementById('in-words');
    window.videoHiddenTriggerPosition = findPosY(document.getElementById('whats-next'))+200;

    if(window.minimizeTriggerPosition<0)window.minimizeTriggerPosition=findPosY(window.minimizeTrigger);

    window.mobileVideoMinimizePosition = findPosY(document.getElementById("video-frame")) + window.innerWidth;
    window.mobileVideoMinimizeEndPosition = findPosY(document.getElementsByClassName("phoneme-grid")[0]);

});