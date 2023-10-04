#!/usr/bin/env python3
from flask import Flask, render_template
from flask_cors import CORS
from api.database import db
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


with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=80)
