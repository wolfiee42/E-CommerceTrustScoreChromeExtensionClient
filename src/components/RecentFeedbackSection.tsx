/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { RecentReview } from "../App";
import { time } from "../utils/time";

const RecentFeedbackSection = ({
  // reviewHandler,
  reviews,
}: // isSubmitting,
any) => {
  const [visibleReviews, setVisibleReviews] = useState(3);

  const handleReadMore = () => {
    setVisibleReviews((prev) => prev + reviews.length);
  };

  return (
    <div className="mt-5">
      {reviews.length < 1 ? (
        <></>
      ) : (
        <>
          <h2 className="text-lg font-semibold flex items-center mb-4">
            {/* <span className="mr-2 text-green-500">&#10003;</span> */}
            Recent Feedbacks
          </h2>
          <ul className="mb-4 max-h-[400px] overflow-auto">
            {reviews
              .slice(0, visibleReviews)
              .map((item: RecentReview, index: number) => (
                <li key={index} className="mb-2 border-b border-gray-200 p-1">
                  <p className="text-sm text-gray-700">{item.reviewMessage}</p>
                  <span className="text-xs text-gray-500">
                    {time(item.createdAt)}
                  </span>
                </li>
              ))}
          </ul>
          {visibleReviews < reviews.length && (
            <div className="flex justify-end items-center">
              <button
                onClick={handleReadMore}
                className=" text-gray-700 px-4 rounded-lg underline mb-1 hover:cursor-pointer"
              >
                See all
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RecentFeedbackSection;
