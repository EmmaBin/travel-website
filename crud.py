"""CRUD Operations."""
from model import db, User, Itinerary, Landmark, Item, connect_to_db, Expense

def create_user(email, password):

    user= User(email=email, password=password)

    return user

def get_user_by_id(user_id):
    return User.query.get(user_id)

def get_user_by_email(email):
    """Return a user by email."""

    return User.query.filter(User.email == email).first()
    

def create_itinerary(itinerary_name, travel_date, user):



    itinerary = Itinerary(
        user = user,
        itinerary_name=itinerary_name,
        travel_date=travel_date
    )
    return itinerary

def get_itineraries_by_user(user_id):

    return Itinerary.query.filter(Itinerary.user_id == user_id)

def get_itinerary_by_id(itinerary_id):
    return Itinerary.query.get(itinerary_id)
    
    
def get_itinerary_by_destination(user_destination):
    return Itinerary.query.filter(Itinerary.user_destination == user_destination).first()



def create_landmark(landmark_name, itinerary_id):
    landmark = Landmark(landmark_name=landmark_name, itinerary_id= itinerary_id)

    return landmark

def get_landmark_by_id(landmark_id):
    return Landmark.query.get(landmark_id)

def get_landmarks():
    return Landmark.query.all()

    

def create_item(item_name, itinerary_id):
    item= Item(item_name=item_name, itinerary_id=itinerary_id)
    return item

def get_item_by_id(item_id):
    return Item.query.get(item_id)

def get_items():
    return Item.query.all()



#add expense data
def create_expense(expense_activity, type, amount, itinerary_id):
    expense = Expense (expense_activity=expense_activity, type=type, amount=amount, itinerary_id= itinerary_id)
    return expense

def get_expense_by_id(expense_id):
    return Expense.query.get(expense_id)











if __name__ == '__main__':
    from server import app
    connect_to_db(app)