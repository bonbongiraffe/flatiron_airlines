from models import db, User, Reservation, Flight, Airport
from app import app
import csv
import os

def clear_files(directory_path):
    for filename in os.listdir(directory_path):
        file_path = os.path.join(directory_path,filename)
        try:
            if os.path.isfile(file_path):
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
            airportsList = []
            for i in range(1,len(rows)):
                airport = Airport(
                    id_code = rows[i][0],
                    city = rows[i][1]
                )
                airportsList.append(rows[i][0])
                airports.append(airport)
            db.session.add_all(airports)
            db.session.commit()
    return airportsList

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

def create_flights():
    print('Creating flights...')
    with app.app_context():
        for x in range(0,len(airports)):
            for y in range(0,len(airports)):
                if x != y:
                    new_flight = Flight(
                        origin = airports[x],
                        destination = airports[y]
                    )
                    db.session.add(new_flight)
                    db.session.commit()

if __name__ == '__main__':
    clear_airports()
    airports = get_airports()
    clear_flights()
    create_flights()
    clear_reservations()
    print('Bon voyage!')