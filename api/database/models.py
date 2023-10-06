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

    def get_subs(self):
        packs = map(
            lambda x: {
                "id": x.id,
                "name": x.package.name,
                "price": x.package.price,
                "revenue": x.revenue,
                "days": x.package.days,
                "created_at": x.created_at,
            },
            self.subs,
        )
        return list(packs)


class Package(db.Model):
    id = db.Column(db.String(36), primary_key=True)
    name = db.Column(db.String(30), unique=True, nullable=False)
    price = db.Column(db.Integer)
    income = db.Column(db.Float)
    days = db.Column(db.Integer, default=30)
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
    revenue = db.Column(db.Float)
    last_income = db.Column(db.DateTime)

    user_id = db.Column(db.String(36), db.ForeignKey("user.id"))
    package_id = db.Column(db.String(36), db.ForeignKey("package.id"))

    def __init__(self):
        self.id = str(uuid4())
        self.created_at = datetime.utcnow()

    def receive(self):
        if self.last_income.date() == datetime.utcnow().date():
            return "income already recieved"

        self.revenue += self.package.income
        self.user.bal += self.package.income
        self.package.days -= 1
        self.last_income = datetime.utcnow()
        return "success"
