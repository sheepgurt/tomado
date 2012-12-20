$(function() {
	getVideos();

	// initEvents
	$(document).on('click', 'li a', function(e) {
		e.preventDefault(); // prevents browser re-postion after click
		var a = $(e.target);
		embedVideo(a.data("ytid"));
	})

});

function getVideos() {
	var url = "http://api.shuffler.fm/v1/channels/media:youtube?api-key=qvaca06x4ebxt70pglon&callback=?"
	$.getJSON( url, function(data) {
		for (i = 0; i < data.length; i++) {
			var li = $('<li>');
			var a 		= $('<a href="#">');

			var parts = data[i]['object']['stream']['url'].split('/'); //makes array
			var ytid = parts[parts.length - 1]; //-1 because length counts from 1, array's are indexed starting by 0
			a.data('ytid', ytid); // creates <a data-ytid = variable ytid | data attributes by John Resig
			var artist 	= data[i]['object']['metadata']['artist']['name'];
			var title 	= data[i]['object']['metadata']['title'];

			a.html( artist + " – " + title);
			li.append(a);
			$('#playlist').append(li);
		}
	} );
}

function embedVideo(p) {
	var s = '<iframe width="560" height="315" src="http://www.youtube.com/embed/' + p + '?rel=0&autoplay=1" frameborder="0" allowfullscreen></iframe>'

	$('iframe').replaceWith(s);
}