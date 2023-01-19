from flask import Blueprint, request
from flask_login import current_user, login_required
from app.models import Booking, User, Campground, db
from app.forms import BookingForm
from datetime import datetime, date, timedelta
from .auth_routes import validation_errors_to_error_messages



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

##GET one booking
@booking_routes.route('/<int:id>')
def getBooking(id):
    booking = Booking.query.get_or_404(id)
    return {'booking': booking.to_dict()}

##POST booking
@booking_routes.route('', methods=['POST'])
@login_required
def createBooking():
    camp = request.json['campId']
    campBookings = Campground.query.get_or_404(camp).to_dict()['bookings']
    campBookings = [[date['start_date'], date['end_date']] for date in campBookings]
    form = BookingForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data

        dateErrors = {}

        for date in campBookings:
            if (data['start_date'] <= date[1].date()) and (date[0].date() <= data['end_date']):
                dateErrors['Date'] = ['These dates are already taken. Please try again.']
        if data['start_date'] > data['end_date']:
            dateErrors['Dates'] = ['Please pick an end date occuring after your start date']
        if datetime.now().date() > data['start_date'] or datetime.now().date() > data['end_date']:
            dateErrors['Past Dates'] = ['Please pick dates in the future.']
        if bool(dateErrors):
            return {'errors': validation_errors_to_error_messages(dateErrors)}

        newbooking = Booking (
            userId = current_user.id,
            campId = camp,
            start_date = data['start_date'],
            end_date = data['end_date']
        )

        db.session.add(newbooking)
        db.session.commit()
        booking = newbooking.to_dict()
        camp = Campground.query.get(booking['campId'])
        booking['camp'] = camp.to_dict()
        return {'booking': booking}
    return {'errors': validation_errors_to_error_messages(form.errors)}


##PUT (update) one booking
@booking_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_booking(id):
    form = BookingForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    booking = Booking.query.get_or_404(id)

    if booking.userId != current_user.id:
        return{{'errors': 'You must own this booking to update'}}
    
    if form.validate_on_submit():
        data = form.data
        dateErrors = {}
        camp = booking.to_dict()['campId']
        campBookings = Campground.query.get_or_404(camp).to_dict()['bookings']
        campBookings = [[date['start_date'], date['end_date']] for date in campBookings]
        for date in campBookings:
            if (data['start_date'] <= date[1].date()) and (date[0].date() <= data['end_date']):
                dateErrors['Date'] = ['These dates are already taken. Please try again.']
        if data['start_date'] > data['end_date']:
            dateErrors['Dates'] = ['Please pick an end date occuring after your start date']
        if datetime.now().date() > data['start_date'] or datetime.now().date() > data['end_date']:
            dateErrors['Past Dates'] = ['Please pick dates in the future.']
        if bool(dateErrors):
            return {'errors': validation_errors_to_error_messages(dateErrors)}

        ## replace dates from FORM
        booking.start_date = data['start_date']
        booking.end_date = data['end_date']

        db.session.commit()
        new_booking = booking.to_dict()
        camp = Campground.query.get(new_booking['campId'])
        new_booking['camp'] = camp.to_dict()
        return {'booking': new_booking}
    return { 'errors': validation_errors_to_error_messages(form.errors)}

@booking_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_booking(id):
    booking = Booking.query.get_or_404(id)
    if booking:
        db.session.delete(booking)
        db.session.commit()
        return {'message': 'booking was successfully deleted'}
    return {'error': 'booking does not exist'}, 404