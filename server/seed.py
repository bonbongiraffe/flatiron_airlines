from models import db, User, Reservation, Flight, Airport
from datetime import date, datetime, time
from calendar import monthrange
from geopy.distance import distance
from app import app
import csv
import os

airport_level_dict = {}
level_dict = {
    1:[time(8,0),time(14,0),time(20,0)],
    2:[time(10,0),time(16,0)],
    3:[time(9,0)]
    }

def flight_time(distance):
    # assumptions:
    # 1) take-off / landing time is ~1 hour
    # 2) 804 kmh (or 500 mph)
    # 3) input distance is a straight-line distance calculated with great-circle formula
    total_time = distance/804 + 1
    hours = int(total_time // 1)
    minutes = int(60 * (total_time % 1))
    return time(hours,minutes)

def create_calendar():
    calendar = []
    month = datetime.now().month + 1
    year = datetime.now().year
    first_day, days = monthrange(year,month) #first_day: range 0-6, Monday-Sunday / days: number of days in month
    for day in range(1,days+1):
        d = date(year,month,day)
        calendar.append(d)
    return calendar

def schedule_flights(route): #assumes function called within app.app_context
    print("Scheduling flights...")
    for day in calendar:
        for flight in routes:
            schedule = level_dict[airport_level_dict(flight.origin.id_code)]
            for scheduled_time in schedule:
                print(f'outgoing flight from {flight.origin.city} at {scheduled_time}')
            # d_time = daytime.combine(day,)
            # flight.departure = 
            # flight.arrival = 0
    # output = {flight_time: None, departure: None, arrival: None}

def clear_files(directory_path):
    for filename in os.listdir(directory_path):
        file_path = os.path.join(directory_path,filename)
        try:
            if os.path.isfile(file_path) and filename != '.gitkeep':
                os.unlink(file_path)
        except Exception as e:
            print(f'Error deleting {file_path}: {e}')

def clear_airports():
    with app.app_context():
        print('Deleting airports...')
        Airport.query.delete()
        db.session.commit()

def get_airports():
    print('Getting airports...')
    with app.app_context():
        with open(f'./locations.csv', newline='', encoding='utf-8') as csvfile:
            rows = [row for row in csv.reader(csvfile, delimiter=',', quotechar='"')] # <-- csv to rows
            #rows to db
            airports = []
            # airportsList = []
            for i in range(1,len(rows)):
                airport = Airport(
                    id_code = rows[i][0],
                    city = rows[i][1],
                    latitude = rows[i][2],
                    longitude = rows[i][3],
                    utc_offset = rows[i][4],
                    level = rows[i][5]
                )
                airport_level_dict[rows[i][0]] = int(rows[i][5])
                # airportsList.append(rows[i][0])
                airports.append(airport)
            db.session.add_all(airports)
            db.session.commit()
            print(airports)
    return airports
    # return airportsList

def clear_flights():
    with app.app_context():
        print('Deleting flights...')
        Flight.query.delete()
        db.session.commit()

def clear_reservations():
    with app.app_context():
        print('Deleting reservations...')
        Reservation.query.delete()
        db.session.commit()
    print('Deleting qr code png files...')
    clear_files('./static/qr_codes')
    print('Deleting boarding pass pdf files...')
    clear_files('./static/boarding_passes')

def create_routes(): #assumes function called within app.app_context
    print('Creating routes...')
    routes = []
    with app.app_context():
        # print(airports)
        for x in range(0,len(airports)):
            for y in range(0,len(airports)):
                if x != y:
                    airport1 = airports[x]
                    airport2 = airports[y]
                    # print(airport1,airport2)
                    # print(airport1.latitude,airport1.longitude,airport2.latitude,airport2.longitude)
                    flight_distance = round(distance((airport1.latitude,airport1.longitude),(airport2.latitude,airport2.longitude)).km,2)
                    route  = Flight(
                        origin = airport1.id_code,
                        destination = airport2.id_code,
                        distance = flight_distance,
                        timezone_change = airport2.utc_offset - airport1.utc_offset,
                        flight_time = flight_time(flight_distance),
                        departure = None,
                        arrival = None
                    )
                    routes.append(route)
                    # db.session.add(route )
                    # db.session.commit()
    return routes

if __name__ == '__main__':
    # print(flight_time(300))
    calendar = create_calendar()
    # print(calendar)
    clear_airports()
    airports = get_airports()
    # print(airports)
    # print(airport_level_dict)
    clear_flights()
    # with app.app_context():
    routes = create_routes()
    print(routes)
    # schedule_flights()
    # clear_reservations()
    # print('Bon voyage!')