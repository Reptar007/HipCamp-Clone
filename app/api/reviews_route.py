from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Review, User
from app.forms.review_form import ReviewForm

reviews_routes = Blueprint('reviews', __name__) 

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@reviews_routes.route('')
@login_required
def all_reveiws():
    reviews = Review.query.all()
    reviews_parsed = {}
    for review in reviews:
        reviews_parsed[review.id] = review.to_dict()
    return reviews_parsed

@reviews_routes.route('/campground/<int:id>')
def get_reviews_by_campground(id):
    reviews = Review.query.filter_by(campground_id=id)
    parsed_dict = {}
    for review in reviews:
        parsed_dict[review.id] = review.to_dict()
    return parsed_dict

@reviews_routes.route('/<int:id>')
@login_required
def single_review(id):
    reveiw = Review.query.get(id)
    return reveiw.to_dict()

@reviews_routes.route('/campground/<int:id>', methods=["POST"])
@login_required
def create_review(id):
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        review = Review(
            author_id = current_user.id,
            campground_id = id,
            rating = form.data['rating'],
            body = form.data['body']
        )
        db.session.add(review)
        db.session.commit()
        return review.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@reviews_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_review(id):
    review = Review.query.get_or_404(id)
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        review.author_id = current_user.id
        review.campground_id = id
        review.rating = form.data['rating']
        review.body = form.data['body']

        db.session.commit()
        return review.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@reviews_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_review(id):
    review = Review.query.get_or_404(id)
    db.session.delete(review)
    db.session.commit()
    return {"message": "Successfully deleted"}