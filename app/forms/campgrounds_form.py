from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, FloatField, TextAreaField, RadioField
from wtforms.validators import DataRequired
from app.models import Activity, Amenity

allActivities = Activity.query.all()
allAmenities = Amenity.query.all()


class CampgroundForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    location = StringField('location', validators=[DataRequired()])
    acres = IntegerField('acres', validators=[DataRequired()])
    capacity = IntegerField('capacity', validators=[DataRequired()])
    host_id = IntegerField('host_id')
    price = FloatField('price', validators=[DataRequired()])
    lat = FloatField('lat', validators=[DataRequired()])
    lng = FloatField('lng', validators=[DataRequired()])
    min_nights = IntegerField('min nights', validators=[DataRequired()])
    max_nights = IntegerField('max nights', validators=[DataRequired()])
    checkin_time = StringField('checkin time',validators=[DataRequired()])
    ckeckout_time = StringField('checkout time', validators=[DataRequired()])
    description = TextAreaField('description', validators=[DataRequired()])
    