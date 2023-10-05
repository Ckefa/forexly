from api.users import users
from api.database import db, User, Package, Subscription


@users.route("/subscribe/<package>", strict_slashes=True)
def subscribe(package):
    user = User.query.filter_by(phone="0710").first()
    pack = Package.query.filter_by(name="gold").first()

    new_sub = Subscription()
    new_sub.user = user
    new_sub.package = pack

    db.session.add(new_sub)
    db.session.commit()

    return "user subs"
