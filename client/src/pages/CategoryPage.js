import React from "react";

import CategoryList from "../components/item/List/CategoryList";

const COMIC_CATEGORY_ITEM_DATA = [
  {
    category: "category Name 1",
    comics: [
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
      {
        id: 4,
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
        id: 5,
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
    ],
  },
  {
    category: "category Name 2",
    comics: [
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
      {
        id: 4,
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
        id: 5,
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
    ],
  },
];

function CategoryPage() {
  return (
    <div>
      {COMIC_CATEGORY_ITEM_DATA.map((item, index) => {
        return (
          <CategoryList
            category={item.category}
            comics={item.comics}
            key={index}
          />
        );
      })}
    </div>
  );
}

export default CategoryPage;
