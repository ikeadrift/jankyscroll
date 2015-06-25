// jankyscroll.js v2.0
// what's wrong with you
var jankyscroll = (function() {
    'use strict';
    function coinflip () {
        return ((Math.random() * 2)|0) * 2 - 1;
    }

    function intErval() {
        return (Math.random() * (12 - 8 + 1) + 8) / 10;
    }
  
    return function(trigger_distance, jank_range, jank_method) {
        trigger_distance = trigger_distance || 400;
        jank_range = jank_range || 20;
        if (typeof jank_method !== 'function') {
            jank_method = (function() {
                switch (jank_method) {
                  case "offset":
                      return function(val) {
                          document.body.style.transform = "translateY(" + val + "px)";
                      };
                  case "hardcore":
                      return function(val) {
                          var all = document.getElementsByTagName("*");
                          for (var i = 0; i < all.length; i++) {
                              all[i].style.transform = "translateY(" + (val * (Math.random() / 2 + 0.75)) + "px)";
                          }
                      }
                  case "scroll":
                  default:
                      return function(val) {
                          window.scrollBy(0, val);
                      };
                }
            })();
        }
        var lastOffset;

        var scrollJank = function() {
            var scrollOffset = Math.floor(window.scrollY / trigger_distance);
            if (lastOffset !== scrollOffset) {
                jank_method(jank_range * intErval() * coinflip());
                lastOffset = scrollOffset;
            }
        };

        var timer;

        function resizeJank() {
            if (timer)
                clearTimeout(timer);
            timer = setTimeout(function() {
                jank_method(jank_range * intErval() * coinflip());
            }, 400);
        }

        window.addEventListener('scroll', scrollJank, false);
        window.addEventListener('resize', resizeJank, false);
    };
})();
