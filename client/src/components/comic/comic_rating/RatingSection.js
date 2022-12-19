import React from "react";
import { useParams } from "react-router-dom";
import { rateComic } from "../../../redux/reducers/chapterSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import {
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";
import ReactStars from "react-rating-stars-component";
import { unwrapResult } from "@reduxjs/toolkit";

function RatingSection() {
  const [ratingPoint, setRatingPoint] = React.useState(5);
  const options = {
    size: 28,
    count: 5,
    color: "gray",
    activeColor: "yellow",
    value: 5,
    a11y: true,
    isHalf: false,
    emptyIcon: <i className="far fa-star" />,
    halfIcon: <i className="fa fa-star-half-alt" />,
    filledIcon: <i className="fa fa-star" />,
    onChange: (newValue) => {
      setRatingPoint(newValue);
    },
  };
  const dispatch = useDispatch();
  const { comicSlug } = useParams();
  const ratingHandler = async () => {
    try {
      unwrapResult(
        await dispatch(rateComic({ slug: comicSlug, rating: ratingPoint }))
      );
      toast("Cảm Ơn Bạn Đã Phản Hồi 💕", {
        type: "success",
      });
    } catch (error) {}
  };

  return (
    <>
      <Popover>
        <PopoverHandler>
          <button
            className={
              "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 "
            }
          >
            Đánh Giá
          </button>
        </PopoverHandler>
        <PopoverContent>
          <div className="flex gap-x-6">
            <div className="mx-2">
              <ReactStars {...options} />
            </div>
            <div>
              <button
                className={
                  "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                }
                onClick={ratingHandler}
              >
                Submit
              </button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}

export default RatingSection;
