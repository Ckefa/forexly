from flask import request, session
from api.users import users
from api.database import User, Register


@users.route("/register", methods=["GET", "POST"], strict_slashes=False)
def register():
    if request.method == "POST":
        new_user = Register(request.json)

        user_status = new_user.register()
        print(user_status)

    return {"msg": user_status}


@users.route("/login", methods=["GET", "POST"], strict_slashes=False)
def login():
    if request.method == 'GET':
        user = User.query.filter_by(phone = session.get('phone')).first()
        if user:
            return {"msg": f"{user.user}: success"}
        else:
            return {'msg': "user not logged in"}

    if request.method == 'POST':
        data = request.json
        user = User.query.filter_by(phone=data.get("phone")).first()
        if user and user.passwd == data.get('passwd'):
            session['phone'] =  user.phone
            return {"msg": "success"}
        return {"msg": 'failed'}
    return {"msg": "Something went wrong!"}

@users.route("/logout", strict_slashes=False)
def Logout():
    session['phone'] =None
    return "logout success"
