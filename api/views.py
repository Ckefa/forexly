from api import base
from flask import render_template, request


@base.route("/", strict_slashes=False)
def home():
    return render_template("index.html")


@base.route("/pay", methods=["GET", "POST"], strict_slashes=False)
def pay():
    data = request.json
    print(data)
    if request.method == "GET":
        return "Payment confirmed"

    elif request.method == "POST":
        return "Payment Success"
    else:
        return {"msg": "error occured"}
