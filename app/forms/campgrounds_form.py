from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, FloatField, TextAreaField, RadioField
from wtforms.validators import DataRequired
from app.models import Activity, Amenity

class CampgroundForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    location = StringField('location', validators=[DataRequired()])
    sites = IntegerField('acres', validators=[DataRequired()])
    guests = IntegerField('capacity', validators=[DataRequired()])
    host_id = IntegerField('host_id')
    price = FloatField('price', validators=[DataRequired()])
    min_nights = IntegerField('min_nights', validators=[DataRequired()])
    max_nights = IntegerField('max_nights', validators=[DataRequired()])
    checkin_time = StringField('checkin_time',validators=[DataRequired()])
    checkout_time = StringField('checkout_time', validators=[DataRequired()])
    description = TextAreaField('description', validators=[DataRequired()])
    