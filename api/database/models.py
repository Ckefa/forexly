from api.database import db


class User(db.Model):
    id = db.Column(db.String(30), unique=True, primary_key=True)
    phone = db.Column(db.String(30), unique=True)
    passwd = db.Column(db.String(30))

