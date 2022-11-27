from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.schema import Table
from .user import User

campground_amenities = Table(
    "campground_amenities",
    db.metadata,
    db.Column('campgroundId', db.Integer, db.ForeignKey(add_prefix_for_prod('campgrounds.id'))),
    db.Column('amenityId', db.Integer, db.ForeignKey(add_prefix_for_prod('amenities.id')))
)

if environment == 'production':
    campground_amenities.schema = SCHEMA

campground_activities = Table(
    "campground_activities",
    db.metadata,
    db.Column('campgroundId', db.Integer, db.ForeignKey(add_prefix_for_prod('campgrounds.id'))),
    db.Column('activityId', db.Integer, db.ForeignKey(add_prefix_for_prod('activities.id')))
)

if environment == 'production':
    campground_activities.schema = SCHEMA

class Campground(db.Model):
    __tablename__ = 'campgrounds'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    location = db.Column(db.String, nullable=False)
    acres = db.Column(db.Integer, nullable=False)
    capacity = db.Column(db.Integer, nullable=False)
    host_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    price = db.Column(db.Float, nullable=False)
    min_nights = db.Column(db.Integer, nullable=False)
    max_nights = db.Column(db.Integer, nullable=False)
    checkin_time = db.Column(db.String, nullable=False)
    checkout_time = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)

    host = db.relationship("User", back_populates='spot')
    review = db.relationship("Review", back_populates='campground', cascade="all, delete")
    image = db.relationship("CampgroundImage", back_populates='spot', cascade="all, delete")

    activity = db.relationship('Activity',
            secondary = campground_activities,
            back_populates = 'campground',
            lazy = False
        )
    
    amenity = db.relationship('Amenity',
            secondary = campground_amenities,
            back_populates = 'campground',
            lazy = False
        )
    
    def avg(self):
        reviews = self.review
        sum_rating = 0
        for review in reviews:
            rating = review.to_dict()
            sum_rating += rating['rating']
        return round((sum_rating / len(reviews)), 2)

    def to_dict(self):
        return {
            'id': self.id,
            'acres': self.acres,
            'capacity': self.capacity,
            'host': self.host_id,
            'name': self.name,
            'location': self.location,
            'price': self.price,
            'min_nights': self.min_nights,
            'max_nights': self.max_nights,
            'checkin_time': self.checkin_time,
            'checkout_time': self.checkout_time,
            'description': self.description,
            'avg rating' : self.avg(),
            'Images' : [image.to_dict() for image in self.image],
            'Amenities': [amenity.to_dict() for amenity in self.amenity],
            'Activites': [activity.to_dict() for activity in self.activity]
        }