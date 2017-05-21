################################## Python Script to Create City Heatmaps ############################################
import numpy as np
from datetime import datetime
import time
from functools import reduce
import sys

import os
from os.path import join, dirname
from dotenv import load_dotenv
dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)


start = time.time()

while True:
    city = input("Enter location in city, state format (NewHaven, CT): ")
    if len(city.split()) != 2:
        print("Sorry, enter the city as one name please")
        continue
    else:
        break


######################################################################## Google API Set Up ################################################################

import googlemaps

google_API_KEY = ' '

google_API_KEY = os.environ.get('google_API_KEY')

gmaps = googlemaps.Client(key = google_API_KEY)	


# ######################################################################## Walscore API Set Up ################################################################

# import walkscore

# walkscore_api = ' '

# walkscore_api = os.environ.get('walkscore_api') 

# walkscore = walkscore.WalkScore(walkscore_api)




####### Calculates distance between two coordinates ##########
def CalculateDistance(coord1, coord2): # coord = {'lat' : latval, 'lng': longval}	
	
	Radius_miles = 3961
	
	lat1 = coord1['lat']
	lon1 = coord1['lng']
	
	lat2 = coord2['lat']
	lon2 = coord2['lng']
	
	lat1 = np.radians(lat1) 
	lon1 = np.radians(lon1)
	lat2 = np.radians(lat2)
	lon2 = np.radians(lon2)
	
	dlat = lat2 - lat1
	dlon = lon2 - lon1
	
	a = np.sin(dlat/2.0)**2 + np.cos(lat1) * np.cos(lat2) * np.sin(dlon/2.0)**2
	c = 2*np.arctan2(a**(.5), (1-a)**(.5))
	dm = c*Radius_miles
	
	return dm*1609.34  #Returns distance in meters 


######## Set up coordinate grid ###########################

sampling_rate = 500      # Sample every 500 meters in both x and y directions
city_geocode = gmaps.geocode(city)	 # Get city bounding coordinates
northeast_coord = city_geocode[0]['geometry']['bounds']['northeast']	   # NorthEast coordinates 
southwest_coord = city_geocode[0]['geometry']['bounds']['southwest']	   # SouthWest coordinates
center_coord = city_geocode[0]['geometry']['location']
southeast_coord = {'lat': southwest_coord['lat'], 'lng': northeast_coord['lng']}
xdist = CalculateDistance(southwest_coord, southeast_coord)	   # x distance of bounding box in meters
ydist = CalculateDistance(northeast_coord, southeast_coord)	   # y distance of bounding box in meters 
num_xsamples = int(np.round(xdist/sampling_rate))
num_ysamples = int(np.round(ydist/sampling_rate))
xvals = np.linspace(southwest_coord['lng'], southeast_coord['lng'], num_xsamples)   # x values (longitudes) that will be sampled
yvals = np.linspace(southeast_coord['lat'], northeast_coord['lat'], num_ysamples)   # y vals (latitudes) that will be sampled
# print('Estimated Time to finish: %f Minutes' %(num_xsamples*num_ysamples*.17))    # Prints estimated time till completion, not very accurate


############ Save the heatmap data ############

print('Writing Data into File')
try:  # If DataFiles is a valid subfolder
	f = open('DataFiles/SoofaData' + city.split(",")[0] + '.js', "w")
	f.write("var city = \"" + city + "\";\n")
	f.write('var lat = ' + str(center_coord['lat']) + ';\n')
	f.write('var lng = ' + str(center_coord['lng']) + ';\n')
	f.write('var num_x = ' + str(num_xsamples) + ';\n')
	f.write('var num_y = ' + str(num_ysamples) + ';\n')
	f.write('var xvals = [ ' + str(xvals[0]))
	iterxvals = iter(xvals)
	next(iterxvals)
	for x in iterxvals:
		f.write(', ' + str(x))
	f.write(' ];\n')
	f.write('var yvals = [ ' + str(yvals[0]))
	iteryvals = iter(yvals)
	next(iteryvals)
	for y in iteryvals:
	 	f.write(', ' + str(y))
	f.write(' ];\n')
	f.write('var northeastcoord = [' + str(northeast_coord['lat']) + ',' + str(northeast_coord['lng']) + ']; \n')
	f.write('var southwestcoord = [' + str(southwest_coord['lat']) +  ',' + str(southwest_coord['lng']) + ']; \n')
	f.close()
	print('Writing Finished!')
	print('Minutes taken: %f' %((time.time() - start)/60.0))
except:
	f = open('SoofaData' + city.split(",")[0] + '.js', "w")
	f.write(outputwalkscore + '\n')
	f.write('var lat = ' + str(center_coord['lat']) + '\n')
	f.write('var lng = ' + str(center_coord['lng']) + '\n')
	f.write('var AllScores = {"googlefood": googlefoodData, "googlecommunity": googlecommunityData, "googlebigshops": googlebigshopsData, "googlesmallshops": googlesmallshopsData, "googletourist": googletouristData, "googletransit": googletransitData, "yelpfood": yelpfoodData, "yelpshopping": yelpshoppingData, "yelpcommunity": yelpcommunityData, "walkscore": walkscoreData, "average": averageData};' + '\n')
	f.write('var northeastcoord = [' + str(northeast_coord['lat']) + ',' + str(northeast_coord['lng']) + ']; \n')
	f.write('var southwestcoord = [' + str(southwest_coord['lat']) +  ',' + str(southwest_coord['lng']) + ']; \n')
	f.close()
	print('Writing Finished!')
	print('Minutes taken: %f' %((time.time() - start)/60.0))


