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
	
### Step 2

Include the 'air.min.js' to the end of your page body:

	<script src="air.min.js"></script>
	
	<script>  


### Step 3

Choose the suffixes and the corresponding display resolutions:

#### Example One

	air.set({
	  // min screen width: name suffix
	  1: '-base',      // Smartphones (portrait)  
	  450: '-small',   // Smartphones (portrait)  
	  555: '-medium',  // Smartphones (landscape)
	  850: '',         // Default Image without suffix Tablets (landscape), Notebooks 
	  1199: '-wide'    // Desktop Displays
	});
	</script>

  


## Copyright

Copyright (c) 2012 Uli Preuss. See LICENSE for details.