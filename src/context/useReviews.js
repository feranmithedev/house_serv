
import { useContext } from "react";
import ReviewsContext from "./Reviews";

export function useReviews() {
  return useContext(ReviewsContext);
}
