from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, FloatField, TextAreaField, RadioField
from wtforms.validators import DataRequired

class ReviewForm(FlaskForm):
    author_id  = IntegerField('author_id')
    campground_id = IntegerField('campground_id')
    rating = FloatField('rating', validators=[DataRequired()])
    body = StringField('body', validators=[DataRequired()])