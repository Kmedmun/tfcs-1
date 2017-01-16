# TfCS
Tools for Clear Speech (Baruch College) site renewal


div#container holds the flash recorder, shortcuts, phoneme video and phoneme description together.

div#phoneme-container holds all of the above, except the phoneme description.

div#video-navigation holds the flash recorder and shortcuts.

shortcuts to phonemes (span#gotophonemes) will switch to a one-liner (span#gotophonemes-minimized) when you scroll down.

div#video-navigation-mobile provides back-to-top links in mobile view (hidden in desktop view).

div#video-frame holds the video. It also holds div#video-phoneme-explanation, which is identical to div#phoneme-explanation in terms of content, and is displayed only when you scroll down. By the way, scrolling down also causes video-frame to shift to the right side of the screen.

div#phoneme-explanation holds, well, the phoneme description. it is turned invisible when you scroll down.

span.anchor is what the shortcuts in div#video-navigation point to. Use the span's id attribute to add more!

div.exercise formats the boxes that surround in-word and in-sentence exercises.

The layout change that occurs when you scroll down is controlled using JS and CSS. First, tfcs_interface.js detects how far down you have scrolled and when you have gone past the threshold (minimizeTriggerPosition), it toggles the classes 'minimized' or 'shifted' in select elements. Then, based on these added classes, the custom CSS repositions all elements. Also, when you reach further down (videoLimit), div#video-frame gets pushed upwards. That's pretty much it!

Oh, and also, this js file takes the current document title (like "/b/") and uses it to generate text in the shortcut menu. 