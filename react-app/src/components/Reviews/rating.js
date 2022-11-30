import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const StarHovering = ({ stars, setStars }) => {
  const [hover, setHover] = useState(null);

  return (
    <div className="stars-wrapper">
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;

        return (
          <label>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => setStars(ratingValue)}
            />
            <FaStar
              className="star"
              color={ratingValue <= (hover || stars) ? "#ECA72C" : "#e4e5e9"}
              size={20}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
    </div>
  );
};

export default StarHovering;
