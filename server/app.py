#!/usr/bin/env python3
from models import db, User, Reservation, Flight
from flask_restful import Api, Resource
from flask import request, make_response, session, send_from_directory
import os

from config import app, api, db

@app.route('/')
def index:
    return '<h1>Welcome to Unity Airlines!<h1>'

class User(Resource):
    pass

class Reservation(Resource):
    pass

api.add_resource(User,'/user')
api.add_resource(Reservation,'/reservation')