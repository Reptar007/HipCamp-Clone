from flask import Blueprint
from flask_login import current_user
from app.models import Booking, User, Campground


booking_routes = Blueprint('bookings', __name__)

##GET all bookings
@booking_routes.route('')
def getAllBookings():
    user_bookings = User.query.get(current_user.id).bookings
    bookings = [booking.to_dict() for booking in user_bookings]
    for booking in bookings:
        camp = Campground.query.get(booking['campId'])
        booking['camp'] = camp.to_dict()
    return {'bookings': bookings}