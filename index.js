// imports
import Autocomplete from './Autocomplete';
import usStates from './us-states';
//import keys from './keys.json';
import './main.css';

// US States
let data = usStates.map(state => ({
  text: state.name,
  value: state.abbreviation
}));

new Autocomplete(document.getElementById('state'), {
  data,
  onSelect: (stateCode) => {
    console.log('selected state:', stateCode);
  },
});

new Autocomplete(document.getElementById('gh-user'), 
	{
  onSelect: (ghUserId) => {
    console.log('selected github user id:', ghUserId);
  },
});


// ====== //

// starting to work on jQuery

$(document).on("click", "ul.results", function(event){
	
		event.preventDefault();

		$(this).find(">:first-child").addClass("jqhover");

		let current = $(this).find(">:first-child");

		current.addClass("jqhover");

		// console.log( $(this).attr("data-number"));
		// console.log( $(this).text());
	});

// add event listener to whole window
document.addEventListener("keydown", function(e){

	// capture value of keycode when pressed 
	// only keydown allows arrow key capture
	var key = e.which;
	// console.log(key)

	// if ($("li").hasClass("jqhover")){
		// console.log("true")

		// set current value to <li> with jqhover class
		let current = $("li.jqhover");
		// set currentNum to the value of data-number attribute (index)
		let currentNum = current.attr("data-number");
		//console.log(currentNum);

		//Capture down arrow
		if (key == 40){

			// set next to sibling element
			let next = current.next();
			// set nextNum to data-number of sibling element
			let nextNum = next.attr("data-number");
			// if nextNum is defined and its data-number value is greater than currentNum (bc ascending order that means it exists)
			if (nextNum && nextNum > currentNum){
				// everything shifts up
				current.removeClass("jqhover");
				next.addClass("jqhover");
			}

		};

		//Need to capture up arrow

});




