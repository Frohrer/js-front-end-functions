# js-front-end-functions
A collection of useful functions for front end web dev.

## nav.js
nav.js is a Single Page Application (SPA) page "router" that simply hides or shows different pages with display:none or display:block.
Use it with at least a navigation bar and different content blocks like so:
```html
<a class="nav-link" f-nav="page=something action=click">Something</a>
<a class="nav-link" f-nav="page=somethingelse action=click">Something Else</a>

<div id="something" class="px-3" style="display:none;">
<div id="somethingelse" class="px-3" style="display:none;">
```
