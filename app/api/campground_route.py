from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db,Campground, Activity, Amenity
from app.forms.campgrounds_form import CampgroundForm

campground_routes = Blueprint('campgrounds', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

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

@campground_routes.route('/host', methods=['POST'])
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
            checkout_time = form.data['checkout_time'],
            description = form.data['description']
        )
        db.session.add(new_campground)

        activities = request.json['activities']
        for activityId in activities:
            activity = Activity.query.get(activityId) 
            new_campground.activity.append(activity)
        
        amenities = request.json['amenities']
        for amenityId in amenities:
            amenity = Amenity.query.get(amenityId)
            new_campground.amenity.append(amenity)

        db.session.commit()
        return new_campground.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@campground_routes.route('/host/<int:id>', methods=['PUT'])
@login_required
def update_campground(id):
    edit_campground = Campground.query.get_or_404(id)
    form = CampgroundForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        edit_campground.name = form.data['name']
        edit_campground.location = form.data['location']
        edit_campground.acres = form.data['acres']
        edit_campground.capacity = form.data['capacity']
        edit_campground.host_id = current_user.id
        edit_campground.price = form.data['price']
        edit_campground.lat = form.data['lat']
        edit_campground.lng = form.data['lng']
        edit_campground.min_nights = form.data['min_nights']
        edit_campground.max_nights = form.data['max_nights']
        edit_campground.checkin_time = form.data['checkin_time']
        edit_campground.checkout_time = form.data['checkout_time']
        edit_campground.description = form.data['description']

        activities = request.json['activities']
        for activityId in activities:
            activity = Activity.query.get(activityId) 
            edit_campground.activity.append(activity)
        
        amenities = request.json['amenities']
        for amenityId in amenities:
            amenity = Amenity.query.get(amenityId)
            edit_campground.amenity.append(amenity)

        db.session.commit()
        return edit_campground.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@campground_routes.route('/host/<int:id>', methods=['DELETE'])
@login_required
def delete_campground(id):
    campground = Campground.query.get_or_404(id)
    db.session.delete(campground)
    db.session.commit()
    return {"message": "Successfully deleted"}
