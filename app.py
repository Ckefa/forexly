#!/usr/bin/env python3
from flask import Flask, render_template
from flask_cors import CORS
from api.database import db, Package
from api.users import users
from uuid import uuid4

app = Flask(
    __name__, template_folder="front_end/dist", static_folder="front_end/dist/assets"
)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
app.secret_key = str(uuid4())
db.init_app(app)
app.register_blueprint(users)
CORS(app)


@app.route("/", strict_slashes=False)
def home():
    return render_template("index.html")


packages = [
    {"name": "lite", "price": 500, "description": "package a", "income": 25},
    {"name": "silver", "price": 800, "description": "package b", "income": 35},
    {"name": "bronze", "price": 1000, "description": "package c", "income": 45},
    {"name": "gold", "price": 1500, "description": "package d", "income": 55},
    {"name": "diamond", "price": 2000, "description": "package e", "income": 70},
]


with app.app_context():
    db.create_all()
    for package in packages:
        new_pack = Package(**package)
        if not Package.query.filter_by(name=package["name"]).first():
            db.session.add(new_pack)
            db.session.commit()
            print(f"[Package {package['name']}] added successfull")
        else:
            print(f"[Package {package['name']} already exists!")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=80)
