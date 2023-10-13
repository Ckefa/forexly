from api.database import User
from flask import session


class LoginManager:
    user = None

    def __init__(self):
        pass

    def login(self, phone, passwd):
        try:
            user = User.query.filter_by(phone=phone).first()
            print(user)
            if not user:
                return {"msg": "user not registered"}

            elif user and user.passwd == passwd:
                session["phone"] = user.phone
                self.user = user
                return {"msg": "success"}

            else:
                return {"resp": "incorrrect password."}
        except Exception as e:
            print(e)
            return {"msg": "Error logging in!!!"}

    def logout(self):
        self.user = None
        session["phone"] = None

        if not self.user:
            return {"msg": "logout succcessful"}
        return {"resp": "Error loging out"}
