import React from "react";
import Slider from "react-slick";

import ComicItem from "../components/item/ComicItem";
import SlideBar from "../components/item/Carousel/SlideBar";
import NextArrow from "../components/item/Carousel/NextArrow";
import PrevArrow from "../components/item/Carousel/PrevArrow";

import classes from "./asset/css/HomePage.module.css";

const SLIDER_DATA = [
  {
    id: 1,
    image:
      "https://static.lag.vn/upload/news/22/02/14/knyyy-1-1024x724_PUHV.jpg?w=800&encoder=wic&subsampling=444",
    categories: ["cate1", "cate2", "cate3"],
    name: "Comic Name Here",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores quisquam voluptates eum non sed, necessitatibus repudiandae ratione possimus, quas eius autem vitae recusandae nobis nulla provident maiores numquam adipisci veritatis!",
    authorAvt:
      "https://gamek.mediacdn.vn/133514250583805952/2021/2/5/kmss1-16125223517951309982427.jpg",
    authorName: "Gotoge Koyoharu",
    uploadTime: "Just Now",
  },
  {
    id: 2,
    image:
      "https://static.lag.vn/upload/news/22/02/14/knyyy-1-1024x724_PUHV.jpg?w=800&encoder=wic&subsampling=444",
    categories: ["cate1", "cate2", "cate3"],
    name: "Comic Name Here",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores quisquam voluptates eum non sed, necessitatibus repudiandae ratione possimus, quas eius autem vitae recusandae nobis nulla provident maiores numquam adipisci veritatis!",
    authorAvt:
      "https://gamek.mediacdn.vn/133514250583805952/2021/2/5/kmss1-16125223517951309982427.jpg",
    authorname: "Gotoge Koyoharu",
    uploadTime: "Just Now",
  },
];

const COMIC_ITEM_DATA = [
  {
    id: 1,
    name: "Comic Name",
    image:
      "https://haycafe.vn/wp-content/uploads/2021/12/hinh-anh-naruto-dep-ngau.jpg",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores quisquam voluptates eum non sed, necessitatibus repudiandae ratione possimus, quas eius autem vitae recusandae nobis nulla provident maiores numquam adipisci veritatis!",
    categories: ["cate1", "cate2", "cate3"],
    authorAvt:
      "https://qph.cf2.quoracdn.net/main-qimg-6050518b10b77cab9dfc95c4527c61ff-lq",
    authorName: "By Kishimoto Masashi",
    uploadTime: "JustNow",
  },
  {
    id: 2,
    name: "Comic Name",
    image:
      "https://haycafe.vn/wp-content/uploads/2021/12/hinh-anh-naruto-dep-ngau.jpg",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores quisquam voluptates eum non sed, necessitatibus repudiandae ratione possimus, quas eius autem vitae recusandae nobis nulla provident maiores numquam adipisci veritatis!",
    categories: ["cate1", "cate2", "cate3"],
    authorAvt:
      "https://qph.cf2.quoracdn.net/main-qimg-6050518b10b77cab9dfc95c4527c61ff-lq",
    authorName: "By Kishimoto Masashi",
    uploadTime: "JustNow",
  },
  {
    id: 3,
    name: "Comic Name",
    image:
      "https://haycafe.vn/wp-content/uploads/2021/12/hinh-anh-naruto-dep-ngau.jpg",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores quisquam voluptates eum non sed, necessitatibus repudiandae ratione possimus, quas eius autem vitae recusandae nobis nulla provident maiores numquam adipisci veritatis!",
    categories: ["cate1", "cate2", "cate3"],
    authorAvt:
      "https://qph.cf2.quoracdn.net/main-qimg-6050518b10b77cab9dfc95c4527c61ff-lq",
    authorName: "By Kishimoto Masashi",
    uploadTime: "JustNow",
  },
];

// slider setting
const setting = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
};

function HomePage() {
  return (
    <>
      {/* slider */}
      <div className={`${classes.container} `}>
        {/* <div className={classes.slider}>
          <Slider {...setting}>
            {SLIDER_DATA.map((item) => {
              return <SlideBar item={item} key={item.id} />;
            })}
          </Slider>
        </div> */}
        {/* comic items */}
        <div className={classes.post_list}>
          {COMIC_ITEM_DATA.map((comic) => {
            return <ComicItem comic={comic} key={comic.slug} />;
          })}
        </div>
      </div>
    </>
  );
}

export default HomePage;
