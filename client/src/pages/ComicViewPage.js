import React from "react";
import classes from "./asset/css/ComicViewPage.module.css";

const EPISODE_IMAGE_COLLECTION = [
  "https://vnw-comic-cdn.popsww.com/api/v2/containers/file4/cms_comic/5eb90e09aa63450033ea5c92/5eb90e97aa63450033ea5c93/VN_AKLong_Ch.000_B.001_1647334348143-parts-05.jpg?format=webp",
  "https://vnw-comic-cdn.popsww.com/api/v2/containers/file4/cms_comic/5eb90e09aa63450033ea5c92/5eb90e97aa63450033ea5c93/VN_AKLong_Ch.000_B.001_1647334348143-parts-05.jpg?format=webp",
  "https://vnw-comic-cdn.popsww.com/api/v2/containers/file4/cms_comic/5eb90e09aa63450033ea5c92/5eb90e97aa63450033ea5c93/VN_AKLong_Ch.000_B.001_1647334348143-parts-05.jpg?format=webp",
  "https://vnw-comic-cdn.popsww.com/api/v2/containers/file4/cms_comic/5eb90e09aa63450033ea5c92/5eb90e97aa63450033ea5c93/VN_AKLong_Ch.000_B.001_1647334348143-parts-05.jpg?format=webp",
  "https://vnw-comic-cdn.popsww.com/api/v2/containers/file4/cms_comic/5eb90e09aa63450033ea5c92/5eb90e97aa63450033ea5c93/VN_AKLong_Ch.000_B.001_1647334348143-parts-05.jpg?format=webp",
  "https://vnw-comic-cdn.popsww.com/api/v2/containers/file4/cms_comic/5eb90e09aa63450033ea5c92/5eb90e97aa63450033ea5c93/VN_AKLong_Ch.000_B.001_1647334348143-parts-05.jpg?format=webp",
  "https://vnw-comic-cdn.popsww.com/api/v2/containers/file4/cms_comic/5eb90e09aa63450033ea5c92/5eb90e97aa63450033ea5c93/VN_AKLong_Ch.000_B.001_1647334348143-parts-05.jpg?format=webp",
  "https://vnw-comic-cdn.popsww.com/api/v2/containers/file4/cms_comic/5eb90e09aa63450033ea5c92/5eb90e97aa63450033ea5c93/VN_AKLong_Ch.000_B.001_1647334348143-parts-05.jpg?format=webp",
];

function ComicViewPage() {
  return (
    <div className={classes.container}>
      {EPISODE_IMAGE_COLLECTION.map((image) => {
        return <img src={image} alt="error"></img>;
      })}
    </div>
  );
}

export default ComicViewPage;
