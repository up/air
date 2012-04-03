/**
  * AIR - Adaptive Image Resizing
  * http://github.com/up/air
  * Copyright (c) 2012 Uli Preuss
  * Dual licensed under the MIT and GPL
*/

(function(){
  
  var air = {
    
    noscripts: [],
    images: [],
    display: null,
    checkImages: false,
            
    set: function(config, resize) {
                  
      if(air.noscripts.length > 0) {
        air.loadImages(config, resize);
      } else {
        air.xhr(config, resize);        
      }      

    },
            
    check: function() {              
      air.checkImages = true;   
    },
            
    xhr: function(config, resize) {

      var req = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP"),
        data, noscripts;
      
      if(req) {
        req.onreadystatechange = function() {
          if (req.readyState == 4 && req.status == 200){
            data = req.responseText; 
            noscripts = data.match(/<noscript\b[^>]*>(?:(?=([^<]+))\1|<(?!noscript\b[^>]*>))*?<\/noscript>/gi);
            air.loadImages(config, resize, noscripts) ;               
          }
        };
        req.open('GET', location.href, true);
        req.send();
      }

    },
            
    loadImages: function(config, resize, noscripts) {
      
      if(!noscripts) {
        noscripts = air.noscripts;
      } else {
        air.noscripts = noscripts;
      }
      
      var display, res, dot, extension, path, img, nos, $nos, parent, img_tag, 
        attrs, attr_parts, attr_name, attr_value, attr_apos, attr_arr = [],
        $noscripts = document.getElementsByTagName('noscript'), i = 0, k = 0,
        alength, nlength = noscripts.length, iWidth = window.innerWidth || document.body.offsetWidth;
        
      for (res in config) {
        if (iWidth >= parseInt(res, 10)) {
          display = config[res];
        }
      }
      
      if(air.display === display){
        return;
      } else {
        air.display = display;
      }
      
      for (; i < nlength; i++) {
        
        nos = noscripts[i];
        $nos = $noscripts[i];
        
        parent = $nos.parentNode;
        img = document.createElement("img");

        img_tag = /<img[^>]+>/.exec(nos)[0];
        attrs = img_tag.match(/(\w+)=("[^<>"]*"|'[^<>']*'|"\w+)/gi);
        alength = attrs.length;
        
        for(k=0;k<alength;k++) {
          
          attr_parts = attrs[k].split('=');
          attr_name = attr_parts[0].toLowerCase();
          attr_value = attr_parts[1];
          attr_apos = attr_value.match(/"|'/);
          attr_value = attr_value.replace(new RegExp (attr_apos[0], 'g'), '');
          
          if(attr_name === 'src') {
            dot = attr_value.lastIndexOf('.');
            path = attr_value.substring(0, dot);
            extension = attr_value.substring(dot, attr_value.length);
            img.src = path + display + extension;
            if(air.checkImages) {
              air.images.push([path, extension]);        
            }
          } else {
            img[attr_name] = attr_value;           
          }
          
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
      
      if(air.checkImages) {
        for(i=0;i<air.images.length;i++) {
          path = air.images[i][0];
          extension = air.images[i][1];
          for (res in config) {
            new Image().src = path + config[res] + extension;
          }          
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
  window['air']['check'] = air.check;
   
}());
