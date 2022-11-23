from .db import db, environment, SCHEMA, add_prefix_for_prod

class CampgroundImage(db.Model):
    __tablename__ = 'campgroundimages'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    campground_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('campgrounds.id')), nullable=False)
    image_url = db.Column(db.String, nullable=False)
    preview = db.Column(db.Boolean, default=False)

    spot = db.relationship("Campground", back_populates='image')

    def to_dict(self):
        return {
            'id': self.id,
            'campground_id': self.campground_id,
            'image_url': self.image_url
        }