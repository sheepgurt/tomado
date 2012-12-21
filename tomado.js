$(function() {
	getVideos();

	// initEvents
	$(document).on('click', 'li a', function(e) {
		e.preventDefault(); // prevents browser re-postion after click
		var a = $(e.target);
		embedVideo(a.data("ytid"));
		getBio(a.data("name"));
	})

});

function getVideos() {
	var url = "http://api.shuffler.fm/v1/channels/media:youtube?api-key=qvaca06x4ebxt70pglon&callback=?"
	$.getJSON( url, function(data) {
		for (i = 0; i < data.length; i++) {
			var li = $('<li>');
			var a 		= $('<a href="#">');

			var parts = data[i]['object']['stream']['url'].split('/'); //makes array out of the URL, indexing by every / ex: bla/bla/bla ['bla', 'bla', 'bla']
			var ytid = parts[parts.length - 1]; //-1 because length counts from 1, array's are indexed starting by 0
			a.data('ytid', ytid); // creates <a data-ytid = variable ytid | data attributes by John Resig
			var artist 	= data[i]['object']['metadata']['artist']['name']; //filter artist out of the json object
			var title 	= data[i]['object']['metadata']['title']; //filter the title out of the json object
			a.data('name', artist)

			a.html( artist + " – " + title);
			li.append(a);
			$('#playlist').append(li);
		}
	} );
}

function embedVideo(id) {
	var s = '<iframe width="560" height="315" src="http://www.youtube.com/embed/' + id + '?rel=0&autoplay=1" frameborder="0" allowfullscreen></iframe>'

	$('iframe').replaceWith(s);
}

function getBio(name) {
	var url = "http://developer.echonest.com/api/v4/artist/biographies?api_key=WFUMDKXDOYQOGU6GH&format=json&results=1&start=0&license=cc-by-sa&name=" + name

	$.getJSON( url, function(data) { //request url, sends the json file to the parameter called data.
		$('.bio').html(data['response']['biographies'][0]['text']); //.html replaces the existing html in <p class=bio><div> with the 'text' that is in the json file
	});


}