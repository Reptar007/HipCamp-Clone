from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired

class ImageForm(FlaskForm):
    campground_id = IntegerField('camground_id')
    image_url = StringField('image_url', DataRequired) 