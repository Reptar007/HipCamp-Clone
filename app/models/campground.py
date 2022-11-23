from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.schema import Column, ForeignKey, Table
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

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
    acres = db.Column(db.Integer, nullable=False)
    capacity = db.Column(db.Integer, nullable=False)
    avg_rating = db.Column(db.Float, nullable=False)
    host_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    name = db.Column(db.String, nullable=False)
    location = db.Column(db.String, nullable=False)
    price = db.Column(db.Float, nullable=False)
    lat = db.Column(db.Float, nullable=False)
    lng = db.Column(db.Float, nullabel=False)
    min_nights = db.Column(db.Integer, nullable=False)
    max_nights = db.Column(db.Integer, nullable=False)
    checkin_time = db.Column(db.String, nullable=False)
    checkout_time = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)

    host = db.relationship("User", back_populates='spot')
    image = db.relationship("CampgroundImage", back_populates='spot', cascade="all, delete")

    campground = db.relationship('Activity',
            secondary = campground_activities,
            back_populates = 'activity',
            lazy = False,
            cascade = 'all, delete'
        )
    
    spot = db.relationship('Amenity',
            secondary = campground_amenities,
            back_populates = 'amenity',
            lazy = False,
            cascade = 'all, delete'
        )

    def to_dict(self):
        return {
            'id': self.id,
            'acres': self.acres,
            'capacity': self.capacity,
            'avg_rating': self.avg_rating,
            'host': self.host_id,
            'name': self.name,
            'location': self.location,
            'price': self.price,
            'lat' : self.lat,
            'lng': self.lng,
            'min_nights': self.min_nights,
            'max_nights': self.max_nights,
            'checkin_time': self.checkin_time,
            'checkout_time': self.checkout_time,
            'description': self.description
        }