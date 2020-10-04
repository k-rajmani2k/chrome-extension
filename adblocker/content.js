// javascript file that works on specific url: Youtube
// sent a message from the content page (need to listen from the event page which is a background script)
chrome.runtime.sendMessage({show: "showPageAction"});

// fires immediately after browser loads the object
window.onload = function(){ 
    /* additional feature
    document.getElementById('toggle_button').onclick = function() {
        var text = document.getElementById('toggle_button').innerHTML;
        if (text == 'Disable') {
            document.getElementById('toggle_button').innerHTML = 'Enable';
        }
        else {
            document.getElementById('toggle_button').innerHTML = 'Disable';
        }
    };
    */

    var outerLayer = document.getElementsByClassName('video-ads ytp-ad-module');
    var adPlayerOverlay = document.getElementsByClassName('ytp-ad-player-overlay'); // popup ads in video
    var adImageOverlay = document.getElementsByClassName('ytp-ad-image-overlay');
    var secondInnerLayer = document.getElementsByClassName('ytp-ad-persisting-overlay');
    var thirdInnerLayer = document.getElementsByClassName('ytp-ad-overlay-slot');
    var button = document.getElementsByClassName('ytp-ad-skip-button ytp-button');
    var firstAd = document.getElementsByClassName('ytp-ad-text');
    
    // prevents/skips additional google ads (new)
    // function skipFirstAd() {
    //     if(firstAd && firstAd[2] && firstAd[2].innerHTML == 'Ad 1 of 2 ·') {
    //         clickSkipBtn();
    //         document.querySelector('video').currentTime = document.querySelector('video').duration;
    //     }
    // }

    function skipFirstInner(callback) {
        if (adPlayerOverlay[0] && adPlayerOverlay.length > 0) {
            adPlayerOverlay[0].style.visibility = 'hidden';
            callback();
        }
        else if (adImageOverlay[0] && adImageOverlay.length > 0) {
            adImageOverlay[0].style.visibility = 'hidden';
            callback();
        }
    }

    function clickSkipBtn() {
        if(button[0] && button.length > 0) {
            button[0].click();
        }
    }

    setInterval(function(){ 
        // remove ads that pops up in the video frame
        if (outerLayer && outerLayer.length > 0) {
            clickSkipBtn();
            skipFirstInner(function() {
                if((firstAd && firstAd[2] && firstAd[2].innerHTML.includes('Ad')) ||
                   (firstAd && firstAd[1] && firstAd[1].innerHTML.includes('Ad')) ||
                   (firstAd && firstAd[0] && firstAd[0].innerHTML.includes('Ad'))) {
                    clickSkipBtn();
                    document.querySelector('video').currentTime = document.querySelector('video').duration;
                }
            });

            // block ad popups during the video
            // if (thirdInnerLayer[0] && thirdInnerLayer.length > 0) {
            //     thirdInnerLayer[0].style.visibility = "hidden";
            //     console.log('in here 4');
            //     return;

            // }
        }

    }, 1);

    // setInterval(function(){ 
    //     // remove ads that pops up in the video frame
    //     if (outerLayer && outerLayer.length > 0) {
    //         console.log('1');
            
    //         // skip if there exists a skip button
    //         if (button[0] && button.length > 0) {
    //             button[0].click();
    //             console.log('in here 2');
    //         }
    //         // prevents/skips additional google ads (new)
    //         if (firstAd && firstAd[0]) {
    //             console.log('in here 3');
    //             document.querySelector('video').currentTime = document.querySelector('video').duration;
    //             return;
    //         }
    //         // block ad popups during the video
    //         else if (thirdInnerLayer[0] && thirdInnerLayer.length > 0) {
    //             thirdInnerLayer[0].style.visibility = "hidden";
    //             console.log('in here 4');
    //             return;

    //         }
    //         if (firstInnerLayer[0] && firstInnerLayer.length > 0) {
    //             firstInnerLayer[0].style.visibility = "hidden";
    //             console.log('in here 1');
    //             return;

    //         }
    //     }

    // }, 1);
   
};