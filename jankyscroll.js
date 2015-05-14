// jankyscroll.js v0.1
// what's wrong with you
var jankyscroll = (function() {
    'use strict';
    function coinflip () {
        var coin = Math.round(Math.random());
        //flip it, baby
        if (coin == 1) {
            return (-1);
        } else {
            return (1);
        }
    }

    function intErval(){
        return (Math.random() * (12 - 8 + 1) + 8)/10;
    }
  
    return function(trigger_distance, jank_range) {
        trigger_distance = trigger_distance || 400;
        jank_range = jank_range || 20;
        var lastOffset;

        var scrollJank = function() {
            var scrollOffset = Math.floor(window.scrollY / trigger_distance);
            if (lastOffset !== scrollOffset) {
                window.scrollBy(0, (jank_range * intErval() * coinflip()));
                lastOffset = scrollOffset;
            }
        };

        var timer;

        function resizeJank() {
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(function() {
               window.scrollBy(0, (jank_range * intErval() * coinflip()));
            }, 400);
        }

        window.addEventListener('scroll', scrollJank, false);
        window.addEventListener('resize', resizeJank, false);
    };
}());
