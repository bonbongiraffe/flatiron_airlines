from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.ext.associationproxy import association_proxy

from config import db, bcrypt

new_empty_plane = [
        '1A', '1B', '1C', '1D',
        '2A', '2B', '2C', '2D',
        '3A', '3B', '3C', '3D',
        '4A', '4B', '4C', '4D',
        '5A', '5B', '5C', '5D',
        '6A', '6B', '6C', '6D',
        '7A', '7B', '7C', '7D',
        '8A', '8B', '8C', '8D',
        '9A', '9B', '9C', '9D',
        '10A', '10B', '10C', '10D'
        ]

class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    _password_hash = db.Column(db.String)

    # relationship
    reservations = db.relationship('Reservation', back_populates='user')
    flights = association_proxy('reservations','flight')

    # serialization
    serialize_rules = ('-reservations.user','-flights.user','-_password_hash',)

    #repr
    def __repr__(self):
        return f'<id:{self.id}, first_name:{self.first_name}, last_name:{self.last_name}, email:{self.email}>'

   # validation
    @validates('email')
    def validate_email(self, key, new_email):
        if not '@' in new_email:
            raise ValueError('Email must include @')
        return new_email
    
    @validates('first_name')
    def validate_first_name(self, key, new_first_name):
        if not 1 <= len(new_first_name) <= 15:
            raise ValueError('First name must be between 1 and 15 characters')
        return new_first_name

    @validates('last_name')
    def validate_last_name(self, key, new_last_name):
        if not 1 <= len(new_last_name) <= 15:
            raise ValueError('Last name must be between 1 and 15 characters')
        return new_last_name

   # password hashing and authentication
    @property
    def password_hash(self):
        raise Exception('Password hashes may not be viewed.')

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))

class Reservation(db.Model, SerializerMixin):
    __tablename__ = "reservations"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    flight_id = db.Column(db.Integer, db.ForeignKey('flights.id'))
    seat = db.Column(db.String) # STRETCH-1
    conf_number = db.Column(db.String, unique=True) # STRETCH-2

    # relationship
    user = db.relationship('User', back_populates='reservations')
    flight = db.relationship('Flight', back_populates='reservations')

    # serialization
    serialize_rules = ('-user.reservations','-flight.reservations',)

    # validations
    @validates('seat')
    def validate_seat(self,id,new_seat):
        if new_seat not in new_empty_plane:
            raise ValueError("Invalid seat number")
        return new_seat

    #repr
    def __repr__(self):
        return f'<id:{self.id}, user_id:{self.user_id}, flight_id:{self.flight_id}>'

class Flight(db.Model, SerializerMixin):
    __tablename__ = "flights"

    id = db.Column(db.Integer, primary_key=True)
    origin = db.Column(db.String)
    destination = db.Column(db.String)
    distance = db.Column(db.Float)
    timezone_change = db.Column(db.Integer)
    # departure = db.Column(db.DateTime)
    # arrival = db.Column(db.DateTime)

    # relationship
    reservations = db.relationship('Reservation', back_populates='flight')
    users = association_proxy('reservations','user')

    # serialization
    serialize_rules = ('-reservations.flight','-users.flights',)

    # instance properties / methods
    @property
    def taken_seats(self):
        seats_list = [r.seat for r in self.reservations]
        return seats_list

    @property
    def open_seats(self):
        # empty_plane = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
        seats_list = [s for s in new_empty_plane if s not in self.taken_seats]
        return seats_list

    #repr
    def __repr__(self):
        return f'<id:{self.id}, origin:{self.origin}, destination:{self.destination}>'

class Airport(db.Model, SerializerMixin):
    __tablename__ = "airports"

    id = db.Column(db.Integer, primary_key=True)
    city = db.Column(db.String)
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    id_code = db.Column(db.String)
    utc_offset = db.Column(db.Integer)
    # timezone db.Column(db.String)
    level = db.Column(db.Integer)

    #repr
    def __repr__(self):
        return f'<id:{self.id}, city:{self.city}, id_code:{self.id_code}, latitude:{self.latitude}, longitude:{self.longitude}, utc_offset:{self.utc_offset}, level:{self.level}>'