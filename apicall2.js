var myUrl = "http://api.walkscore.com/score?format=json&lat=29.077223&lon=-97.313064&wsapikey=180dea348bd67b12b1d2adce9b1421d9";
//  But if you make it from a browser, then it will work without problem ...

// However to make it work, we are going to use the cors-anywhere free service to bypass this
var proxy = "https://cors-anywhere.herokuapp.com/";

var finalURL = proxy + myUrl;

$.getJSON(finalURL, function( data ) {
    alert(data.walkscore);
});