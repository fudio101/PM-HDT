import React, { useEffect, useState } from "react";
import ComicChapters from "../components/comic/comic-desc/ComicChapters";
import ComicTitle from "../components/comic/comic-desc/ComicTitle";

import classes from "../components/comic/comic-desc/ComicDesc.module.css";
import { useParams } from "react-router-dom";
import comicApi from "../api/comicApi";

function ComicIntroPage() {
    const { comicSlug } = useParams();
    const [comic, setComic] = useState();

    useEffect(() => {
        const getData = async () => {
            try {
                const { data } = await comicApi.getComic(comicSlug);

                setComic(data?.data);
            } catch (e) {
                console.log("getComic", e);
            }
        };

        getData();
    }, [comicSlug]);

    return (
        <div className={classes.container}>
            <ComicTitle info={comic} />
            <ComicChapters chapters={comic?.episodes} />
        </div>
    );
}

export default ComicIntroPage;
