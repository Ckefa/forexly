from api.database import db, User, Orders
from api.users import users
from flask import request, session


@users.route("/cancel/<order_track_id>", strict_slashes=False)
def cancle_order(order_track_id):
    if request.method == "GET":
        order = Orders.query.filter_by(order_track_id=order_track_id).first()
        print("orders", order)
        if order:
            db.session.delete(order)
            db.session.commit()
            return {"msg": "order cancelled"}
        return {"msg": "cancelled"}

    else:
        return {"msg": "invalid request"}


@users.route("/recharge", methods=["GET", "PUT", "POST"], strict_slashes=False)
def recharge():
    if request.method == "GET":
        phone = session.get("phone")
        phone = "0710"
        user = User.query.filter_by(phone=phone).first()
        if user:
            orders = user.get_orders()
            if orders:
                return {"pending": orders}
            else:
                return {"msg": "no orders yet"}

        return {"msg": "please login first"}

    if request.method == "POST":
        data = request.json
        order_track_id = data.get("order_track_id")
        order = Orders.query.filter_by(order_track_id=order_track_id).first()
        if order:
            order_status = order.get_status()
            if order_status:
                return order_status
            else:
                return {"msg": "error getting order details"}
        else:
            return {"msg": f"order id {order_track_id} not found !"}

    if request.method == "PUT":
        data = request.json
        amount = data.get("amount")
        phone = session.get("phone")
        phone = "0710"
        user = User.query.filter_by(phone=phone).first()
        if user:
            pending = user.get_invoices()
            if pending:
                return {"pending": pending}
        else:
            return {"msg": "user not logged in!"}

        new_order = Orders(amount, phone)
        if new_order and new_order.order_track_id:
            db.session.add(new_order)
            db.session.commit()
            orders = new_order.user.get_invoices()
            print(orders)
            if orders:
                return {"new": orders}
        return {"msg": "errorr occured"}
    return {"msg": "something went wrong"}
