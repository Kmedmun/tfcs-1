var mic, recorder, soundFile;
var state = 0;

// create an audio in
mic = new p5.AudioIn();

// prompts user to enable their browser mic
mic.start();

// create a sound recorder
recorder = new p5.SoundRecorder();

// connect the mic to the recorder
recorder.setInput(mic);

// this sound file will be used to
// playback & save the recording
soundFile = new p5.SoundFile();


function keyPressed() {
  // make sure user enabled the mic
  if (state === 0 && mic.enabled) {
    // record to our p5.SoundFile
    console.log("recording");
    recorder.record(soundFile);
    state++;
  }
  else if (state === 1) {

    // stop recorder and
    // send result to soundFile
    console.log("stopped");
    recorder.stop();

    state++;
  }

  else if (state === 2) {
    console.log("playback");
    soundFile.play(); // play the result!
    state++;
  }
}