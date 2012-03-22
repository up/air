AIR - Adaptive Image Resizing
====

AIR is a JavaScript tool for loading different images depending on the display width.

AIR is lightweight (1.36KB / 824 bytes gzipped) and easy to integrate.


## Source

Air's Git repo is available on GitHub, which can be browsed at:

    https://github.com/up/air

and cloned with:

    git clone git://github.com/up/air.git


## Supported Browser

Tested with Chrome 17, Firefox 11, Safari 5, IE 7+8


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
	
**Note**: You can use any kinds of image types (jpg, png, gif, ..)

### Step 2

Include the 'air.min.js' to the end of your page body:

	<script src="air.min.js"></script>
	

### Step 3

Choose the suffixes and the corresponding display resolutions:


##### Example 1:
	<script>  
	air.set({
	  1: '-mobile',  // Mobile Displays 
	  1024: ''       // Desktop Displays
	});
	</script>

**Note**: In this example, you need 2 different versions of each image

	1. MYIMAGE.jpg        (for screens with 1024 and more pixel)
	2. MYIMAGE-mobile.jpg (for screens with between 1 and 1023 pixel)


##### Example 2: 
	<script>  
	air.set({
	  1: '-base',      // e.g. Smartphones (portrait)  
	  320: '-small',   // e.g. Smartphones (landscape)  
	  480: '-medium',  // e.g. Tablets (portrait)
	  960: '',         // Default Image without suffix - e.g. Tablets (landscape), Netbooks, .. 
	  1280: '-wide'    // e.g. Desktop PCs
	});
	</script>
	
**Note**: In this example, you need 5 different versions of each image

	1. MYIMAGE-base.jpg   (for screens with between 1 and 319 pixel)
	2. MYIMAGE-small.jpg  (for screens with between 320 and 479 pixel)
	3. MYIMAGE-medium.jpg (for screens with between 480 and 959 pixel)
	4. MYIMAGE.jpg        (for screens with between 960 and 1279 pixel)		
	5. MYIMAGE-wide.jpg   (for screens with 1199 and more pixel)


## Copyright

Copyright (c) 2012 Uli Preuss. See [LICENSE](https://github.com/up/air/blob/master/LICENSE.md) for details.