from api import base
from api.database import User, Orders
from flask import render_template, session, request


@base.route("/", strict_slashes=False)
def home():
    return render_template("index.html")


@base.route("/pay", methods=["POST"], strict_slashes=False)
def pay():
    if request.method == "POST":
        data = request.json
        order_track_id = data.get("OrderTrackingId")
        order = Orders.query.filter_by(order_track_id=order_track_id).first()
        order.get_status()

        return "Payment Success"
    else:
        return {"msg": "error occured"}


# ipn_status = {
#     "OrderTrackingId": "247d81a9-25fa-4ae3-aa70-de11b74e7103",
#     "OrderNotificationT ype": "IPNCHANGE",
#     "OrderMerchantReference": "TEST1",
# }
