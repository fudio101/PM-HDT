import React from "react";
import ComicChapters from "../components/comic/comic-desc/ComicChapters";
import ComicTitle from "../components/comic/comic-desc/ComicTitle";

import classes from "../components/comic/comic-desc/ComicDesc.module.css";
function ComicIntroPage() {
  return (
    <div className={classes.container}>
      <ComicTitle />
      <ComicChapters />
    </div>
  );
}

export default ComicIntroPage;
