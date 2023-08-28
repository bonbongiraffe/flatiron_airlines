#!/usr/bin/env python3
from models import User, Reservation, Flight, Airport
from flask_restful import Api, Resource
from flask import request, make_response, session, send_from_directory, send_file
import os
import ipdb
import qrcode
from qrcode.image.pure import PyPNGImage
from reportlab.lib.units import mm
from reportlab.lib.pagesizes import A6
from reportlab.pdfgen import canvas
import string, random

from config import app, api, db

# helper functions
def id_query(class_name, id): # <-- queries db by id given class_name
    try:
        result = class_name.query.filter_by(id=id).first()
        if not result:
            return make_response({'error':'Instance not found'},404)
        return result
    except ValueError as v_error:
        return make_response({'error':[v_error]})

def conf_query(conf): # <-- queries reservations db by confirmation number 
    try:
        result = Reservation.query.filter_by(conf_number=conf).first()
        if not result:
            return make_response({'error':'Instance not found'},404)
        return result
    except ValueError as v_error:
        return make_response({'error':[v_error]})

def conf_generator(): # <-- generates random string of characters of length 5, among uppercase letters and digits
    chars = string.ascii_uppercase + string.digits
    return ''.join(random.choice(chars) for i in range(5))

def boarding_pass(reservation): # <-- generates boarding pass, returns address of boarding pass .pdf file, relative from this directory
    # qrcode
    img = qrcode.make(f'{reservation.conf_number}', image_factory=PyPNGImage)
    img.save(f'./static/qr_codes/{reservation.conf_number}.png')
    qr_code = f'./static/qr_codes/{reservation.conf_number}.png'
    # pdf file -- A6 dimensions: 105 mm x 148 mm 
    boarding_pass = canvas.Canvas(f'./static/boarding_passes/{reservation.conf_number}.pdf', pagesize=A6)
    text_info = boarding_pass.beginText()
    text_info.setTextOrigin(17*mm, 135*mm)
    text_info.setFont('Courier',12)
    text_info.textLines(f'''
        Flatlines

        {reservation.flight.origin} - {reservation.flight.destination}
        Passenger: {reservation.user.first_name} {reservation.user.last_name}
        Flight: {'FL'+"{:03d}".format(reservation.flight.id)}
        Seat: {reservation.seat}
        Confirmation: {reservation.conf_number}
    ''')
    boarding_pass.drawText(text_info)
    boarding_pass.drawImage(qr_code,5,0)
    boarding_pass.save()
    # finish
    return f'./static/boarding_passes/{reservation.conf_number}.pdf'

@app.route('/')
def index():
    return '<h1>Welcome to Unity Airlines!<h1>'

# restful routes
class Airports(Resource):
    def get(self):
        return make_response([a.to_dict() for a in Airport.query.all()],200)

class Flights(Resource):
    def get(self):
        flightDicts = []
        for f in Flight.query.all():
            flightDicts.append({**f.to_dict(),'open_seats':f.open_seats})
        return make_response( flightDicts, 200)

class FlightsById(Resource):
    def get(self,id):
        flight = id_query(Flight,id)
        if hasattr(flight,'error'):
            return flight
        return make_response({**flight.to_dict(),'open_seats':flight.open_seats},200)

class Reservations(Resource):
    def post(self):
        data = request.get_json() 
        try:
            new_reservation = Reservation(
                user_id = data["user_id"],
                flight_id = data["flight_id"],
                seat = data["seat"],
                conf_number = conf_generator()
            )
            db.session.add(new_reservation)
            db.session.commit()
            boarding_pass(new_reservation)
            return make_response(new_reservation.to_dict(),201)
        except ValueError as v_error:
            return make_response({'error':[v_error]},400)

class ReservationsById(Resource):
    def get(self,id):
        reservation = id_query(Reservation,id)
        if hasattr(reservation,'error'):
            return reservation
        print(reservation)
        return make_response(reservation.to_dict(),200)
    
    def delete(self,id):
        reservation = id_query(Reservation,id)
        if hasattr(reservation,'error'):
            return reservation
        db.session.delete(reservation)
        db.session.commit()
        return make_response({'message':'Reservation deleted'},204)
    
    def patch(self,id):
        # print(Reservation,id)
        reservation = id_query(Reservation,id)
        if hasattr(reservation,'error'):
            return reservation
        try:
            data = request.get_json()
            for attr in data:
                setattr(reservation, attr, data[attr])
            db.session.add(reservation)
            db.session.commit()
            return make_response(reservation.to_dict(),200)
        except ValueError as v_error:
            return make_response({'error':[v_error]},400)

api.add_resource(Airports,'/airports')
api.add_resource(Flights,'/flights')
api.add_resource(FlightsById,'/flights/<int:id>')
api.add_resource(Reservations,'/reservations')
api.add_resource(ReservationsById,'/reservations/<int:id>')

