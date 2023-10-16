#!/usr/bin/env python3

"""This is the user module bluprint to manage user actions"""


from flask import Blueprint


print("Initializing Users Module....")
users = Blueprint("users", __name__)

from api.users import authenticate, subscribe, recharge
