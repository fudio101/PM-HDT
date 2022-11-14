import React from "react";
import ComicItem from "../components/item/ComicItem";

import FilterSearch from "../components/item/Filter/FilterSearch";
import PaginatedItems from "../components/item/pagination/PaginatedItem";

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
    name: "Comic Name 123",
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

function SearchPage() {
  const items = [];
  COMIC_ITEM_DATA.map((comic) => {
    return items.push(<ComicItem comic={comic} key={comic.id} />);
  });
  return (
    <>
      <FilterSearch />
      <PaginatedItems data={items} itemsPerPage={4} />
    </>
  );
}

export default SearchPage;
