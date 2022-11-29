from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db,Campground, Activity, Amenity, CampgroundImage, User
from app.forms.campgrounds_form import CampgroundForm
from app.forms.image_form import ImageForm

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
def all_campgrounds():
    campgrounds = Campground.query.all()
    campgrounds_parsed = {}
    for campground in campgrounds:
        campgrounds_parsed[campground.id] = campground.to_dict()
    return campgrounds_parsed

@campground_routes.route('/<int:id>')
def single_camground(id):
    single_camground = Campground.query.get(id)
    host = User.query.get(single_camground.to_dict()['host'])

    return {'camp': single_camground.to_dict(), 'host': host.to_dict()}
    
@campground_routes.route('/host', methods=['POST'])
@login_required
def create_campground():
    form = CampgroundForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_campground = Campground (
            name = form.data['name'],
            location = form.data['location'],
            sites = form.data['sites'],
            guests = form.data['guests'],
            host_id = current_user.id,
            price = form.data['price'],
            min_nights = form.data['min_nights'],
            max_nights = form.data['max_nights'],
            checkin_time = form.data['checkin_time'],
            checkout_time = form.data['checkout_time'],
            description = form.data['description']
        )
        db.session.add(new_campground)
        db.session.commit()

        images = request.json['images']
        for image in images:
            new_image = CampgroundImage(
                campground_id = new_campground.id,
                image_url = image
            )
            db.session.add(new_image)
        db.session.commit()
  
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
        edit_campground.sites = form.data['sites']
        edit_campground.guests = form.data['guests']
        edit_campground.host_id = current_user.id
        edit_campground.price = form.data['price']
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
