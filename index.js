// packages
const axios = require('axios');

// imports
import Autocomplete from './Autocomplete';
import usStates from './us-states';
import './main.css';


// US States
const data = usStates.map(state => ({
  text: state.name,
  value: state.abbreviation
}));
new Autocomplete(document.getElementById('state'), {
  data,
  onSelect: (stateCode) => {
    console.log('selected state:', stateCode);
  },
});


// Github Users
new Autocomplete(document.getElementById('gh-user'), {
  onSelect: (ghUserId) => {
    console.log('selected github user id:', ghUserId);
  },
});


// ====== //

$(document).on("click", "ul.results", function(event){
	
		event.preventDefault();

		$(this).find(">:first-child").addClass("jqhover");

		let current = $(this).find(">:first-child");

		current.addClass("jqhover");

		// console.log( $(this).attr("data-number"));
		// console.log( $(this).text());
	});

document.addEventListener("keydown", function(e){

	var key = e.which

	console.log(key)


});






// $("li.result").on("keypress", function(e) {
  
// 	console.log($(this).attr("data-number"));

//   if(e.which == 40 || e.which == 38) {

//     const current = $(this).attr("data-number");
//     console.log(current);

    // if(current === 0) {
    // 	$(this).css("background", "#eee");
    //   // //menu = openNavbar.children(".dropdown-menu");
    //   // $(this).css("outline", "blue"); // remove the pesky blue outline
    //   // hovered = menu.find("li:hover");
    //   // if(hovered[0]) {
    //   //   if(e.which == 40) hovered.next().children().focus();
    //   //   else hovered.prev().children().focus();
    //   } else $("ul.result").find("li").first().children().focus();
//   }
// });



