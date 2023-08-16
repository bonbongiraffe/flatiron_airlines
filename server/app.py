#!/usr/bin/env python3
from models import db, User, Reservation, Flight
from flask_restful import Api, Resource
from flask import request, make_response, session, send_from_directory
import os

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

@app.route('/')
def index():
    return '<h1>Welcome to Unity Airlines!<h1>'

# restful routes
class Reservation(Resource):
    def post(self):
        data = request.get_json()
        flight = Flight.query.filter_by(origin=data['origin'], destination=data['destination']).first()
        if not flight:
            return make_response({'error':'Flight not found'},404)       
        try:
            new_reservation = Reservation(
                user_id = data[user_id],
                flight_id = flight.id
            )
            db.session.add(new_reservation)
            db.session.commit()
            return make_response(new_reservation.to_dict(),201)
        except ValueError as v_error:
            return make_response({'error':[v_error]},400)

class ReservationById(Resource):
    def get(self,id):
        reservation = id_query(Reservation,id)
        if reservation.get('error'):
            return reservation
        return make_response(reservation.to_dict(),200)
    
    def delete(self,id):
        reservation = id_query(Reservation,id)
        if reservation.get('error'):
            return reservation
        db.session.delete(reservation)
        db.session.commit()
        return make_response({'message':'Reservation deleted'},204)
    
    def patch(self,id):
        reservation = id_query(Reservation,id)
        if reservation.get('error'):
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

api.add_resource(Reservation,'/reservation')
api.add_resource(ReservationById,'/reservation/<int:id>')

# auth routes
@app.route('/login',methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    if not user:
        return make_response({'error':'Incorrect email or password'},400)
    if user.authenticate(data['password']):
        session['user_id'] = user.id
        return make_response(user.to_dict,200)
    return make_response({'error':'Incorrect email or password'},400)

@app.route('/signup',methods=['POST'])
def signup():
    data = request.get_json()
    try:
        new_user = User(
            first_name = data['first_name'],
            last_name = data['last_name'],
            email = data['email'],
            _password_hash = data['password']
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

if __name__ == '__main__':
    app.run(port=5555, debug=True)