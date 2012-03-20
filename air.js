(function(){
  
  var air = {
    
    noscripts: [],

    addImages: function(config, resize, noscripts) {
      
      if(!noscripts) {
        noscripts = air.noscripts;
      }
      var display, res, dot, altattr, source, fileextension, imgpath, img, nos, $nos, parent, hasImg, hasAlt,
        $noscripts = document.getElementsByTagName('noscript'),
        i = 0, length = noscripts.length, iWidth = window.innerWidth || document.body.offsetWidth;
        
      air.noscripts = noscripts;

      for (res in config) {
        if (iWidth >= parseInt(res, 10)) {
          display = config[res];
        }
      }
      for (; i < length; i = i + 1) {
        nos = noscripts[i];
        $nos = $noscripts[i];
        
        hasImg = /src=/.test(nos);
        if(!hasImg) {
          return;
        }
        source = /src=([^ ]+)/.exec(nos)[1];
        dot = source.lastIndexOf('.');
        imgpath = source.substring(1, dot);
        fileextension = source.substring(dot, source.length - 1);

        parent = $nos.parentNode;
        img = document.createElement("img");
        img.src = imgpath + display + fileextension;
        
        hasAlt = /alt=/.test(nos);
        if(!hasAlt) {
          altattr = /alt=[\'"]([^\'"]+)/.exec(nos)[1];          
          img.alt = altattr;
        }

        if (!resize) {
          
          parent.insertBefore(img, $nos);
          
          air.addEvent('resize', function() {
            air.set(config, true);
          });

        } else {
          parent.replaceChild(img, $nos.previousSibling);
        }
      }
      
    },
            
    xhr: function(config, resize) {

      var req, data, noscripts;

      try {
        req = new XMLHttpRequest();
      } 
      catch(e){
        try {
          req = new ActiveXObject('Msxml2.XMLHTTP');
        }
        catch(e2){
          req = new ActiveXObject('Microsoft.XMLHTTP');
        }
      }
      if(req) {
        req.onreadystatechange = function() {
          if (req.readyState == 4 && req.status == 200){
            data = req.responseText; 
            noscripts = data.match(/<noscript\b[^>]*>(?:(?=([^<]+))\1|<(?!noscript\b[^>]*>))*?<\/noscript>/gi);
            air.addImages(config, resize, noscripts) ;               
          }
        };
        req.open('GET', location.href, true);
        req.send();
      }

    },
            
    set: function(config, resize) {
            
      if(air.noscripts.length > 0) {
        air.addImages(config, resize);
      } else {
        air.xhr(config, resize);        
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
