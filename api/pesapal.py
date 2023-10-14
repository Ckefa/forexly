#!/usr/bin/env python3

import requests
import json


def get_access_token():
    url = "https://cybqa.pesapal.com/pesapalv3/api/Auth/RequestToken"

    headers = {"Content-Type": "application/json", "Accept": "application/json"}
    payload = json.dumps(
        {
            "consumer_key": "qkio1BGGYAXTu2JOfm7XSXNruoZsrqEW",
            "consumer_secret": "osGQ364R49cXKeOYSpaOnT++rHs=",
        }
    )

    response = requests.post(url, headers=headers, data=payload)

    return response.json().get("token")


class Pesapal:
    def __init__(self, order_id):
        self.order_id = order_id
        self.access_token = get_access_token()
        self.callback_url = "https://betbot.run-us-west2.goorm.app/pay"

    def register_ipn(self):
        url = "https://cybqa.pesapal.com/pesapalv3/api/URLSetup/RegisterIPN"

        payload = json.dumps(
            {
                "url": self.callback_url,
                "ipn_notification_type": "POST",
            }
        )
        headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": f"Bearer {self.access_token}",
        }

        response = requests.request("POST", url, headers=headers, data=payload)

        ipn_id = response.json().get("ipn_id")
        return ipn_id

    def submit_order(self, ipn_id, amount, phone, fname, lname):
        url = "https://cybqa.pesapal.com/pesapalv3/api/Transactions/SubmitOrderRequest"
        payload = json.dumps(
            {
                "id": self.order_id,
                "currency": "KES",
                "amount": amount,
                "description": "Payment for account upgrade",
                "callback_url": self.callback_url,
                "notification_id": ipn_id,
                "billing_address": {
                    "email_address": "",
                    "phone_number": phone,
                    "country_code": "",
                    "first_name": fname,
                    "middle_name": "",
                    "last_name": lname,
                    "line_1": "",
                    "line_2": "",
                    "city": "",
                    "state": "",
                    "postal_code": None,
                    "zip_code": None,
                },
            }
        )

        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {self.access_token}",
        }

        response = requests.request("POST", url, headers=headers, data=payload)
        response = response.json()
        return response

    def payment_status(self, order_track_id):
        url = (
            "https://cybqa.pesapal.com/pesapalv3/api/Transactions/GetTransactionStatus"
        )

        payload = {}
        params = {"orderTrackingId": order_track_id}
        headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": f"Bearer {self.access_token}",
        }

        response = requests.request(
            "GET", url, headers=headers, params=params, data=payload
        )

        return response.json()

    def request_payment(self, amount, phone, fname, lname):
        ipn_id = self.register_ipn()
        new_order = self.submit_order(ipn_id, amount, phone, fname, lname)
        return new_order


if __name__ == "__main__":
    pass
