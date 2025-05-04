import React from "react";
import StarRatings from "react-star-ratings";
import { HiCheckBadge } from "react-icons/hi2";
import { MdRadioButtonChecked } from "react-icons/md";

interface WebsiteDetailsProps {
  url: string;
  favicon: string;
  isVerified: boolean;
  rating?: number;
}

const WebsiteDetails: React.FC<WebsiteDetailsProps> = ({
  url,
  favicon,
  isVerified,
  rating = 0, // Provide a default value of 0
}) => {
  // Colors for the progress bar blocks
  const blockColors = [
    "#FF0000", // Dark Red
    "#FF6666",
    "#FF9999",
    "#FFD700",
    "#FFE766", // Orange
    "#FFEC99", // Yellow
    "#99E6B3",
    "#66B266",
    "#008000", // Light Green
  ];

  // Generate the progress bar blocks
  const renderProgressBlocks = () => {
    const safeRating = typeof rating === "number" ? rating : 0;
    return blockColors.map((color, index) => {
      const blockRating = (index + 1) * (5 / 9);
      const isFilled = safeRating >= blockRating;
      const isPartiallyFilled = !isFilled && safeRating > blockRating - 5 / 9;
      const fillPercentage = isPartiallyFilled
        ? ((safeRating - (blockRating - 5 / 9)) / (5 / 9)) * 100
        : 0;

      return (
        <div
          key={index}
          className="w-4 h-4 border border-gray-300 relative overflow-hidden"
          style={{ backgroundColor: isFilled ? color : "#f0f0f0" }}
        >
          {isPartiallyFilled && (
            <div
              className="absolute top-0 bottom-0 left-0"
              style={{
                backgroundColor: color,
                width: `${fillPercentage}%`,
              }}
            />
          )}
        </div>
      );
    });
  };

  return (
    <div className="border rounded-lg shadow-lg bg-white p-4 w-full mb-6">
      <div className="flex items-center justify-between space-x-4">
        {/* Image Placeholder */}
        <div className="flex items-center">
          <img
            src={favicon || "/placeholder.svg"}
            alt="Website's favicon"
            className="w-12 h-12 rounded-md"
          />
        </div>
        {/* Rating and URL */}
        <div className="flex flex-col items-center">
          {/* Rating Section */}
          <div className="flex flex-col items-center">
            {/* Rating count and star mark  */}
            <div className="flex flex-row gap-2 justify-center items-center">
              {/* Numeric Rating */}
              <span className="text-gray-600 font-bold mt-1">
                {typeof rating === "number" ? `${rating.toFixed(1)}/5` : "N/A"}
              </span>
              {/* Rating Stars */}
              <StarRatings
                rating={typeof rating === "number" ? rating : 0}
                starRatedColor="#007BFF"
                starEmptyColor="#ccc"
                starDimension="24px"
                starSpacing="2px"
                numberOfStars={5}
              />
            </div>

            {/* Progress Bar Section */}
            <div className="flex flex-col w-full mt-2">
              <div className="grid grid-cols-9 gap-1">
                {renderProgressBlocks()}
              </div>
            </div>

            {/* URL */}
            <span className="text-gray-500 text-sm mt-2">{url}</span>
          </div>
        </div>

        {/* Verified Labels */}
        <div className="ml-auto flex flex-col">
          {isVerified ? (
            <span className="text-green-600 text-sm font-bold flex justify-center items-center gap-1">
              <HiCheckBadge className="color-green size-6" /> Registered
              business
            </span>
          ) : (
            <span className="text-red-600 text-sm font-bold flex justify-center items-center gap-1">
              <MdRadioButtonChecked className="color-red size-6" /> Unregistered
              business
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default WebsiteDetails;
