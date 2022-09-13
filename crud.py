"""CRUD Operations."""
from model import db, User, Itinerary, Landmark, Item, connect_to_db

def create_user(email, password):

    user= User(email=email, password=password)

    return user

def get_user_by_id(user_id):
    return User.query.get(user_id)

def get_user_by_email(email):
    """Return a user by email."""

    return User.query.filter(User.email == email).first()
    

def create_itinerary(user_destination, travel_date):

    itinerary = Itinerary(
        user_destination=user_destination,
        travel_date=travel_date
    )
    return itinerary

def get_itinerary_by_id(itinerary_id):
    return Itinerary.query.get(itinerary_id)

def create_landmark(landmark_name):
    landmark = Landmark(landmark=landmark)
    return landmark

def get_landmark_by_id(landmark_id):
    return Landmark.query.get(landmark_id)

def get_landmarks():
    return Landmark.query.all()

def create_item(item_name):
    item= Item(item_name=item_name)
    return item

def get_item_by_id(item_id):
    return Item.query.get(item_id)

def get_items():
    return Item.query.all()

#update and delete items?








if __name__ == '__main__':
    from server import app
    connect_to_db(app)