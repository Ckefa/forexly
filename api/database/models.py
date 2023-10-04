from api.database import db
from uuid import uuid4


class User(db.Model):
    id = db.Column(db.String(30), unique=True, primary_key=True, nullable=False)
    user = db.Column(db.String(30))
    phone = db.Column(db.String(30), unique=True)
    passwd = db.Column(db.String(30))
    bal = db.Column(db.Float)

    def __init__(self):
        self.id = str(uuid4())
        self.bal = 00.00

