/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import axios from "axios";
import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const ReviewSection = ({
  id,
  setDropdowns,
  setSelectedOptions,
  dropdowns,
  selectedOptions,
  setReviewMessage,
  reviewMessage,
}: any) => {
  const [productQualityOption, setProductQualityOption] = useState([
    { name: "High Quality", baseRating: 5 },
    { name: "Poor Quality", baseRating: 1 },
    { name: "Durable", baseRating: 4 },
    { name: "Genuine", baseRating: 4.5 },
    { name: "Damaged Product", baseRating: 1 },
  ]);

  const [customerServiceOptions, setCustomerServiceOptions] = useState([
    { name: "Helpful Support", baseRating: 5 },
    { name: "Rude Staff/Mannerless staff", baseRating: 1 },
    { name: "Delayed Response", baseRating: 2 },
    { name: "Unresponsive", baseRating: 1.5 },
    { name: "Misleading Information", baseRating: 1.25 },
  ]);

  const [platformExperienceOptions, setPlatformExperienceOptions] = useState([
    { name: "Easy to Use", baseRating: 5 },
    { name: "Complicated Navigation", baseRating: 1.5 },
    { name: "Payment Issues", baseRating: 1 },
    { name: "Smooth Experience", baseRating: 1.5 },
    { name: "Data Privacy", baseRating: 4 },
  ]);

  const toggleDropdown = (category: string) => {
    setDropdowns((prev: any) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleCheckboxChange = (
    category: string,
    value: string,
    baseRating: number
  ) => {
    setSelectedOptions((prev: any) => {
      const categoryValues = prev[category];
      const exists = categoryValues.find((item: any) => item.name === value);

      if (exists) {
        // Remove the item if it already exists
        return {
          ...prev,
          [category]: categoryValues.filter((item: any) => item.name !== value),
        };
      } else {
        // Add the new item
        return {
          ...prev,
          [category]: [...categoryValues, { name: value, baseRating }],
        };
      }
    });
  };

  useEffect(() => {
    const getData = async () => {
      const result = await axios.get(
        `http://localhost:8080/api/v1/website/ai-generated-feedback/${id}`
      );
      const { ProductQuality, CustomerServices, PlatformExperience } =
        result.data.data;

      setProductQualityOption((prev: any) => {
        const backendOptions = ProductQuality.map((item: any) => ({
          name: item.name,
          baseRating: item.baseRating,
        }));

        const mergedOptions = [
          ...prev,
          ...backendOptions.filter(
            (backendItem: any) =>
              !prev.some(
                (existingItem: any) => existingItem.name === backendItem.name
              )
          ),
        ];
        return mergedOptions;
      });

      setCustomerServiceOptions((prev: any) => {
        const backendOptions = CustomerServices.map((item: any) => ({
          name: item.name,
          baseRating: item.baseRating,
        }));

        const mergedOptions = [
          ...prev,
          ...backendOptions.filter(
            (backendItem: any) =>
              !prev.some(
                (existingItem: any) => existingItem.name === backendItem.name
              )
          ),
        ];
        return mergedOptions;
      });

      setPlatformExperienceOptions((prev: any) => {
        const backendOptions = PlatformExperience.map((item: any) => ({
          name: item.name,
          baseRating: item.baseRating,
        }));

        const mergedOptions = [
          ...prev,
          ...backendOptions.filter(
            (backendItem: any) =>
              !prev.some(
                (existingItem: any) => existingItem.name === backendItem.name
              )
          ),
        ];
        return mergedOptions;
      });
    };

    getData();
  }, [id]);

  return (
    <div className="p-4 max-w-xl mx-auto bg-white shadow-md rounded-md mb-6">
      <div className="grid grid-cols-1 gap-2">
        {/* Product Quality */}
        <div>
          <div
            onClick={() => toggleDropdown("productQuality")}
            className="text-sm cursor-pointer w-full flex justify-between items-center text-left bg-gray-100 px-4 py-2 rounded hover:bg-gray-200 focus:outline-none font-medium text-gray-700"
          >
            <span>Product Quality</span>
            <IoIosArrowDown />
          </div>
          {dropdowns.productQuality && (
            <div className="mt-2 p-4 bg-gray-50 border rounded">
              {productQualityOption.map((option) => (
                <label key={option.name} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    className="form-checkbox h-3 w-3 text-blue-600"
                    value={option.name}
                    checked={selectedOptions.productQuality.some(
                      (item: any) => item.name === option.name
                    )}
                    onChange={() =>
                      handleCheckboxChange(
                        "productQuality",
                        option.name,
                        option.baseRating
                      )
                    }
                  />
                  <span className="ml-2 text-gray-700 text-xs ">
                    {option.name}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Customer Service */}
        <div>
          <div
            onClick={() => toggleDropdown("customerService")}
            className="text-sm cursor-pointer w-full flex justify-between items-center text-left bg-gray-100 px-4 py-2 rounded hover:bg-gray-200 focus:outline-none font-medium text-gray-700"
          >
            <span>Customer Service</span>
            <IoIosArrowDown />
          </div>
          {dropdowns.customerService && (
            <div className="mt-2 p-4 bg-gray-50 border rounded">
              {customerServiceOptions.map((option) => (
                <label key={option.name} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    className="form-checkbox h-3 w-3 text-blue-600"
                    value={option.name}
                    checked={selectedOptions.customerService.some(
                      (item: any) => item.name === option.name
                    )}
                    onChange={() =>
                      handleCheckboxChange(
                        "customerService",
                        option.name,
                        option.baseRating
                      )
                    }
                  />
                  <span className="ml-2 text-gray-700 text-xs">
                    {option.name}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Platform Experience */}
        <div>
          <div
            onClick={() => toggleDropdown("platformExperience")}
            className="text-sm cursor-pointer w-full flex justify-between items-center text-left bg-gray-100 px-4 py-2 rounded hover:bg-gray-200 focus:outline-none font-medium text-gray-700"
          >
            <span>Platform Experience</span>
            <IoIosArrowDown />
          </div>
          {dropdowns.platformExperience && (
            <div className="mt-2 p-4 bg-gray-50 border rounded">
              {platformExperienceOptions.map((option) => (
                <label key={option.name} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    className="form-checkbox h-3 w-3 text-blue-600"
                    value={option.name}
                    checked={selectedOptions.platformExperience.some(
                      (item: any) => item.name === option.name
                    )}
                    onChange={() =>
                      handleCheckboxChange(
                        "platformExperience",
                        option.name,
                        option.baseRating
                      )
                    }
                  />
                  <span className="ml-2 text-gray-700 text-xs">
                    {option.name}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        <div className="mt-4">
          <label
            htmlFor="review"
            className="block text-sm font-medium text-gray-700"
          >
            Your Review
          </label>
          <textarea
            id="review"
            value={reviewMessage}
            onChange={(e) => setReviewMessage(e.target.value)}
            rows={4}
            className="mt-1 block w-full bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2"
            placeholder="Share your experience here..."
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;
