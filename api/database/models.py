from api.database import db
from uuid import uuid4
from datetime import datetime


class User(db.Model):
    id = db.Column(
        db.String(36),
        unique=True,
        primary_key=True,
    )
    user = db.Column(db.String(30))
    phone = db.Column(db.String(30), unique=True)
    passwd = db.Column(db.String(30))
    bal = db.Column(db.Float)
    subs = db.relationship("Subscription", back_populates="user")
    created_at = db.Column(db.DateTime)

    def __init__(self):
        self.id = str(uuid4())
        self.bal = 00.00
        self.created_at = datetime.utcnow()


class Package(db.Model):
    id = db.Column(db.String(36), primary_key=True)
    name = db.Column(db.String(30), unique=True, nullable=False)
    price = db.Column(db.Integer)
    description = db.Column(db.String(100))
    subs = db.relationship("Subscription", back_populates="package")

    def __init__(self, name, price, description):
        self.id = str(uuid4())
        self.name = name
        self.price = price
        self.description = description


class Subscription(db.Model):
    id = db.Column(db.String(36), primary_key=True)
    created_at = db.Column(db.DateTime)
    user = db.relationship("User", back_populates="subs")
    package = db.relationship("Package", back_populates="subs")

    user_id = db.Column(db.String(36), db.ForeignKey("user.id"))
    package_id = db.Column(db.String(36), db.ForeignKey("package.id"))

    def __init__(self):
        self.id = str(uuid4())
        self.created_at = datetime.utcnow()
