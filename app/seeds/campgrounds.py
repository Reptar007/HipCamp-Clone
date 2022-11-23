from app.models import db, Campground,CampgroundImage, environment, Activity, Amenity, SCHEMA

def seed_campgrounds():
    Valle = Campground (
        acres = 160,
        capacity = 100,
        host_id = 1,
        name = 'Under Canvas Grand Canyon',
        location = '979 Airpark Ln, Grand Canyon Junction, AZ 86046',
        price = 150,
        lat = 35.65319707673423,
        lng = -112.1535930085954,
        min_nights = 4,
        max_nights = 10,
        checkin_time = '11:00',
        checkout_time = '16:00',
        description = "Leave your camping gear at home: Under Canvas Grand Canyon has all of the camp-ready amenities you’ll need, down to organic bath products and s’mores supplies."
    )

    OakCreek = Campground (
        acres = 100,
        capacity = 56,
        host_id = 2,
        name = 'Pine Flat Campground',
        location = '12248 N. SR 89A, Sedona, Arizona 86336',
        price = '22',
        lat = 35.01252654010134, 
        lng = -111.7385457490757,
        min_nights = 2,
        max_nights = 10,
        checkin_time = '11:00',
        checkout_time = '16:00',
        description = "Pine Flat Campground in scenic Oak Creek Canyon is one of the Forest's most popular campgrounds"
    )

    db.session.add(Valle)
    db.session.add(OakCreek)
    db.session.commit()

    Images1 = [
        {
        'campground_id' : 1,
        'image_url': 'https://i.imgur.com/4ySQX25.png',
        'preview' : True
        },
        {
        'campground_id' : 1,
        'image_url': 'https://i.imgur.com/xMkCWHs.png',
        'preview' : False
        },
        {
        'campground_id' : 1,
        'image_url': 'https://i.imgur.com/DXpvWTF.png',
        'preview' : False
        },
        {
        'campground_id' : 1,
        'image_url': 'https://i.imgur.com/RIm8moO.png',
        'preview' : False
        }
    ]

    Images2 = [
        {
        'campground_id' : 2,
        'image_url': 'https://i.imgur.com/ThPi2JS.png',
        'preview' : True
        },
        {
        'campground_id' : 2,
        'image_url': 'https://i.imgur.com/EHvTxNV.png',
        'preview' : False
        },
        {
        'campground_id' : 2,
        'image_url': 'https://i.imgur.com/iTS62sm.png',
        'preview' : False
        },
        {
        'campground_id' : 2,
        'image_url': 'https://i.imgur.com/HmftfiE.png',
        'preview' : False
        }
    ]

    db.session.bulk_insert_mappings(CampgroundImage, Images1)
    db.session.bulk_insert_mappings(CampgroundImage, Images2)
    db.session.commit()

    cabin = Amenity (
        name = 'cabin'
    )
    picknicTable = Amenity (
        name = 'picknic table'
    )
    wifi = Amenity (
        name = 'wifi'
    )
    water = Amenity (
        name = 'drinking water'
    )
    laundry = Amenity (
        name = 'laundry'
    )
    pets = Amenity (
        name = 'pets'
    )
    trash = Amenity (
        name = 'trash can'
    )
    shower = Amenity (
        name = 'showers'
    )
    toliet = Amenity (
        name = 'toliets'
    )
    kitchen = Amenity (
        name = 'kitchens'
    )
    hottub = Amenity (
        name = 'hot tub'
    )
    parking = Amenity (
        name = 'parking'
    )
    campfires = Amenity (
        name = 'campfires'
    )

    db.session.add(cabin)
    db.session.add(picknicTable)
    db.session.add(wifi)
    db.session.add(water)
    db.session.add(laundry)
    db.session.add(trash)
    db.session.add(shower)
    db.session.add(toliet)
    db.session.add(kitchen)
    db.session.add(hottub)
    db.session.add(parking)
    db.session.add(campfires)
    db.session.commit()

    hiking = Activity (
        name = 'hiking'
    )
    paddling = Activity(
        name = 'paddling'
    )
    biking = Activity (
        name = 'biking'
    )
    fishing = Activity (
        name = 'fishing'
    )
    watching = Activity (
        name = 'Wildlife Watching'
    )
    swimming = Activity (
        name = 'swimming'
    )
    climbing = Activity (
        name = 'climbing'
    )
    horseback = Activity (
        name = 'horseback'
    )

    db.session.add(hiking)
    db.session.add(paddling)
    db.session.add(biking)
    db.session.add(swimming)
    db.session.add(fishing)
    db.session.add(watching)
    db.session.add(climbing)
    db.session.add(horseback)
    db.session.commit()


    Valle.amenity.append(cabin)
    Valle.amenity.append(picknicTable)
    Valle.amenity.append(wifi)
    Valle.amenity.append(water)
    Valle.amenity.append(laundry)
    Valle.amenity.append(pets)

    Valle.activity.append(hiking)
    Valle.activity.append(biking)
    Valle.activity.append(swimming)

    OakCreek.amenity.append(water)
    OakCreek.amenity.append(pets)
    OakCreek.amenity.append(picknicTable)

    OakCreek.activity.append(hiking)
    OakCreek.activity.append(biking)
    OakCreek.activity.append(swimming)

    db.session.commit()


def undo_campgrounds():
    if environment == 'production':
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.campgrounds RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute('DELETE FROM campgrounds')

    db.session.commit()


def undo_campgroundsImages():
    if environment == 'production':
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.campgroundImages RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute('DELETE FROM campgroundImages')

    db.session.commit()


def undo_campground_amenities():
    if environment == 'production':
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.campground_amenities RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute('DELETE FROM campground_amenities')

    db.session.commit()


def undo_campground_activities():
    if environment == 'production':
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.campground_activities RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute('DELETE FROM campground_activities')

    db.session.commit()

def undo_activities():
    if environment == 'production':
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.activities RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute('DELETE FROM activities')

    db.session.commit()


def undo_amenities():
    if environment == 'production':
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.amenities RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute('DELETE FROM amenities')

    db.session.commit()