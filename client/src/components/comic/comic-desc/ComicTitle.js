import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { readComicSelector } from "../../../redux/selectors";
import RatingSection from "../comic_rating/RatingSection";
import ReactStars from "react-rating-stars-component";

import classes from "./ComicDesc.module.css";

function ComicTitle({ info }) {
  const readComic = useSelector(readComicSelector(info?.slug)) ?? 0;
  const firstChapter = info?.episodes?.at(-1)?.episode_number;

  return (
    <>
      <div className={"grid grid-cols-12  place-items-center"}>
        <div className={"col-span-4 w-full"}>
          <img
            alt="something went wrong"
            className="w-full"
            src={info?.image_url}
          />
        </div>
        <div className={"col-span-8 "}>
          <div>
            <h1 className="font-bold text-2xl py-3 opacity-90">{info?.name}</h1>
            <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
              <li className="pb-3 sm:pb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      Tác Giả
                    </p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900">
                    {info?.author?.name}
                  </div>
                </div>
              </li>
              <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      Quốc Gia
                    </p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900">
                    {info?.country?.name}
                  </div>
                </div>
              </li>
              <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      Xuất Bản
                    </p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900">
                    {info?.published_date}
                  </div>
                </div>
              </li>
              <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      Số Chương
                    </p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900">
                    {info?.num_of_episodes ? info?.num_of_episodes : 0}
                  </div>
                </div>
              </li>
              <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-gray-500 truncate dark:text-gray-400">
                      {info?.rating && (
                        <ReactStars
                          count={5}
                          size={24}
                          activeColor="#ffd700"
                          value={Number(Math.round(info?.rating * 10) / 10)}
                          edit={false}
                          isHalf={true}
                        />
                      )}
                    </div>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900">
                    {`${
                      info?.rating ? Number(info?.rating).toFixed(1) : "-.-"
                    } / 5`}
                  </div>
                </div>
              </li>
              <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-1 min-w-0">
                    <p className="t Quốc Giaext-sm text-gray-500 truncate dark:text-gray-400">
                      Danh Mục
                    </p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900">
                    <ul className={classes.cates_list}>
                      {info?.categories.map((cate, index) => {
                        return (
                          <li key={cate.id}>
                            <Link to={`../../category/${cate.id}`}>
                              {cate.name}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex gap-x-4 pt-8 justify-center">
        <div className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900">
          <Link to={`../../chapter/${info?.slug}/${firstChapter}`}>
            Đọc từ đầu
          </Link>
        </div>
        {readComic > 0 && (
          <div className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
            <Link to={`../../chapter/${info?.slug}/${readComic}`}>
              Đọc tiếp
            </Link>
          </div>
        )}

        <div>
          <RatingSection />
        </div>

        {/* <li className={classes.li02}>Theo dõi</li> */}

        {/* <li className={classes.li03}>Thích</li> */}
      </div>

      <div className={`classes.desc_section`}>
        <h3 className="font-bold text-xl opacity-90 pb-4">Giới thiệu:</h3>
        <p className={classes.desc_detail}>{info?.description}</p>
      </div>
    </>
  );
}

export default ComicTitle;
