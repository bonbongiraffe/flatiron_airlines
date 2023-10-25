from models import db, User, Reservation, Flight, Airport
from datetime import datetime, date, time, timedelta
from calendar import monthrange
from geopy.distance import distance
from copy import deepcopy
from app import app
import csv
import os

airport_level_dict = {}
level_dict = {
    1:[time(8,0),time(14,0),time(20,0)],
    2:[time(10,0),time(16,0)],
    3:[time(9,0)]
    }

def flight_time(input_distance):
    # assumptions:
    # 1) take-off / landing time is ~1 hour
    # 2) 804 kmh (or 500 mph)
    # 3) input distance is a straight-line distance calculated with great-circle formula
    total_time = input_distance/804 + 1
    hours = int(total_time // 1)
    minutes = int(60 * (total_time % 1))
    return timedelta(hours=hours,minutes=minutes)

def create_calendar():
    calendar = []
    month = datetime.now().month + 1
    year = datetime.now().year
    first_day, days = monthrange(year,month) #first_day: range 0-6, Monday-Sunday / days: number of days in month
    for day in range(1,days+1):
        d = date(year,month,day)
        calendar.append(d)
    return calendar

def schedule_flights():
    print("Scheduling flights...")
    with open(f'./routes.csv', newline='', encoding='utf-8') as csvfile:
        rows = [row for row in csv.reader(csvfile, delimiter=',', quotechar='"')] # <-- csv to rows
        #rows to db
        with app.app_context():
            flights = []
            for i in range(1,len(rows)): # <-- for each route
                # flights_by_route = []
                if not rows[i]: #skip empty rows
                    continue
                # print(rows[i])
                #calculate timedelta objects
                tz_change_td = timedelta(hours=int(rows[i][3]))
                f_time_td = flight_time(float(rows[i][2]))
                #initialize Flight with route information
                route = Flight(
                    origin=rows[i][0],
                    destination=rows[i][1],
                    distance=float(rows[i][2]),
                    timezone_change=int(rows[i][3]), # <-- store timedelta as time because sqlite does not support timedelta
                    flight_time=(datetime.min + f_time_td).time(), # <-- store timedelta as time because sqlite does not support timedelta
                    arrival=None,
                    departure=None
                )

                for day in calendar: # <-- for each day of the month
                    # print(day)
                    schedule = level_dict[airport_level_dict[route.origin]]
                    for scheduled_time in schedule: # <-- for each scheduled time
                        # print(scheduled_time)
                        # print(f'outgoing flight from {route.origin} to {route.destination} at {scheduled_time}')
                        new_flight = deepcopy(route)
                        new_flight.departure = datetime.combine(day,scheduled_time)
                        new_flight.arrival = new_flight.departure + tz_change_td + f_time_td
                        # print(new_flight)
                        flights.append(new_flight)
            db.session.add_all(flights)
            db.session.commit()

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

def create_airports():
    print('Getting airports from locations.csv file...')
    with app.app_context():
        with open(f'./locations.csv', newline='', encoding='utf-8') as csvfile:
            rows = [row for row in csv.reader(csvfile, delimiter=',', quotechar='"')] # <-- csv to rows
            #rows to db
            airports = []
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
                airports.append(airport)
            db.session.add_all(airports)
            db.session.commit()
            # print(airports)
    # return airports

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

def create_routes():
    print('Writing routes to routes.csv file...')    
    with app.app_context():
        airports = Airport.query.all()
        with open(f'./routes.csv', 'w', newline='', encoding='utf-8') as csvfile:
            writer = csv.writer(csvfile, delimiter=',', quotechar='"')
            writer.writerow(['origin','destination','distance','timezone_change'])
            routes = []
            for x in range(0,len(airports)):
                for y in range(0,len(airports)):
                    if x != y:
                        airport1 = airports[x]
                        airport2 = airports[y]
                        flight_distance = round(distance((airport1.latitude,airport1.longitude),(airport2.latitude,airport2.longitude)).km,2)
                        writer.writerow([
                            airport1.id_code,
                            airport2.id_code,
                            flight_distance,
                            airport2.utc_offset - airport1.utc_offset
                        ])


if __name__ == '__main__':
    calendar = create_calendar()
    clear_airports()
    create_airports()
    clear_flights()
    create_routes()
    schedule_flights()
    clear_reservations()
    print('Bon voyage!')