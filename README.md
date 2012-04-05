AIR - Adaptive Image Replacement
====

A tiny tool that can significantly improve the mobile performance of your website by loading optimized images 
for different screens. Works well with the Responsive Web Design approach. 


##Introduction

The biggest problem with CSS3's @media-queries and "responsive" websites is that we only can use one single image file. That means we're serving large images to large screens as well as to smartphones with small resolutions. And this increase the loading times for mobile devices especially with low bandwidth.

AIR provides a simple "file suffix"-solution and loads different images for different window sizes. You can decide how many alternative images you will offer and breakpoints you will define.

**The ingredients**: Javascript, XHR/Ajax, Regular Expressions and noscript elements. No user agent sniffing, cookies, canvas elements, dynamically-injected base tags or server-side scripts. 

*	Pure Front-End Solution
*	Framework-independent
*	Degrades gracefully to standard image if JavaScript is not active.
*	Includes onresize event handler (deactivatable)
*	Lightweight (< 1 kb, Minified and Gzipped)
*	Easy to integrate and use
*	Tested with Chrome 17, Firefox 11, Safari 5, Opera 11.6 and IE 7+8


## Source

The project is [hosted on GitHub](http://github.com/up/air/). You can clone the repository with:

	git clone git://github.com/up/air.git

### Downloads

*	[Development Version](http://raw.github.com/up/air/master/air.js) 4 kb, Uncompressed
*	[Production Version](http://raw.github.com/up/air/master/air.min.js) 	1 kb, Minified and Gzipped
*	[Zip](http://github.com/up/air/zipball/master) 	with example files


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


### Step 3 - Select the breakpoints for any number of display resolutions, and the appropriate suffixes. 

There are many differents screen-widths 
(see [list of cellphone screens](http://cartoonized.net/cellphone-screen-resolution.php)) and so no general recommendations for breakpoints. Here are some of the major:

	1440px /* Popular Laptop size, fullscreen 15" MacBook Pro */
	1030px /* iPad landscape */
	770px  /* iPad portait */
	480px  /* Many mobile devices in landscape */
	320px  /* Most mobile devices in portrait. */
	
#### Example 1

	<script>
	air.set({
	  1: '-small', // Small screens
	  640: ''      // .. other screens
	});
	</script>

.. or if you prefer the 'Mobile First' approach: 

	<script>
	air.set({
	  1: '',           // Small screens
	  640: '-nomobile' // .. other screens
	});
	</script>
	
#### Example 2

If you want to load no images on very small screens, then start at a higher value:

	<script>
	air.set({
	  240: '',     // Most mobile devices
	  640: '-nomobile' // .. other screens
	});
	</script>
	
#### Example 3

If you want to deactivate the default activated onresize event handler, add 'true' as a second argument:

	<script>
	air.set({
	  1: '',        // Small screens
	  1024: '-wide' // Wide screens
	}, true);       // Deactivate onresize event handler
	</script>
	

In each of the previous examples, you need two different versions of each image, e.g.:

1.	MYIMAGE.png and
2.	MYIMAGE-small.png or <br/>MYIMAGE-nomobile.png or <br/>MYIMAGE-wide.png


##### Example 4
 
	<script>
	air.set({
	  1: '-smartphone',
	  570: '-tablet-small',
	  625: '-tablet',
	  996: '' // Default (No Javascript, Netbooks, Notebooks, Wide Displays..)
	});
	</script>
	
You need four different versions of each image:

1.	MYIMAGE-smartphone.jpg (for screens between 1 and 569 px)
2. 	MYIMAGE-tablet-small.jpg (for screens between 570 and 625 px)
3.	MYIMAGE-tablet.jpg (for screens between 626 and 996 px)
4.	MYIMAGE.jpg (for screens greater 996 px)


##### Example 5

	<script>
	air.set({
	  1: '-base',
	  321: '-small',
	  641: '-medium',
	  961: '', // Default (No Javascript, Netbooks, Notebooks, ..)
	  1280: '-wide'
	});
	</script>

You need five different versions of each image:

1.	MYIMAGE-base.jpg (for screens between 1 and 320 px)
2.	MYIMAGE-small.jpg (for screens between 320 and 640 px)
3.	MYIMAGE-medium.jpg (for screens between 640 and 960 px)
4.	MYIMAGE.jpg (for screens between 960 and 1280 px)
5.	MYIMAGE-wide.jpg (for screens greater 1280 px)


## Check Images

Air offers a small debugging function: You can simply check if all necessary images are exists.

	<script>
	air.check();
	...
	</script>

Air tries to load the images for all screens (as a background job). If one or more images are not found, you can see correlating error messages on the console, e.g. Firebug:

	"NetworkError: 404 Not Found - http://example.com/MYIMAGE1-base.jpg"
	"NetworkError: 404 Not Found - http://example.com/MYIMAGE2-wide.jpg"


## Any feedback is welcome!

Please report bugs and post your suggestions for improvements or new features on the [github issues page](http://github.com/up/air/issues). 


## Copyright

Copyright (c) 2011 - 2012 Uli Preuss. 

Dual licensed under the [MIT license](http://github.com/up/air/blob/master/MIT-license.txt) and [GPL license](http://github.com/up/air/blob/master/GPL-license.txt).
