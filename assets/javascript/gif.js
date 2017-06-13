//
var topics = ["baseball", "hockey",
	"football", "basketball", "soccer",
	"volleyball", "softball", "handball",
	"pickleball", "tennis"
];


$(document).ready(function() {

	function addButton(searchType){
		var button = $("<button data-sports=" + searchType + ">" + searchType + "</button>")
		button.on("click", function() {
			//Grabs info from data-sports attribute.
			var ids = $(this).data("sports");
			console.log(ids);

			var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + ids + "&api_key=dc6zaTOxFJmzC&limit=10";
			//Calls gify api.
			$.ajax({
				url: queryURL,
				method: "GET"
			}).done(function(response) {
				console.log(response);

				for (k = 0; k < response.data.length; k++) {
					//loops through the api data array and puts the gif and the rating on the page.
					var sportsDiv = $("<div>");
					var rating = $("<p>").text("Rated: " + response.data[k].rating);
					var sportsGif = $("<img>");
					sportsGif.attr({
						"src": response.data[k].images.fixed_height_still.url,
						"data-still": response.data[k].images.fixed_height_still.url,
						"data-animate": response.data[k].images.fixed_height.url,
						"data-state": "still",
						"class": "gif"
					});
					sportsDiv.append(sportsGif);
					sportsDiv.append(rating);
					$("#genteratedGifs").prepend(sportsDiv);


					 
				} 
			}); 
		}); //end of #button click function
		$("#buttons").append(button);
	};

	$("#submit").on("click", function add() {
		var userInput = $("#search").val();
		if (userInput !== "") {
			topics.push(userInput);
		}

		addButton(userInput);
		console.log(userInput);
		console.log(topics.length);
		console.log(topics);
	})


	//loops through my array, creates buttons and assigns individual data attributes to each button.
	 //end of i for loop.
	for (i = 0; i < topics.length; i++) {
		var buttons = topics;
		addButton(buttons[i]);
		console.log(buttons);
	}

	$(document).on("click", '.gif', function() {
						//this function should allow me to click on the gifs and play and pause them.
						var $this = $(this)
						var gifStatus = $this.attr("data-state");
						if (gifStatus === "still") {
							$this.attr("src", $this.attr("data-animate"));
							$this.attr("data-state", "animate");
						} else {
							$this.attr("src", $this.attr("data-still"));
							$this.attr("data-state", "still");
						}

					});

	

}); //end of doc. ready function