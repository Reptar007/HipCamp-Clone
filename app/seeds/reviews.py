from app.models import db, environment, SCHEMA, Review

def seed_reviews():
    first_reviews = [
        {
        'author_id' : 1,
        'campground_id' : 1,
        'rating': 4.3,
        'body' : 'dis place was pretty cool'
        },
        {
        'author_id' : 2,
        'campground_id' : 1,
        'rating': 4.0,
        'body' : 'dis was niiiice'
        },
        {
        'author_id' : 3,
        'campground_id' : 1,
        'rating': 4.8,
        'body' : 'woooow'
        }
    ]

    second_reviews = [
        {
        'author_id' : 1,
        'campground_id' : 2,
        'rating': 4.3,
        'body' : 'dis niiice'
        },
        {
        'author_id' : 2,
        'campground_id' : 2,
        'rating': 4.3,
        'body' : 'wud com back'
        },
        {
        'author_id' : 3,
        'campground_id' : 2,
        'rating': 4.3,
        'body' : 'dis berry nice'
        }
    ]

    db.session.bulk_insert_mappings(Review, first_reviews)
    db.session.bulk_insert_mappings(Review, second_reviews)
    db.session.commit()

def undo_reviews():
    if environment == 'production':
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute('DELETE FROM reviews')

    db.session.commit()