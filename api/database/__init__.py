from flask_sqlalchemy import SQLAlchemy

print("Initializing Database Module....")
db = SQLAlchemy()


from api.database.models import User
