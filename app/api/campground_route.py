from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db,Campground, CampgroundImage, Activity, Amenity,campground_activities,campground_amenities
from app.forms.campgrounds_form import CampgroundForm

campground_routes = Blueprint('campgrounds', __name__)

@campground_routes.route('/')
@login_required
def all_campgrounds():
    all_campgrounds = Campground.query.all()
    return {'campgrounds': [campground.to_dict() for campground in all_campgrounds]}

@campground_routes.route('/<int:id>')
@login_required
def single_camground(id):
    single_camground = Campground.query.get(id)
    return {'campground': single_camground.to_dict()}

@campground_routes.routes('/host', methods=['POST'])
@login_required
def create_campground():
    form = CampgroundForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_campground = Campground (
            name = form.data['name'],
            location = form.data['location'],
            acres = form.data['acres'],
            capacity = form.data['capacity'],
            host_id = current_user.id,
            price = form.data['price'],
            lat = form.data['lat'],
            lng = form.data['lng'],
            min_nights = form.data['min_nights'],
            max_nights = form.data['max_nights'],
            checkin_time = form.data['checkin_time'],
            checkout_time = form.date['checkout_time'],
            description = form.data['description']
        )
        db.session.add(new_campground)
        activities = request.json('activities')
        for id in activities:
            activity = Activity.query.get(id) 
            new_campground.activity.append(activity)
        
        amenities = request.json('amenities')
        for id in amenities:
            amenity = Amenity.query.get(id)
            new_campground.activity.append(amenity)
        db.session.commit()
        return new_campground.to_dict()
    