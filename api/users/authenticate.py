from flask import request, session
from api.users import users
from api.database import User, Register


@users.route("/register", methods=["POST"], strict_slashes=False)
def register():
    if request.method == "POST":
        new_user = Register(request.json)

        user_status = new_user.register()
        print(user_status)

        return {"msg": user_status}
    else:
        return {"msg": "invalid request method"}


@users.route("/login", methods=["GET", "POST"], strict_slashes=False)
def login():
    if request.method == "GET":
        phone = session.get("phone")
        # phone = "0710"
        user = User.query.filter_by(phone=phone).first()
        if user:
            packs = user.get_subs()
            payload = {
                "user": user.user,
                "phone": user.phone,
                "bal": user.bal,
                "packs": packs,
            }
            return {"msg": f"{user.user}: success", "user": payload}
        else:
            return {"msg": "user not logged in"}

    if request.method == "POST":
        data = request.json
        user = User.query.filter_by(phone=data.get("phone")).first()
        if user and user.passwd == data.get("passwd"):
            session["phone"] = user.phone
            return {"msg": "success"}
        return {"msg": "failed"}
    return {"msg": "Something went wrong!"}


@users.route("/logout", strict_slashes=False)
def logout():
    if session.get("phone"):
        session.pop("phone")
        return {"msg": "logout success"}
    return {"msg": "your are not logged in!"}
