# SCROLLIFY
----------------

#### Simple scrollify helper for DOM elements
----------------

## Installation
Add scrollify.js to your project.

## Basic usage
* grab DOM element, for example <code>document.querySelector('SELECTOR_NAME')</code>
* call <code>scrollify()</code> on DOM element to start scrolling text
    * 1st argument - alter the scrollify behaviour by passing the first argument:
        * translateX to transform text horizontally (default value)
        * translateY to transform text vertically
    * 2nd argument - change childSelector (defualt value is: '.inner')
* call <code>stopScrollify()</code> on DOM element to stop scrolling text
	* 1st argument - change childSelector (default value is: '.inner')

## Notes
* It is first version of the helper (draft version)
* <font color="red">Thanks Leszek with regexpes</font> ;)