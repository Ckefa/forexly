from api.database import db, User

class Register:
    def __init__(self, data):
        self.user = data.get('user')
        self.phone = data.get('phone')
        self.passwd = data.get('passwd')


    def register(self) -> str:
        user = User.query.filter_by(phone = self.phone).first()
        if user:
            return "Phone number already registered"

        new_user = User()
        new_user.user = self.user
        new_user.phone = self.phone
        new_user.passwd = self.passwd
        
        try:
            db.session.add(new_user)
            db.session.commit()
            return "success"
        except Exception as e:
            return f"error {e}"