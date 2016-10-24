$(document).ready(function(){

	$("#btn_gen").click(function(){
		$("#result").text("");
		// clear result div

		$.getJSON( "syllables.json", function( data ) {

			var last_syl = "";

			// function for getting a random item form an array
			function get_syllable(syls) {
				var new_rand_syl;
				do {
					var rand_syl = Math.floor(Math.random()*syls.length);
					new_rand_syl = syls[rand_syl];
					// gen syl from the array
				} while (new_rand_syl == last_syl) // do not duplicate syllables
				last_syl = new_rand_syl;
				
				return new_rand_syl;
				// return the syllable
			};

			var gen="";

			//first syllable: get random syllable from either list
			var which_list = Math.floor(Math.random()*2);
			if (which_list == 0) { // get number from list anyfix
				var new_syl = get_syllable(data.anyfixes);
				gen += new_syl;
			} else { // get number from list prefix
				var new_syl = get_syllable(data.prefixes);
				gen += new_syl;
			}

			// get number of syllables in town: 2-4
			var num_syls=Math.floor(Math.random()*3 + 1);
			var num_syls=3;
			// generate each of the next random syllables
			for(var i = 0;i < num_syls; i++) {
				//next syllables: get random number from anyfix list
				var new_syl = get_syllable(data.anyfixes);
				gen += new_syl;
				log_gen(gen);
			}
			// add thing to the list

			function log_gen(new_gen) {
				$( "#result" ).append( "<li>"+ new_gen +"</li>" );
			}

		});

	});

	$('#result').on('click', 'li', function() {
		var saved_text = $( this ).text() ;
		console.log("saved " + saved_text);

		// append the thing to the saved list
		$( "#saved" ).append( "<li>"+ saved_text +"</li>" );
	});

});
