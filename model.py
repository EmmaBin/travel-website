"""Models for travel website."""

from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    """A user."""

    __tablename__= "users"

    user_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    email= db.Column(db.String, unique=True)
    password = db.Column(db.String)

    itineraries = db.relationship("Itinerary", back_populates="user" )

    def __repr__(self):
        return f"<User user_id={self.user_id} email={self.email}>"


class Itinerary(db.Model):
    """An itinerary."""

    __tablename__= "itineraries"

    itinerary_id = db.Column(db.Integer, autoincrement =True, primary_key= True)
    itinerary_name = db.Column(db.String) # the title of the trip, like "Bay Vacay"
    travel_date= db.Column(db.DateTime)
    user_id = db.Column(db.Integer, db.ForeignKey("users.user_id"))

    user = db.relationship("User", back_populates="itineraries" )
    landmarks= db.relationship("Landmark", back_populates="itinerary" )
    items = db.relationship("Item", back_populates="itineraries" )
    expenses = db.relationship("Expense", back_populates="itinerary" )

    def __repr__(self):
        return f"<Itinerary itinerary_id={self.itinerary_id} user_destination={self.user_destination}>"

class Landmark(db.Model):
    """A landmark."""

    __tablename__="landmarks"

    landmark_id = db.Column(db.Integer, autoincrement =True, primary_key= True)
    landmark_name = db.Column(db.String)
    itinerary_id = db.Column(db.Integer, db.ForeignKey("itineraries.itinerary_id"))

    itinerary = db.relationship("Itinerary", back_populates="landmarks" )

    def __repr__(self):
        return f"<Landmark landmark_id={self.landmark_id} landmark_name={self.landmark_name}>"

class Item(db.Model):
    """checklist_item."""

    __tablename__="items"

    item_id = db.Column(db.Integer, autoincrement =True, primary_key= True)
    item_name = db.Column(db.String)
    itinerary_id = db.Column(db.Integer, db.ForeignKey("itineraries.itinerary_id"))

    itineraries = db.relationship("Itinerary", back_populates="items" )

    def __repr__(self):
        return f"<Item item_id={self.item_id} item_name={self.item_name}>"

class Expense(db.Model):

    __tablename__="expenses"

    expense_id = db.Column(db.Integer, autoincrement = True, primary_key = True)
    itinerary_id = db.Column(db.Integer, db.ForeignKey("itineraries.itinerary_id"))
    expense_activity= db.Column(db.String)
    type= db.Column(db.String)
    amount = db.Column(db.Integer)
    
    itinerary = db.relationship("Itinerary", back_populates="expenses" )

    def __repr__(self):
        return f"<Expense expense_id={self.expense_id} expense_activity={self.expense_activity} type={self.type} amount={self.amount}>"



#travels is database name
def connect_to_db(flask_app, db_uri="postgresql:///travels", echo=True):
    flask_app.config["SQLALCHEMY_DATABASE_URI"] = db_uri
    flask_app.config["SQLALCHEMY_ECHO"] = echo
    flask_app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.app = flask_app
    db.init_app(flask_app)

    print("Connected to the db!")

    

if __name__ == '__main__':
    
    from server import app
    connect_to_db(app)
    db.create_all()

    


    











