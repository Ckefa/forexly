from api.users import users
from api.database import db, User, Package, Subscription
from flask import session


def add_subscribe(phone, package):
    user = User.query.filter_by(phone=phone).first()
    pack = Package.query.filter_by(name=package).first()

    if user:
        if user.bal >= pack.price:
            new_sub = Subscription()
            new_sub.user = user
            new_sub.package = pack
            user.bal -= pack.price

            db.session.add(new_sub)
            db.session.commit()
        return {"msg": "purchase completed successful"}

    else:
        return {"msg": f"insufficient balance {user.bal}"}


@users.route("/subscribe/<package>", strict_slashes=True)
def subscribe(package):
    if session.get("phone"):
        return add_subscribe(session.get("phone"), package)

    else:
        return {"msg": "user not logged in!"}


@users.route("/recharge", strict_slashes=False)
def recharge():
    user = User.query.filter_by(phone=session.get("phone")).first()
    user.bal += 500
    db.session.commit()
    return {"msg": "recharge successful"}
