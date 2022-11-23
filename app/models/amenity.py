from .db import db, environment, SCHEMA, add_prefix_for_prod
from .campground import campground_amenities

class Amenity(db.Model):
    __tablename__ = "amenities" 

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id  = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)

    amenity = db.relationship('Campground',
            secondary = campground_amenities,
            back_populates = 'spot',
            lazy = False,
            cascade = 'all, delete'
        )

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name
        }