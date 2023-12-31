from api.users import users
from api.database import db, User, Orders, Package, Subscription
from flask import session, request


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


@users.route("/receive/<subs_id>", strict_slashes=False)
def receive(subs_id):
    subscription = Subscription.query.filter_by(id=subs_id).first()
    res = subscription.receive()
    return {"msg": res}
