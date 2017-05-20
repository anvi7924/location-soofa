var lat = 29.0938652;
var lng = -97.28915680000001;
var num_x = 10;
var num_y = 9;
var xval = [ -97.313064, -97.307615, -97.302166, -97.296717, -97.291268, -97.285819, -97.28037, -97.274921, -97.269472, -97.264023 ];
var yvals = [ 29.077223, 29.082313, 29.087403, 29.092493, 29.097583, 29.102673, 29.107763, 29.112853, 29.117943 ];
var northeastcoord = [29.117943,-97.264023]; 
var southwestcoord = [29.077223,-97.313064]; 
var myUrl = "http://api.walkscore.com/score?format=json&lat=29.077223&lon=-97.313064&wsapikey=180dea348bd67b12b1d2adce9b1421d9";
//  But if you make it from a browser, then it will work without problem ...

// However to make it work, we are going to use the cors-anywhere free service to bypass this
var proxy = "https://cors-anywhere.herokuapp.com/";

var finalURL = proxy + myUrl;

$( document ).ready(function() {
	$.getJSON(finalURL, function( data ) {
	    alert(data.walkscore);
	});
});