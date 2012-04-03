/**
  * AIR - Adaptive Image Resizing
  * http://github.com/up/air
  * Copyright (c) 2012 Uli Preuss
  * Dual licensed under the MIT and GPL
*/

(function(){
  
  var air = {
    
    noscripts: [],
    _images: [],
    _display: null,
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
      
      var _display, res, dot, extension, path, img, nos, $nos, parent, img_tag, 
        attrs, attr_parts, attr_name, attr_value, attr_apos, prev_sib, attr_arr = [], 
        $noscripts = document.getElementsByTagName('noscript'), i = 0, k = 0,
        alength, nlength = noscripts.length, iWidth = window.innerWidth || document.body.offsetWidth;
        
      for (res in config) {
        if (iWidth >= parseInt(res, 10)) {
          _display = config[res];
        }
      }
      if(air._display === _display){
        return;
      } else {
        air._display = _display;
      }
      
      for (; i < nlength; i++) {
        
        nos = noscripts[i];
        $nos = $noscripts[i];
        prev_sib = $nos.previousSibling;
        
        parent = $nos.parentNode;
        
        if(_display !== undefined) {
          
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
              img.src = path + _display + extension;
              if(air.checkImages) {
                air._images.push([path, extension]);        
              }
            } else {
              img[attr_name] = attr_value;           
            }

          }
          
        }
                
        if (!resize) {
          
          if(_display !== undefined) {
            parent.insertBefore(img, $nos);
          }
          
          air.addEvent('resize', function() {
            air.set(config, true);
          });

        } else {
          if(_display !== undefined) {
            prev_sib.style.display = 'inline';
            parent.replaceChild(img, prev_sib);
          } else {
            prev_sib.style.display = 'none';
          }
        }
                
      }
      
      if(air.checkImages) {
        for(i=0;i<air._images.length;i++) {
          path = air._images[i][0];
          extension = air._images[i][1];
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
