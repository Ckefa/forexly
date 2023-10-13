from api import base
from flask import render_template


@base.route("/", strict_slashes=False)
def home():
    return render_template("index.html")
