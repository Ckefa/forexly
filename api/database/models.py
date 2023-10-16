from api.pesapal import Pesapal
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
    orders = db.relationship("Orders", back_populates="user")

    def __init__(self):
        self.id = str(uuid4())
        self.bal = 00.00
        self.created_at = datetime.utcnow()

    def get_invoices(self):
        orders = filter(lambda x: not x.is_paid, self.orders)
        orders = map(
            lambda x: {
                "id": x.id,
                "amount": x.amount,
                "status": x.is_paid,
                "created_at": x.created_at,
                "order_track_id": x.order_track_id,
                "checkout": x.redirect_url,
            },
            orders,
        )
        return list(orders)

    def get_subs(self):
        packs = map(
            lambda x: {
                "id": x.id,
                "name": x.package.name,
                "price": x.package.price,
                "income": x.package.income,
                "revenue": x.revenue,
                "status": x.has_received(),
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

    def __init__(self, name, price, income, description):
        self.id = str(uuid4())
        self.income = income
        self.name = name
        self.price = price
        self.description = description


class Subscription(db.Model):
    id = db.Column(db.String(36), primary_key=True)
    created_at = db.Column(db.DateTime)
    user = db.relationship("User", back_populates="subs")
    package = db.relationship("Package", back_populates="subs")
    revenue = db.Column(db.Float, default=0)
    last_income = db.Column(db.DateTime)

    user_id = db.Column(db.String(36), db.ForeignKey("user.id"))
    package_id = db.Column(db.String(36), db.ForeignKey("package.id"))

    def __init__(self):
        self.id = str(uuid4())
        self.created_at = datetime.utcnow()

    def receive(self):
        if self.has_received():
            return "income already recieved"

        self.revenue += self.package.income
        self.user.bal += self.package.income
        self.package.days -= 1
        self.last_income = datetime.utcnow()
        db.session.commit()
        return "success"

    def has_received(self):
        last_income = self.last_income
        if last_income:
            if last_income.date() == datetime.utcnow().date():
                return True
        return False


class Orders(db.Model):
    id = db.Column(db.String(36), primary_key=True)
    amount = db.Column(db.Float)
    user = db.relationship("User", back_populates="orders")
    user_id = db.Column(db.String(36), db.ForeignKey("user.id"))
    order_track_id = db.Column(db.String)
    redirect_url = db.Column(db.String)
    errror = db.Column(db.String)
    status = db.Column(db.String)
    created_at = db.Column(db.DateTime)
    is_paid = db.Column(db.Boolean, default=False)

    def __init__(self, amount, phone):
        self.id = str(uuid4())
        self.created_at = datetime.utcnow()
        user = User.query.filter_by(phone=phone).first()
        self.user = user
        self.amount = amount
        try:
            ppal = Pesapal(self.id)
            ppal = ppal.request_payment(int(amount), user.phone, "clinton", "kefa")
            if not ppal or not ppal.get("order_tracking_id"):
                print(ppal)
                raise f"Error placing order {amount}"
            self.order_track_id = ppal.get("order_tracking_id")
            self.redirect_url = ppal.get("redirect_url")
            self.errror = ppal.get("error")
            self.status = ppal.get("status")
            print(f"order track {self.order_track_id} placed successful")
        except Exception as e:
            print(e)
            print("error placing order")

    def get_status(self):
        try:
            ppal = Pesapal(self.user_id)
            ppal = ppal.payment_status(self.order_track_id)
            amount = ppal.get("amount")
            details = ppal.get("payment_status_description")
            if ppal:
                if details in {"Failed", "INVALID"}:
                    return {"msg": "transaction failde!", "resp": ppal}
                elif details not in {"Failed", "INVALID"}:
                    self.is_paid = True
                    self.user.bal += float(amount)
                    return {"msg": "Recharge Successful!", "resp": ppal}
            return ppal

        except Exception as e:
            print(e)
            return {"msg": "Errer in fetcing payment details"}
