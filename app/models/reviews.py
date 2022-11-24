from .db import db, environment, SCHEMA, add_prefix_for_prod

class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    author_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    campground_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('campgrounds.id')))
    rating = db.Column(db.Float, nullable=False)
    body = db.Column(db.String, nullable=False)

    campground = db.relationship("Campground", back_populates='review')

    def to_dict(self):
        return {
            'id' : self.id,
            'author_id' : self.author_id,
            'campground_id' : self.campground_id,
            'rating' : self.rating,
            'body' : self.body
        }