var myUrl = "http://api.walkscore.com/score?format=json&lat=29.077223&lon=-97.313064&wsapikey=180dea348bd67b12b1d2adce9b1421d9";
//  But if you make it from a browser, then it will work without problem ...

// However to make it work, we are going to use the cors-anywhere free service to bypass this
var proxy = "https://cors-anywhere.herokuapp.com/";

var finalURL = proxy + myUrl;

$( document ).ready(function() {
	var selectCity = $('#selectcity');
	selectCity.append(
	    $('<option></option>').val(city.split(',')[0]).html(city)
	);
	for (i = 0; i < num_x; i++) {
		for (j = 0; j < num_y; j++) {
			lat = yvals[j];
			lng = xvals[i];
			myURL = "http://api.walkscore.com/score?format=json&lat=" + lat + "&lon=" + lng + "&wsapikey=180dea348bd67b12b1d2adce9b1421d9";
			finalURL = proxy + myURL;
			$.getJSON(finalURL, function( data ) {
	    		//alert(data.walkscore);
	    	});
	    }
	}
});