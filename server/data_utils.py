import json

def get_city_to_airport_map(): # <-- dictionary of cities to airports (key:value)
    with open('./static/locations.json', 'r') as json_file:
        locations = json.load(json_file)
    city_to_airport_map = {l['city']: l['airport'] for l in locations}
    return city_to_airport_map

def get_airport_to_city_map(): # <-- dictionary of airports to cities (key:value)
    with open('./static/locations.json', 'r') as json_file:
        locations = json.load(json_file)
    airport_to_city_map = {l['airport']: l['city'] for l in locations}
    return airport_to_city_map

def get_airport_list(): # <-- returns list of airports
    with open('./static/locations.json', 'r') as json_file:
        data = json.load(json_file)
        return [l['airport'] for l in data['locations']]