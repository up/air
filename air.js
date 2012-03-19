(function(){
  
  var air = {

    set: function(config, resize) {

      var display, res, res1, dot, src, img, nos, nostext, parent, smallest, hasImg,
        noscripts = document.getElementsByTagName('noscript'),
        i = 0, length = noscripts.length, iWidth = window.innerWidth,
        smallest_res = 10000,
        to_i = function(str){
          return parseInt(str, 10);
        };

      for (res in config) {
        if (smallest_res >= to_i(res)) {
          smallest_res = to_i(res);
          smallest = config[res];
        }
      }

      if (iWidth < smallest_res) {
        for (res in config) {
          display = smallest;
        }
      } else {
        for (res in config) {
          if (iWidth >= to_i(res)) {
            display = config[res];
          }
        }
      }

      for (; i < length; i = i + 1) {
        nos = noscripts[i];
        nostext = nos.textContent || nos.innerHTML;
        hasImg = /src=/.test(nostext);
        if(!hasImg) {
          return;
        }
        src = /src=([^ ]+)/.exec(nostext)[1];
        dot = src.lastIndexOf('.');
        path = src.substring(1, dot);
        ext = src.substring(dot, src.length - 1);

        if (!resize) {
          img = document.createElement("img");
          img.src = path + display + ext;
          img.alt = nos.alt;

          parent = nos.parentNode;
          parent.insertBefore(img, nos);

          air.addEvent('resize', function() {
            air.set(config, true);
          });

        } else {
          img = nos.previousSibling;
          img.src = path + display + ext;
        }
      }

    },
    
    addEvent: function(type, fn) {
      if (window.attachEvent) {
        window['e' + type + fn] = fn;
        window[type + fn] = function() {
          window['e' + type + fn](window.event);
        };
        window.attachEvent('on' + type, window[type + fn]);
      } else {
        window.addEventListener(type, fn, false);
      }
    }

  };
  
  window['air'] = air;
  window['air']['set'] = air.set;
   
}());
