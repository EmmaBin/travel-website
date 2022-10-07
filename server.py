"""Server for travel site app."""

from sre_constants import SUCCESS
from flask import Flask, render_template, request, flash, session, redirect, jsonify
from model import connect_to_db, db
import crud
import requests

import os
from jinja2 import StrictUndefined

app = Flask(__name__)
app.secret_key = "dev"
app.jinja_env.undefined = StrictUndefined
maps_api_key= os.environ['GOOGLE_API']


@app.route("/")
def homepage():
    """View homepage."""
    
    return render_template("index.html")

@app.route("/createaccount")
def create_account():

    return render_template("createaccount.html")

@app.route("/users", methods=["POST"])
def register_user():
    """Create a new user."""

    email = request.form.get("email")
    password = request.form.get("password")

    user = crud.get_user_by_email(email)

    if user:
        flash("Cannot create an account with that email. Try again.")
        return redirect("/createaccount")
    else:
        user = crud.create_user(email, password)
        db.session.add(user)
        db.session.commit()
        session["user_email"] = user.email
        session["user_id"] = user.user_id
        flash("Account created!")
        return redirect("/itineraries")

@app.route("/login", methods=["POST"])
def process_login():
    """Process user login."""

    email = request.form.get("email")
    password = request.form.get("password")

    user = crud.get_user_by_email(email)
    if not user or user.password != password:
        flash("The email or password you entered was incorrect.")
    else:
        # Log in user by storing the user's email in session
        session["user_email"] = user.email
        session["user_id"] = user.user_id
        flash(f"Welcome back, {user.email}!")

    return redirect("/itineraries")


'''
GET /itineraries/:id -> read itinerary with id :id
PUT /itineraries/:id -> update itinerary with id :id
DELETE /itineraries/:id -> delete itinerary with id :id
POST /itineraries -> create a new itinerary
GET /itineraries -> list all itineraries
'''

@app.route("/itineraries/new")
def new():
    return render_template("itineraries/new.html")

@app.route("/itineraries", methods=['POST'])
def create():
    itinerary_name = request.form.get("itinerary_name") # this is added to a 
    #landmark because it is one thing you visit withing the iterarary
    travel_date = request.form.get("travel_date")
    # TODO get the user
    user = crud.get_user_by_email(session["user_email"])

                            #         user_dest shouold become the title of the itenrary
    itinerary = crud.create_itinerary(itinerary_name, travel_date, user)
     # create landmark with travel destination

    print(itinerary_name)
    print(travel_date)
    db.session.add(itinerary)
    db.session.commit()
    return redirect('/itineraries/' + str(itinerary.itinerary_id))



@app.route("/itineraries/<id>")
def show(id):

    # TODO get itinerary from database
    # also get landmarks for itinerary
    # pass everything to template and render
    itineraries=crud.get_itinerary_by_id(id)
    landmarks=itineraries.landmarks

    return render_template("itineraries/show.html", maps_api_key = maps_api_key, itineraries=itineraries, landmarks=landmarks)

@app.route("/itineraries")
def index():
    print(session)
    if "user_id" in session:
        itineraries = crud.get_itineraries_by_user(session["user_id"])
        return render_template("itineraries/index.html", itineraries = itineraries)
        
    else:
        return redirect("/")

'''
DELETE /itineraries/:id/destinations/:destination_id -> delete destination from itinerary
POST /itineraries/:id/destinations -> add destination to itinerary
'''


@app.route("/itineraries/<itinerary_id>/landmarks", methods=["POST"])
def create_landmark(itinerary_id):
    user_landmark = request.json.get("landmark") #request.json.get
    landmark=crud.create_landmark(user_landmark, itinerary_id)
    db.session.add(landmark)
    db.session.commit()
    serialized={"landmark_name":landmark.landmark_name,
                "landmark_id":landmark.landmark_id}
    
    return jsonify(serialized)

@app.route("/landmarks/<landmark_id>", methods=["DELETE"])
def delete_landmark(landmark_id):
    #get specific landmark under correct itinerary_id
    #delete from session 
    delete_landmark = crud.get_landmark_by_id(int(landmark_id))
    print("---"*20, delete_landmark)
    db.session.delete(delete_landmark)
    db.session.commit()
    response = {"success": True}
    #try except function to catch the error

    return jsonify(response)

@app.route("/itineraries/<itinerary_id>/checklist")
def checklist_form(itinerary_id):
    """add and delete item"""
    # itinerary_name = request.form.get("item")
    itinerary_id=crud.get_itinerary_by_id(itinerary_id)
    return render_template("checklist.html", itinerary_id=itinerary_id)



@app.route("/itineraries/<itinerary_id>/checklist", methods=['POST'])
def create_checklist(itinerary_id):
    """add and delete item"""
    # submit html form
    user_item = request.form.get("item")
    item=crud.create_item(user_item, itinerary_id)
    db.session.add(item)
    db.session.commit()
    serialized ={
        "item":item,
        "item_id":item.item_id
    }



    return jsonify(serialized)









@app.route("/expense/<itinerary_id>")
def expense(itinerary_id):

    itinerary=crud.get_itinerary_by_id(itinerary_id)
    
    return render_template("expense.html", itinerary=itinerary)


@app.route("/itineraries/<itinerary_id>/expense", methods=["POST"])
def track_expense(itinerary_id):

    itinerary=crud.get_itinerary_by_id(itinerary_id)
    # use in fetch when type="json"
    type= request.json.get("type") #request.json.get
    expense_activity= request.json.get("expense_activity")
    amount=request.json.get("amount")
    

    expense= crud.create_expense(expense_activity, type, amount, itinerary_id )
   
    db.session.add(expense)
    db.session.commit()
    serialized={"amount":expense.amount,
                "type":expense.type,
                "expense_activity":expense.expense_activity,
                "itinerary_id": expense.itinerary_id,
                "expense_id": expense.expense_id,
                }
    
    return jsonify(serialized)




@app.route("/expense/<expense_id>", methods=["DELETE"])
def delete_expense(expense_id):

    delete_expense = crud.get_expense_by_id(int(expense_id))
    db.session.delete(delete_expense)
    db.session.commit()
    response = {"success":True}

    return jsonify(response)



if __name__ == "__main__":
    connect_to_db(app)
    app.run(host="0.0.0.0", debug=True)