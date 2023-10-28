#!/usr/bin/env python3


from app import app
import unittest


class TestApp(unittest.TestCase):
    def test_config(self):
        self.assertTrue(app)


if __name__ == "__main__":
    unittest.main()
