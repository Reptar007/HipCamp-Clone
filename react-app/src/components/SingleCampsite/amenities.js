function Amenities({ camp }) {

    const amenities = camp?.Amenities

    let kitchenContent;
    amenities?.some((amenity) => amenity.id === 9)
      ? (kitchenContent = (
          <div className="amenity_icons_single">
            <i class="fa-thin fa-utensils"></i>
            <h4> Kitchen </h4>
          </div>
        ))
      : (kitchenContent = (
          <div className="amenity_icons_single none">
            <i class="fa-light fa-utensils-slash"></i>
            <h4>  No Kitchen </h4>
          </div>
        ));

    let waterContent;
    amenities?.some((amenity) => amenity.id === 4)
      ? (waterContent = (
          <div className="amenity_icons_single">
            <i class="fa-thin fa-droplet"></i>
            <h4> Drinking Water </h4>
          </div>
        ))
      : (waterContent = (
          <div className="amenity_icons_single none">
            <i class="fa-light fa-droplet-slash"></i>
            <h4> No Drinking Water </h4>
          </div>
        ));

    let wifiContent;
    amenities?.some((amenity) => amenity.id === 3)
      ? (wifiContent = (
          <div className="amenity_icons_single">
            <i class="fa-thin fa-wifi"></i>
            <h4> Wifi </h4>
          </div>
        ))
      : (wifiContent = (
          <div className="amenity_icons_single none">
            <i class="fa-thin fa-wifi-slash"></i>
            <h4> No Wifi </h4>
          </div>
        ));

    let showerContent;
    amenities?.some((amenity) => amenity.id === 7)
      ? (showerContent = (
          <div className="amenity_icons_single">
            <i class="fa-thin fa-bath"></i>
            <h4> Showers </h4>
          </div>
        ))
      : (showerContent = (
          <div className="amenity_icons_singleNone">
            <img src="https://i.imgur.com/8GYM484.png" alt="no showers" />
            <h4> No Showers </h4>
          </div>
        ));

    let trashContent;
    amenities?.some((amenity) => amenity.id === 6)
      ? (trashContent = (
          <div className="amenity_icons_single">
            <i class="fa-thin fa-trash"></i>
            <h4> Bins </h4>
          </div>
        ))
      : (trashContent = (
          <div className="amenity_icons_single none">
            <i class="fa-thin fa-trash-slash"></i>
            <h4> No Bins </h4>
          </div>
        ));


    return (
      <div className="amenities">
        <h2>Amenities</h2>
        <div className="amenities_icons">
          {kitchenContent}
          {waterContent}
          {wifiContent}
          {showerContent}
          {trashContent}
        </div>
      </div>
    );
}

export default Amenities