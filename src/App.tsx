import WebsiteDetails from "./components/WebsiteDetails";
import ReviewSection from "./components/ReviewSection";
import MostFeedbackSection from "./components/MostFeedbackSection";
import RecentFeedbackSection from "./components/RecentFeedbackSection";
import InformationProvider from "./provider/informationProvider";
import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

interface IWebsiteInfo {
  mostCommonFeedback: FeedbackItem[];
  recentReviews: RecentReview[];
  website: {
    _id: string;
    rating: number;
    verified: boolean;
  };
  _id?: string;
}

export interface RecentReview {
  _id: string;
  reviewMessage: string;
  createdAt: string;
}

export interface FeedbackItem {
  feedbackName: string;
  count: number;
}

function App() {
  const [selectedOptions, setSelectedOptions] = useState({
    productQuality: [],
    customerService: [],
    platformExperience: [],
  });

  const [dropdowns, setDropdowns] = useState({
    productQuality: false,
    customerService: false,
    platformExperience: false,
  });
  const [reviewMessage, setReviewMessage] = useState("");
  const [currentUrl, assignUrl] = useState("");
  const [favicon, setFavicon] = useState("");
  const [websiteInfo, setWebsiteInfo] = useState<IWebsiteInfo>();
  const [fetchingWebsite, setFetchingWebsite] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getCurrentURL = async () => {
      if (!chrome?.tabs?.query) {
        assignUrl("Chrome API not available");
        return;
      }

      const tabs = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });

      if (!tabs?.[0]?.url) {
        assignUrl("No URL found");
        return;
      }

      const url = new URL(tabs[0].url);
      assignUrl(url.origin);
      setFavicon(tabs[0].favIconUrl || "");
    };
    getCurrentURL();
  }, []);

  useEffect(() => {
    const getinfo = async () => {
      setFetchingWebsite(true); // Add this line
      try {
        const result = await axios.get(
          `http://localhost:8080/api/v1/website/check?name=${currentUrl}`
        );
        setWebsiteInfo(result?.data?.data);
      } catch (error) {
        console.error("Error fetching website info:", error);
        toast.error("Failed to fetch website information");
      } finally {
        setFetchingWebsite(false); // Add this line
      }
    };

    if (currentUrl) {
      getinfo();
    }
  }, [currentUrl]);

  const websiteID = websiteInfo?._id ?? websiteInfo?.website?._id;
  const recentReviews: RecentReview[] = websiteInfo?.recentReviews || [];
  const isVerified = websiteInfo?.website?.verified;
  const rating = websiteInfo?.website?.rating;
  const commonFeedback: FeedbackItem[] = websiteInfo?.mostCommonFeedback || [];

  const reviewHandler = async () => {
    setIsSubmitting(true);
    try {
      const reviewPayload = {
        siteId: websiteID,
        feedback: selectedOptions,
        reviewMessage,
      };
      const result = await axios.post(
        "http://localhost:8080/api/v1/website/review",
        reviewPayload
      );

      if (result?.data?.success) {
        toast.success("Thank you for your review.");
        setReviewMessage("");
        setSelectedOptions({
          productQuality: [],
          customerService: [],
          platformExperience: [],
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to submit review");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 w-[550px]">
      <InformationProvider>
        {/* Website Reputation Section */}
        <WebsiteDetails
          url={currentUrl}
          favicon={favicon}
          isVerified={isVerified || false}
          rating={rating || 0}
        />

        {commonFeedback.length > 0 && (
          <div className="border flex-1 rounded-lg shadow-lg bg-white w-full h-fit p-4 mb-20">
            {/* Most Common Feedback Section */}
            <MostFeedbackSection feedback={commonFeedback} />
            {/* Recent Feedback Section */}
            <RecentFeedbackSection
              reviewHandler={reviewHandler}
              reviews={recentReviews}
              fetchingWebsite={fetchingWebsite}
              isSubmitting={isSubmitting}
            />
          </div>
        )}

        {/* Review Section */}
        <ReviewSection
          id={websiteID}
          setDropdowns={setDropdowns}
          setSelectedOptions={setSelectedOptions}
          dropdowns={dropdowns}
          selectedOptions={selectedOptions}
          setReviewMessage={setReviewMessage}
          reviewMessage={reviewMessage}
        />
        <button
          onClick={reviewHandler}
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-blue-400"
        >
          {isSubmitting ? (
            <svg
              aria-hidden="true"
              role="status"
              className="inline w-4 h-4 me-3 text-white animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor"
              />
            </svg>
          ) : (
            "Submit Review"
          )}
        </button>
      </InformationProvider>
      <Toaster />
    </div>
  );
}

export default App;
