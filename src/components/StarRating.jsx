const StarRating = ({ rating, reviews }) => {
  const totalStars = 5;

  return (
    <div className="star-rating">
      <span className="rating-number">{rating}</span>
      {[...Array(totalStars)].map((star, index) => {
        const ratingValue = index + 1;

        return (
          <span key={index} className="star">
            {ratingValue <= rating ? (
              <span className="filled-star">
                <img src="/filledstar.svg" alt="Udfyldt stjerne" />
              </span>
            ) : (
              <span className="empty-star">
                <img src="/emptystar.svg" alt="Tom stjerne" />
              </span>
            )}
          </span>
        );
      })}
      <span className="reviews">({reviews})</span>
    </div>
  );
};

export default StarRating;
