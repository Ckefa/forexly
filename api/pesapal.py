#!/usr/bin/env python3

import requests
import json
from uuid import uuid4


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


def register_ipn():
    url = "https://cybqa.pesapal.com/pesapalv3/api/URLSetup/RegisterIPN"

    payload = json.dumps({"url": "", "ipn_notification_type": "POST"})
    headers = {"Accept": "application/json", "Content-Type": "application/json"}

    response = requests.request("POST", url, headers=headers, data=payload)

    print(response.text)


access_token = get_access_token()
print(access_token)
register_ipn()
