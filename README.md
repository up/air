AIR - Adaptive Image Resizing
====

## Source

Air's Git repo is available on GitHub, which can be browsed at:

    https://github.com/up/air

and cloned with:

    git clone git://github.com/up/air.git


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
	  1: '-base',      // Smartphones (portrait)  
	  450: '-small',   // Smartphones (landscape)  
	  555: '-medium',  // Tablets (portrait)
	  850: '',         // Default Image without suffix Tablets (landscape), **Note**books 
	  1199: '-wide'    // Desktop and other wide displays
	});
	</script>
	
**Note**: For this example you need for each image 5 different versions

- MYIMAGE.jpg (between 850 and 1198 pixel)		
- MYIMAGE-base.jpg (between 1 and 449 pixel)
- MYIMAGE-small.jpg (between 450 and 849 pixel)
- MYIMAGE-medium.jpg (between 555 and 1198 pixel)
- MYIMAGE-wide.jpg (1199 and more pixel)

##### Example 2:
	<script>  
	air.set({
	  1: '-mobile',  // Mobile Displays 
	  740: ''        // Desktop Displays
	});
	</script>

**Note**: For this example you need for each image 2 different versions

1. MYIMAGE.jpg (740 and more pixel)
1. MYIMAGE-mobile.jpg (between 1 and 739 pixel)



## Copyright

Copyright (c) 2012 Uli Preuss. See LICENSE for details.