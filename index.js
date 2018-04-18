// imports
import Autocomplete from './Autocomplete';
import usStates from './us-states';
import keys from './keys.json';
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

// OMDB
// const OMDB = {
// 	"base_url": `http://www.omdbapi.com/?s=${query}&apikey=${keys.OMDB.apiKey}`,
// 	"apiKey": keys.OMDB.apiKey
// }

// const Github = {
// 	"base_url": `https://api.github.com/search/users?q=${query}&per_page=${numOfResults}`
// }

// // OMDB Titles
// new Autocomplete(document.getElementById('gh-user'), {
//   onSelect: (ghUserId) => {
//     console.log('selected github user id:', ghUserId);
//   },
// });



// ====== //

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

		//Up arrow
		// if (key == 38){

		// 	let current = $("li.jqhover");

		// 	let next = current.next();

		// }


	// }else{
		
	// 	console.log("false")


	// }


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



