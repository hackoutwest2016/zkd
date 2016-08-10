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
    playSong: function(song) {
        // alert('trying to play:' + getPhoneGapPath() + song);
        // alert('playing song');
        if(typeof device !== 'undefined'){
            var whatAmI = device.platform;
        } else {
            console.log("device is unavailable, assuming pc");
            var whatAmI = "pc";
        }
        console.log(whatAmI);

        if(whatAmI == "iOS"){
            media = new Media(getPhoneGapPath() + 'music/' + song, null, function (e) {
                alert('Media Error');
                alert(JSON.stringify(e));
            });
            media.play();
        } else {
            console.log("I played a sound! -- " + getPhoneGapPath() + 'music/' + song);
        }

    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        alert('deviceready');
        var thatthis = this;
        setTimeout(function(){
            app.playSong("pre/LushLifePre.mp3");
        }, 3000);
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
