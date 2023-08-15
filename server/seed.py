from models import db, User, Reservation, Flight
from app import app

airports = ['EWR','LGA','DEN','HKG','MUC']

def clear_database():
    with app.app_context():
        print('Deleting flights...')
        Flight.query.delete()
        db.session.commit()

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
    clear_database()
    create_flights()
    print('Bon voyage!')