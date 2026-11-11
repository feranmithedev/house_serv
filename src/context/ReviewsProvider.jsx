
import { useEffect, useState } from "react";
import ReviewsContext from "./Reviews";

export function ReviewsProvider({ children }) {
  const [reviews, setReviews] = useState(() => {
    const storedReviews = localStorage.getItem("serviceReviews");

    return storedReviews ? JSON.parse(storedReviews) : [];
  });

  useEffect(() => {
    localStorage.setItem("serviceReviews", JSON.stringify(reviews));
  }, [reviews]);

  function addReview(review) {
    const newReview = {
      id: Date.now(),
      ...review,
      createdAt: new Date().toISOString(),
    };

    setReviews((current) => [newReview, ...current]);
  }

  return (
    <ReviewsContext.Provider
      value={{ reviews, addReview }}
    >
      {children}
    </ReviewsContext.Provider>
  );
}