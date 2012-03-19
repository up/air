(function(){
  
  var air = {

    set: function(config, resize) {

      var display, res, dot, source, fileextension, imgpath, img, nos, nostext, parent, hasImg,
        noscripts = document.getElementsByTagName('noscript'),
        i = 0, length = noscripts.length, iWidth = window.innerWidth;

      for (res in config) {
        if (iWidth >= parseInt(res, 10)) {
          display = config[res];
        }
      }

      for (; i < length; i = i + 1) {
        nos = noscripts[i];
        nostext = nos.textContent || nos.innerHTML;
        hasImg = /src=/.test(nostext);
        if(!hasImg) {
          return;
        }
        source = /src=([^ ]+)/.exec(nostext)[1];
        dot = source.lastIndexOf('.');
        imgpath = source.substring(1, dot);
        fileextension = source.substring(dot, source.length - 1);

        if (!resize) {
          img = document.createElement("img");
          img.src = imgpath + display + fileextension;
          img.alt = nos.alt;

          parent = nos.parentNode;
          parent.insertBefore(img, nos);

          air.addEvent('resize', function() {
            air.set(config, true);
          });

        } else {
          img = nos.previousSibling;
          img.src = imgpath + display + fileextension;
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
