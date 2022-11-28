

function Essentials({ camp }) {

    const amenities = camp?.Amenities;

    let campfireContent;
    amenities?.some((amenity) => amenity.id === 12)
      ? (campfireContent = (
          <div className="essentials_icons_campfire">
            <i class="fa-thin fa-fire-smoke"></i>
            <h4> Campfire </h4>
          </div>
        ))
      : (campfireContent = (
          <div className="essentials_icons_campfireNone">
            <img src="https://i.imgur.com/covWqPX.png" alt="nocampfire" />
            <h4> No Campfires </h4>
          </div>
        ));

        let tolietContent;
        amenities?.some((amenity) => amenity.id === 8)
          ? (tolietContent = (
              <div className="essentials_icons_toliets">
                <i class="fa-light fa-toilet-paper-under"></i>
                <h4> Toilet </h4>
              </div>
            ))
          : (tolietContent = (
              <div className="essentials_icons_toliets none">
                <i class="fa-light fa-toilet-paper-under-slash"></i>
                <h4>  No Toilet </h4>
              </div>
            ));

        let petContent;
        amenities?.some((amenity) => amenity.id === 13)
          ? (petContent = (
              <div className="essentials_icons_toliets">
                <i class="fa-thin fa-dog"></i>
                <h4> Pets </h4>
              </div>
            ))
          : (petContent = (
              <div className="essentials_icons_campfireNone">
                <img src="https://i.imgur.com/6AG3scv.png" alt="no pets" />
                <h4> No Pets </h4>
              </div>
            ));

    return (
      <div className="essentials">
        <h2>Essentials</h2>
        <div className="essentials_icons">
          {campfireContent}
          {tolietContent}
          {petContent}
        </div>
      </div>
    );
}

export default Essentials