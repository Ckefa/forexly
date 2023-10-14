from api import base
from api.database import User, Orders
from flask import render_template, session, request


@base.route("/", strict_slashes=False)
def home():
    return render_template("index.html")


@base.route("/pay", methods=["GET", "POST"], strict_slashes=False)
def pay():
    if request.method == "GET":
        data = request.json
        phone = data.get("phone") if data.get("phone") else session.get("phone")
        user = User.query.filter_by(phone=phone).first()
        if user:
            pending = user.get_invoices()
            if pending:
                return {"pending": pending}
            else:
                return {"msg": "no pending invoices"}

        return "Payment confirmed"

    elif request.method == "POST":
        data = request.json
        print(data)
        order_track_id = data.get("OrderTrackingId")
        order = Orders.query.filter_by(order_track_id=order_track_id).first()
        order.get_status()

        return "Payment Success"
    else:
        return {"msg": "error occured"}


ipn_status = {
    "OrderTrackingId": "247d81a9-25fa-4ae3-aa70-de11b74e7103",
    "OrderNotificationType": "IPNCHANGE",
    "OrderMerchantReference": "TEST1",
}
