(function(){
  
  var air = {
    
    noscripts: [],
    display: null,

    loadImages: function(config, resize, noscripts) {
      
      if(!noscripts) {
        noscripts = air.noscripts;
      } else {
        air.noscripts = noscripts;
      }
      var display, res, dot, altattr, source, fileextension, imgpath, img, nos, $nos, parent, hasImg, hasAlt,
        img_tag, attrs, attr_parts, attr_name, attr_value, attr_apos, attr_arr = [],
        $noscripts = document.getElementsByTagName('noscript'), 
        i = 0, length = noscripts.length, iWidth = window.innerWidth || document.body.offsetWidth;
        
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
      
      for (; i < length; i = i + 1) {
        nos = noscripts[i];
        $nos = $noscripts[i];
        
        parent = $nos.parentNode;
        img = document.createElement("img");

        img_tag = /<img[^>]+>/.exec(nos)[0];
        attrs = img_tag.match(/(\w+)=("[^<>"]*"|'[^<>']*'|"\w+)/gi);
        
        for(i=0;i<attrs.length;i++) {
          attr_parts = attrs[i].split('=');
          attr_name = attr_parts[0].toLowerCase();
          attr_value = attr_parts[1];
          attr_apos = attr_value.match(/"|'/);
          attr_value = attr_value.replace(new RegExp (attr_apos[0], 'g'), '');
          
          if(attr_name === 'src') {
            dot = attr_value.lastIndexOf('.');
            imgpath = attr_value.substring(0, dot);
            fileextension = attr_value.substring(dot, attr_value.length);
            img.src = imgpath + display + fileextension;           
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
            air.loadImages(config, resize, noscripts) ;               
          }
        };
        req.open('GET', location.href, true);
        req.send();
      }

    },
            
    set: function(config, resize) {
            
      if(air.noscripts.length > 0) {
        air.loadImages(config, resize);
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
