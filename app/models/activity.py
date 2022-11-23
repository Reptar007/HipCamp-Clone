from .db import db, environment, SCHEMA, add_prefix_for_prod
from .campground import campground_activities

class Activity(db.Model):
    __tablename__ = "activities" 

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id  = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)

    activity = db.relationship('Campground',
            secondary = campground_activities,
            back_populates = 'campground',
            lazy = False,
            cascade = 'all, delete'
        )
    
    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name
        }