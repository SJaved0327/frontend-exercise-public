# Solution Docs

<!-- You can include documentation, additional setup instructions, notes etc. here -->
## Comment

This was a lot of fun to work on and think about. There was a lot of independent learning involved, especially in how to engage a take-home challenge and structure my approach. I appreciate the opportunity to work on this coding challenge! Thank you!

## Notes

Refactoring:
* I wanted to break down the code into modules for better reusability. I refactored the Autocomplete code to remove class references and built a constructor function instead. I defined methods by extending the prototype, keeping the functionality of Autocomplete intact.
* For handling an HTTP endpoint as a data source, I created a URL constructor function where details of the HTTP request and needed information on how to parse the API response were passed through. I used OMDB as an HTTP endpoint to test this and retrieved a free key to do so.

* With more time: I would like to simplify the code further, perhaps not having so many methods defined on the prototype but rather compile the constructor with helper functions. Autocomplete is a robust component and would benefit from being broken down further by creating new instances of DropDown, ul, li, etc that would be nested within each instance of Autocomplete.

Additional Setup: 
* Next step was to pass arguments for the URL constructor through the options object of Autocomplete. This.options.url object would hold data needed for the creation of a new instance of URL (ie key, baseURL, dataIndex, text, value). Right now the component is hard-wired to only hit the github endpoint because these arguments are not being passed through by the user.

>For example: 
>
>const URL = function(url){
> ...
> this.baseURL = url.baseURL;
> this.dataIndex = url.dataIndex;
> etc.
> }

* I lightly started on the jQuery needed to highlight the selected li.result tag. As of now, when the dropdown is clicked on, the first li.result child of ul.results highlights and the user can then navigate down. 
* I need to add another conditional statement for capturing the value of the up arrow key so that the user can navigate up within the dropdown.
* I would ideally build a constructor function for each li.result to build functionality into each. That way when the dropdown is dynamically created, each li would be a new instance of li. There would be built-in functionality to toggle the jqhover class (controls whether the background of an element is highlighted or not) and to capture the enter key input for selection.

## Resources

Object composition: 

	* Article on Object Composition
			https://medium.com/code-monkey/object-composition-in-javascript-2f9b9077b5e6 

	* Article about class v. prototypal inheritance
			https://medium.com/javascript-scene/master-the-javascript-interview-what-s-the-difference-between-class-prototypal-inheritance-e4cd0a7562e9 

	* Article on when not to use fat arrow functions
			https://dmitripavlutin.com/when-not-to-use-arrow-functions-in-javascript/

 	* Noting that keydown is needed to capture value of arrow keys
 			https://stackoverflow.com/questions/5597060/detecting-arrow-key-presses-in-javascript

Documentation

	* OMDB Docs
			http://www.omdbapi.com/






