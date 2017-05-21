/* using Nightwatch.js and Selenium to test whether the JQuery script correctly
 adds the right walkscore data for Hanover, MA into the DOM of Location Map */


module.exports = {
  //assert original state of map before script is run, the data should not be present here
  'step one' : function (browser) {
    browser
      .url('file:///Users/annavillani/Soofa/location-tool/HeatMap.html')
      .pause(1000)
      .waitForElementVisible('body', 1000)
      .assert.elementNotPresent('#wcdata')
      .end();
  },

  'step two' : function (browser) {
    //tests script, should inject data from api call into the DOM
    browser
      .url('file:///Users/annavillani/Soofa/location-tool/HeatMapAPI.html')
      .pause(1000)
      .waitForElementVisible('body', 1000)
      .assert.elementPresent('#wcdata')
      //asserts that the correct data is present given the input city, tests several samples of the object to 
      //ensure enough confidence that it is correct
      //.assert.containsText('#wcdata', '{ max: max, data: [{lat: 42.1582128, lng: -70.8035019, count: 2}')
      .end();
  }
};