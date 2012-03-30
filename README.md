AIR - Adaptive Image Replacement
====

A tiny tool that can significantly improve the mobile performance of your website by loading optimized 
images for different screens. Works well with the Responsive Web Design approach. 

##Introduction

AIR loads different images for different window sizes. Not only resized images or modified dimensions! You can decide how many alternative images you will offer and breakpoints you will define. **The ingredients**: Javascript, XHR/Ajax, Regular Expressions and noscript elements.

*	Pure Front-End Solution
*	Framework-independent
*	Degrades gracefully to standard image if JavaScript is not active.
*	Includes onresize event handler (deactivatable)
*	Lightweight (< 1 kb, Minified and Gzipped)
*	Easy to integrate and use
*	Tested with Chrome 17, Firefox 11, Safari 5, Opera 11.6 and IE 7+8


## Source

The project is [hosted on GitHub](http://github.com/up/air/). You can report bugs and discuss features on the [issues page](http://10.0.1.2/~ulipreuss/air/github.com/up/air/issues) and clone the repository with:

	git clone git://github.com/up/air.git

### Downloads

*	[Development Version](http://raw.github.com/up/air/master/air.js) < 4 kb, Uncompressed
*	[Production Version](http://raw.github.com/up/air/master/air.min.js) 	< 1 kb, Minified and Gzipped
*	[Zip with example files](http://github.com/up/air/zipball/master) 	467 kb


## Usage

### Step 1 - Wrap your images into 'noscript' sections. No need for special attributes. 

	<noscript>
	  <img src="MYIMAGE1.jpg" alt="TEXT 1" class="thumb" />
	</noscript>
	
	<noscript>
	  <img src="MYIMAGE2.jpg" alt="TEXT 2" />
	</noscript> 
	
	..   
	
You can use any kinds of image types and attributes.

**Note**: If you're having trouble with eventhandler, please make sure that you haven't mixed single and double quotation marks in attributes like:
	
	<img .. onclick="alert('Hello World')" />

You can solve the problem with 'Unobtrusive JavaScript' - which is always preferable :).


### Step 2 - Include the 'air.min.js' to the end of your page body: 

	<script src="air.min.js"></script>


### Step 3 - Choose the suffixes and the corresponding display resolutions (See examples). 


#### Example 1:
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

Copyright (c) 2012 Uli Preuss. 

Dual licensed under the [MIT license](http://github.com/up/air/blob/master/MIT-license.txt) and [GPL license](http://github.com/up/air/blob/master/GPL-license.txt).
