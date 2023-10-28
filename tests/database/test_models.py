#!/usr/bin/env python3

from app import app
from datetime import datetime
from api.database import User, Orders, Subscription
import unittest

user = User()


class TestUser(unittest.TestCase):
    def test_init(self):
        user = User()
        self.assertTrue(user)
        self.assertTrue(user.id)
        self.assertIsInstance(user.id, str)
        self.assertEqual(user.bal, 0)
        self.assertIsInstance(user.bal, float)
        self.assertTrue(user.created_at)
        self.assertIsInstance(user.created_at, datetime)

    def test_get_invoices(self):
        invoice = user.get_invoices()
        self.assertTrue(user)
        self.assertIsInstance(invoice, list)

    def test_get_subs(self):
        subs = user.get_subs()
        self.assertTrue(user)
        self.assertIsInstance(subs, list)


class TestSubscriptin(unittest.TestCase):
    def test_init(self):
        sub = Subscription()
        self.assertTrue(sub.id)
        self.assertIsInstance(sub.id, str)
        self.assertTrue(sub.created_at)
        self.assertIsInstance(sub.created_at, datetime)


class TestOrders(unittest.TestCase):
    def test_init(self):
        with app.app_context():
            order = Orders(150, "0710")
            self.assertTrue(order)
            self.assertTrue(order.id and order.created_at)


if __name__ == "__main__":
    unittest.main()