# boarding pass
@app.route('/export-boarding-pass/<string:conf>',methods=['GET'])
def export_boarding_pass(conf):
    reservation = Reservation.query.filter_by(conf_number=conf).first()
    if not reservation:
        return make_response({'error':'Reservation not found'},404)
    return send_file(f'./static/boarding_passes/{reservation.conf_number}.pdf',as_attachment=True,mimetype='application/pdf')

# query routes
@app.route('/flight-query',methods=['POST'])
def flight_query():
    data = request.get_json()
    flight = Flight.query.filter_by(origin=data['origin'], destination=data['destination']).first()
    if flight: 
        return make_response({**flight.to_dict(),'open_seats':flight.open_seats},200)
    return make_response({'error':'Flight not found'},404)

@app.route('/reservation-query',methods=['POST'])
def reservation_query():
    data = request.get_json()
    reservation = Reservation.query.filter_by(conf_number=data['confNum'], user_id=data['user_id']).first()
    if reservation:
        return make_response(reservation.to_dict(),200)
    return make_response({'error':'Reservation not found'},404)

# auth routes
@app.route('/login',methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    if not user:
        return make_response({'error':'Incorrect email or password'},400)
    if user.authenticate(data['password']):
        session['user_id'] = user.id
        return make_response(user.to_dict(),200)
    return make_response({'error':'Incorrect email or password'},400)

@app.route('/signup',methods=['POST'])
def signup():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    if user:
        return make_response({'error':'User with email exists already'},400)
    try:
        new_user = User(
            first_name = data['firstName'],
            last_name = data['lastName'],
            email = data['email'],
            password_hash = data['password']
        )
        db.session.add(new_user)
        db.session.commit()
        session['user_id'] = new_user.id
        return make_response(new_user.to_dict(),201)
    except ValueError as v_error:
        return make_response({'error':[v_error]},400)

@app.route('/authorized',methods=['GET'])
def authorized():
    try:
        user = User.query.filter_by(id=session.get('user_id')).first()
        return make_response(user.to_dict(),200)
    except:
        return make_response({'message':'Please login or signup'},404)

@app.route('/logout',methods=['DELETE'])
def logout():
    del session['user_id']
    return make_response({'message':'Logout successful'},204)

@app.route('/static/<path:path>')
def send_static(path):
    return send_from_directory('static',path)

# deprecated methods
    # class Reservations(Resource):
    #     def post(self):
    #         data = request.get_json()
    #         flight = Flight.query.filter_by(origin=data['origin'], destination=data['destination']).first()
    #         if not flight:
    #             return make_response({'error':'Flight not found'},404)  
    #         if data["seat"] not in flight.open_seats:
    #             return make_response({'error':'Seat is already taken'},400)     
    #         try:
    #             new_reservation = Reservation(
    #                 user_id = data["user_id"],
    #                 flight_id = flight.id,
    #                 seat = data["seat"],
    #                 conf_number = conf_generator()
    #             )
    #             db.session.add(new_reservation)
    #             db.session.commit()
    #             return make_response(new_reservation.to_dict(),201)
    #         except ValueError as v_error:
    #             return make_response({'error':[v_error]},400)
    # class ReservationsByConf(Resource):
    # def get(self,conf):
    #     reservation = conf_query(conf)
    #     if hasattr(reservation,'error'):
    #         return reservation
    #     print(reservation)
    #     return make_response(reservation.to_dict(),200)
    
    # def delete(self,conf):
    #     reservation = conf_query(conf)
    #     if hasattr(reservation,'error'):
    #         return reservation
    #     db.session.delete(reservation)
    #     db.session.commit()
    #     return make_response({'message':'Reservation deleted'},204)
    
    # def patch(self,conf):
    #     # print(conf)
    #     reservation = conf_query(conf)
    #     if hasattr(reservation,'error'):
    #         return reservation
    #     try:
    #         data = request.get_json()
    #         # print(data,"from form")
    #         for attr in data:
    #             if attr not in ['origin','destination','id']:
    #                 # print(attr)
    #                 setattr(reservation, attr, data[attr])
    #         if 'origin' in data.keys():
    #             # print("about to search for flights")
    #             flight = Flight.query.filter_by(origin=data['origin'], destination=data['destination']).first()
    #             if not flight:
    #                 return make_response({'error':'Flight not found'},404) 
    #             # print(flight,"flight print")
    #             reservation.flight_id = flight.id 
    #         # print(reservation,"reservation print") 
    #         db.session.add(reservation)
    #         db.session.commit()
    #         return make_response(reservation.to_dict(),200)
    #     except ValueError as v_error:
    #         return make_response({'error':[v_error]},400)

if __name__ == '__main__':
    app.run(port=5555, debug=True)