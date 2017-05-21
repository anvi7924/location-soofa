# Location Tool

Solution to make in-browser API requests to be able to dynamically load new cities. Solution is tested using the Walkscore API.

# Usage

## Step 1

Run python script to input a city, and set up the coordinate variables for that city using googlemaps.geocode. It saves the variables to a file DataFiles/SoofaData[CITY].js.

  python3 CreateMaps.py
  
## Step 2

Concatenate coordinate variables with the javascript file (apicall.js) that contains jQuery code to make the API call and save data to the DOM. This script is embedded into the HeatMapAPI.html to run whenever the page is loaded. The script adds the new city to the option list, queries the walkscore data for that city, and puts the data in the DOM.

  cat DataFiles/SoofaData[CITY].js apicall.js > jqscript.js
 
## Step 3

Load HeatMapAPI.html in browser to the see the walkscore data. Look in option list to test out loading new cities. 

# Test

## Install Nightwatch and Selenium

  npm i -g nightwatch
  
  selenium driver is included in the repo and configured in nightwatch.json
  
## Running Test

   nightwatch test.js
   
# Debugging

If the error "Testing if element <#wcdata> is present.  - expected "present" but got: "not present" in step two, it's most likely because the API key has exceeded the max limit of daily calls (5000/day under free tier). Trying a different key will likely fix the problem.

## Walkcore API KEYs

180dea348bd67b12b1d2adce9b1421d9

f0bca1eef985b837c171e342411aa3d6


