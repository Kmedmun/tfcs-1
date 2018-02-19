var mic, recorder, soundFile;

mic = new p5.AudioIn();
// prompts user to enable their browser mic
mic.start();

recorder = new p5.SoundRecorder();
// connect the mic to the recorder
recorder.setInput(mic);

// this sound file will be used to
// playback & save the recording
soundFile = new p5.SoundFile();

function toggleRecord() {
  if (soundFile.isPlaying()) soundFile.stop(); jQuery("button.playback").removeClass("playing");
  if (recorder.recording) recorder.stop(); 
  else recorder.record( soundFile, undefined, ()=>drawWaveform( soundFile.buffer.getChannelData(0) ) );

  jQuery("button.record").toggleClass("recording");
}

function playBack() {
  if (recorder.recording) recorder.stop();
  if (soundFile.isPlaying()) soundFile.stop(); 
  else soundFile.play(); setTimeout(()=>jQuery("button.playback").removeClass("playing"), soundFile.duration() * 1000);
  
  jQuery("button.playback").toggleClass("playing");
}

function drawWaveform( buffers ) {
    var canvas = document.getElementById( "wavedisplay" );
    drawBuffer( canvas.width, canvas.height, canvas.getContext('2d'), buffers );
}

function drawBuffer( width, height, context, data ) {
    var step = Math.ceil( data.length / width );
    var amp = height / 2;
    context.fillStyle = "silver";
    context.clearRect(0,0,width,height);
    for(var i=0; i < width; i+=3){
        var min = 1.0;
        var max = -1.0;
        for (j=0; j<step; j++) {
            var datum = data[(i*step)+j]; 
            if (datum < min)
                min = datum;
            if (datum > max)
                max = datum;
        }
        context.fillRect(i,(1+min)*amp,2,Math.max(1,(max-min)*amp));
    }
}