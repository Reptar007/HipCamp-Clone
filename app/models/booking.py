from .db import db, environment, SCHEMA, add_prefix_for_prod


class Booking(db.Model):
    __tablename__ = 'bookings'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    start_date = db.Column(db.DateTime, nullable=False)
    end_date = db.Column(db.DateTime, nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    campId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('campgrounds.id')), nullable=False)

    reservation = db.relationship('User', back_populates = 'bookings', lazy=False)
    camp = db.relationship('Campground', back_populates = 'bookings', lazy=False)

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'campId': self.campId,
            'start_date': self.start_date,
            'end_date': self.end_date,
            'Camp' : self.camp.to_dict_booking()
        }