from flask import request
from api.users import users


@users.route("/register", methods=["GET", "POST"], strict_slashes=False)
def register():
    if request.method == "POST":
        print(request.json())

    return "user registerd"


@users.route("/login", strict_slashes=False)
def login():
    return "User logged in"
