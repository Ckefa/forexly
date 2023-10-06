#!/usr/bin/env python3


from app import app
from api.database import db, User
from api.users.subscribe import add_subscribe
from cmd import Cmd


class Admin(Cmd):
    intro = "Welcome to admin Terminal.\nType 'help' to list commands."
    prompt = "$> "

    def do_hello(self, line):
        print(f"Hello admin {line}")

    def do_user_subs(self, phone):
        with app.app_context():
            user = User.query.filter_by(phone=phone).first()
            if user:
                subs = user.get_subs()
                print(user.user, subs)
            else:
                print(f"{phone} not registered")

    def do_user_recharge(self, args):
        args = args.split()
        if len(args) < 2:
            print("not enough arguments")
            return
        phone, amount = args
        print(phone, amount)
        with app.app_context():
            user = User.query.filter_by(phone=phone).first()
            if user:
                user.bal += int(amount)
                db.session.commit()
                print(f"User {user.user} recharged {amount} to {user.bal}")
            else:
                print(f"{phone} not registered")

    def do_user_subscribe(self, args):
        args = args.split()
        if len(args) < 2:
            print("not enough arguments")
            return
        phone, pack = args
        with app.app_context():
            try:
                res = add_subscribe(phone, pack)
                print(res)
            except Exception as e:
                print(e)
                return
        print(f"{phone} subscribed to package {pack} successful")

    def do_user_balance(self, phone):
        with app.app_context():
            user = User.query.filter_by(phone=phone).first()
            if user:
                print(user.user, user.bal)
            else:
                print(f"{phone} not registered")

    def do_quit(self, line):
        print("Exiting admin Terminal.")
        return True


if __name__ == "__main__":
    Admin().cmdloop()
