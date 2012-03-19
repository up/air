AIR - Adaptive Image Resizing
====

## Source

Air's Git repo is available on GitHub, which can be browsed at:

    https://github.com/up/air

and cloned with:

    git clone git://github.com/up/air.git


## Supported Browser

Tested with Chrome 17, Firefox 10, Safari 5


## Usage

### Step 1

Wrap your 'img' tags into 'noscript' sections:

	<noscript>
	  <img src="images/test1.jpg" alt="Alt text 1" />
	</noscript>
	
	<noscript>
	  <img src="images/test2.jpg" alt="Alt text 2" />
	</noscript> 
	
	..   
	
**Note**: You can use all kinds of image types (jpg, png, gif, ..)

### Step 2

Include the 'air.min.js' to the end of your page body:

	<script src="air.min.js"></script>
	

### Step 3

Choose the suffixes and the corresponding display resolutions:

##### Example 1: 
	<script>  
	air.set({
	  1: '-base',      // e.g. Smartphones (portrait)  
	  320: '-small',   // e.g. Smartphones (landscape)  
	  480: '-medium',  // e.g. Tablets (portrait)
	  960: '',         // Default Image without suffix - e.g. Tablets (landscape), Netbooks, .. 
	  1280: '-wide'    // e.g. Desktop PCs
	});
	</script>
	
**Note**: For this example you need for each image 5 different versions

	1. MYIMAGE-base.jpg   (between 1 and 319 pixel)
	2. MYIMAGE-small.jpg  (between 320 and 479 pixel)
	3. MYIMAGE-medium.jpg (between 480 and 959 pixel)
	4. MYIMAGE.jpg        (between 960 and 1279 pixel)		
	5. MYIMAGE-wide.jpg   (1199 and more pixel)

##### Example 2:
	<script>  
	air.set({
	  1: '-mobile',  // Mobile Displays 
	  1024: ''       // Desktop Displays
	});
	</script>

**Note**: For this example you need for each image 2 different versions

	1. MYIMAGE.jpg        (1024 and more pixel)
	2. MYIMAGE-mobile.jpg (between 1 and 1023 pixel)



## Copyright

Copyright (c) 2012 Uli Preuss. See LICENSE for details.