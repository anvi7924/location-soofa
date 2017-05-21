var city = "Hanover, MA";
var lat = 42.1162217;
var lng = -70.8476708;
var num_x = 16;
var num_y = 16;
var xvals = [ -70.899861, -70.89343706, -70.88701312, -70.88058918, -70.87416524, -70.8677413, -70.86131736, -70.85489342, -70.84846948, -70.84204554, -70.8356216, -70.82919766, -70.82277372, -70.81634978, -70.80992584, -70.8035019 ];
var yvals = [ 42.0856008, 42.0904416, 42.0952824, 42.1001232, 42.104964, 42.1098048, 42.1146456, 42.1194864, 42.1243272, 42.129168, 42.1340088, 42.1388496, 42.1436904, 42.1485312, 42.153372, 42.1582128 ];
var northeastcoord = [42.1582128,-70.8035019]; 
var southwestcoord = [42.0856008,-70.899861]; 
var myUrl = "http://api.walkscore.com/score?format=json&lat=" + lat + "&lon=" + lng + "&wsapikey=180dea348bd67b12b1d2adce9b1421d9";
var proxy = "https://cors-anywhere.herokuapp.com/";
var finalURL = proxy + myUrl;
var walkscore;


$( document ).ready(function() {
	var selectCity = $('#selectcity');
	selectCity.append(
	    $('<option></option>').val(city.split(',')[0]).html(city)
	);
	output = "{ max: max, data: [";
	for (i = 0; i < num_x; i++) {
		for (j = 0; j < num_y; j++) {
			lat = yvals[j];
			lng = xvals[i];
			myURL = "http://api.walkscore.com/score?format=json&lat=" + lat + "&lon=" + lng + "&wsapikey=180dea348bd67b12b1d2adce9b1421d9";
			finalURL = proxy + myURL;
			$.getJSON(finalURL, function( data ) {
		    	output += "{lat: " + lat +  ", lng: " + lng + ", count: " + data.walkscore.toString() + "},";
		    	// output = JSON.parse(output);
		    	$("#wcdata").remove();
			    $("#layerselector").append("<div id='wcdata'>" + output + "</div>");
			   
		    });
		}
    }
});
	

