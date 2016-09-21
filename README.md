# Web Optimization Project

## Description

Challenge from Udacity to modify a simple website with the express purpose of making it performant.  Specific requirements:
 
 1.  Edit index.html to achieve a PageSpeed score of at least 90.
 2.  Optimize pizza.html to render with a consistent frame-rate at 60fps when scrolling.
 3.  Reduce resize pizza time to less than 5 ms.


## Installation/Workflow Instructions

For this project, I used Gulp to automate tasks such as html minification, javascript uglification, and css inlining.  Image optimization was accomplished separately. 

**Project File Structure:**

<pre>
	/project
    	/source	 
    	/builds	 
     		/development
     		/production  		
</pre>
_Source:_ original files

_Development:_ working files

_Production:_ optimized output

The default Gulp task is configured to optimize development files and store the result in the production folder.  This task will also serve production files on a local server, if available.

**To install:**

1.  Clone repo.
2.  In terminal application, run **npm install** to install dependencies.
3.  Open index.html in the browser of your choice.


## List of Edits and Optimizations

**Pageinsights for index page:**

 1.  Execute javascript asynchronously where possible.
 2.  Use media=print option for print.css stylesheet.
 3.  Minified javascript, css, and html.
 4.  Optimized images.
 5.  Inlined css.  
 
**Scroll of pizza page:**

 1.  Refactored updatePositions and EventListener('DOMContentLoaded') code in main.js.
 2.  In main.js, used requestAnimationFrame and throttling code to optimize browser response to scrolling events.
 
 
**Pizza resize on pizza page:**

 1.  In main.js, refactored resizePizzas code to improve CRP performance.
 2.  In main.js, used requestAnimationFrame to resize pizzas in batches.

**Other:**

 1.  In main.js, altered randomPizzaGenerator to append a document fragment containing newly generated pizzas to the DOM.
 2.  Replaced slider in pizza.html with radio button.

## Support

Having issues downloading this project? Please contact me at [cunningham.julie@comcast.net](mailto:cunningham.julie@comcast.net).

## License

This project is unlicensed.  It was developed using images and base code provided by Udacity.


