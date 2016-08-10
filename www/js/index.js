/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

function getPhoneGapPath() {

    var path = window.location.pathname;
    path = path.substr( path, path.length - 10 );
    // alert(path);
    return path;

};

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // Play a given mp3 file immediately!
    playPreSong: function(page) {
        // alert('trying to play:' + getPhoneGapPath() + song);
        // alert('playing song');

        song = $(page).attr('song') + "Pre.mp3";

        if(typeof device !== 'undefined'){
            var whatAmI = device.platform;
        } else {
            console.log("device is unavailable, assuming pc");
            var whatAmI = "pc";
        }
        console.log(whatAmI);
        var duration = 1000;
        if(whatAmI == "iOS"){

            function status_change(code) {
                switch (code) {
                    case Media.MEDIA_STOPPED : 
                        //alert("finished playing?");
                        $(page).find(".input--hoshi").css('visibility', 'visible');
                        $(page).find(".progress-button").css('visibility', 'visible'); 
                        break;
                }
            }

            media = new Media(getPhoneGapPath() + 'music/' + song, null, function (e) {
                //alert('Media Error');
                //alert(JSON.stringify(e));
            }, status_change);

            media.play();
            
        } else {
            console.log("I played a sound! -- " + getPhoneGapPath() + 'music/' + song);
            setTimeout(function(){
                $(page).find(".input--hoshi").css('visibility', 'visible');
                $(page).find(".progress-button").css('visibility', 'visible'); 
            }, duration);
        }

        $(page).find(".lyrics").children().each(function(){
            //alert($(this).html());
            var elem = $(this);
            timeToBold = elem.attr("time");
            setTimeout(function(){ elem.css("font-weight","Bold"); }, timeToBold);
        });

    },

    playPostSong: function(page) {
        // alert('trying to play:' + getPhoneGapPath() + song);
        // alert('playing song');

        page = $(page).parents(".cd-slider-content");

        $(page).find(".boxcover").toggleClass("fadedBox");
        var theButton = $(page).find(".progress-button");
        $(page).find(".progress-button").delay(1500).fadeTo(500, 0, function(){
           theButton.css("visibility", "hidden");   
        });
        
        song = $(page).attr('song') + "Post.mp3";

        if(typeof device !== 'undefined'){
            var whatAmI = device.platform;
        } else {
            console.log("device is unavailable, assuming pc");
            var whatAmI = "pc";
        }
        console.log(whatAmI);
        var duration = 1000;
        if(whatAmI == "iOS"){

            function status_change(code) {
                switch (code) {
                    case Media.MEDIA_STOPPED : 
                        //alert("finished playing?");
                        //alert("finsihe dplaying post song");
                        setTimeout(function(){
                            $(page).trigger('swipeleft');   
                        }, 2500);
                        setTimeout(function(){
                            app.playPreSong($(page).parent().next().children(".cd-slider-content"));
                        }, 3000);
                        break;
                }
            }

            media = new Media(getPhoneGapPath() + 'music/' + song, null, function (e) {
                //alert('Media Error');
                //alert(JSON.stringify(e));
            }, status_change);

            media.play();
            
        } else {
            console.log("I played a sound! -- " + getPhoneGapPath() + 'music/' + song);
            //alert("finsihe dplaying post song");
            setTimeout(function(){
                $(page).trigger('swipeleft');
            }, 1000);
            console.log($(page).parent().next().children(".cd-slider-content"));
            setTimeout(function(){
                app.playPreSong($(page).parent().next().children(".cd-slider-content"));
            }, 2000);
        }


    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        console.log('deviceready');

        if(typeof device !== 'undefined'){
            StatusBar.hide();
        }
        

        var thatthis = this;
        setTimeout(function(){
            app.playPreSong($("#zara"));
        }, 1000);
    }, 



    //,
    // // Update DOM on a Received Event
    // receivedEvent: function(id) {
    //     var parentElement = document.getElementById(id);
    //     var listeningElement = parentElement.querySelector('.listening');
    //     var receivedElement = parentElement.querySelector('.received');

    //     listeningElement.setAttribute('style', 'display:none;');
    //     receivedElement.setAttribute('style', 'display:block;');

    //     console.log('Received Event: ' + id);
    // }
};

$(document).ready(function() {

    // $(".lyrics").each(function(){
    //     //alert($(this).html());
    //     $(this).children().each(function(){
    //         //alert($(this).html());
    //         var elem = $(this);
    //         timeToBold = elem.attr("time");
    //         setTimeout(function(){ elem.css("font-weight","Bold"); }, timeToBold);
    //     });
    //     //alert(songtext);
    // });

    // songtext = [ // [text, duration]
    //     ["This", 500],
    //     ["is", 200],
    //     ["a", 200],
    //     ["very", 500],
    //     ["good", 500],
    //     ["songtext!", 1000]
    // ];
    // var text="";
    // $.each(songtext, function(a, b) {
    //     text += "<span id='p"+a+"' style='color:blue'>" + b[0] + "</span> ";
    // });
    
    // $('#div').html(text);
    
    // cc=0;
    
    // nextWord();
});

var cc = 0;
function nextWord() {
    $('#p'+cc).css("color", "red");
    cc++;
    if(cc> songtext.length-1) return;
    window.setTimeout(nextWord, songtext[cc-1][1]);
}
