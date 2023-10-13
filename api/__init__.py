from flask import Blueprint


base = Blueprint("base", __name__)


from api import views
