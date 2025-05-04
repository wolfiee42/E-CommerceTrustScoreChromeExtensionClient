import React from "react";

interface MostFeedbackSectionProps {
  feedback: { feedbackName: string; count: number }[];
}

const MostFeedbackSection: React.FC<MostFeedbackSectionProps> = ({
  feedback,
}) => {
  if (feedback.length < 1) {
    return <></>;
  }
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Most Selected Reviews</h2>

      <div className="flex flex-wrap gap-2 ">
        {feedback.map(
          (item: { feedbackName: string; count: number }, index: number) => (
            <span
              key={index}
              className="flex justify-between items-center w-fit sm:w-auto py-[3px] px-[7px] rounded bg-[#007BFF] text-white text-xs font-bold shadow"
            >
              {item.feedbackName}
            </span>
          )
        )}
      </div>
    </div>
  );
};

export default MostFeedbackSection;
