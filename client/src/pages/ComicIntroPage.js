import React, { useEffect, useState } from "react";
import ComicChapters from "../components/comic/comic-desc/ComicChapters";
import ComicTitle from "../components/comic/comic-desc/ComicTitle";

import classes from "../components/comic/comic-desc/ComicDesc.module.css";
import { useParams } from "react-router-dom";
import comicApi from "../api/comicApi";
import Loading from "../components/layouts/loading/Loading";

function ComicIntroPage() {
    const { comicSlug } = useParams();
    const [comic, setComic] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            try {
                setIsLoading(true);
                const { data } = await comicApi.getComic(comicSlug);

                setComic(data?.data);
                setIsLoading(false);
            } catch (e) {
                console.log("getComic", e);
            }
        };

        getData();
    }, [comicSlug]);

    return (
        <div className={classes.container}>
            <ComicTitle info={comic} />
            <hr
                style={{
                    marginTop: "2rem",
                    marginBottom: "2rem",
                }}
            />
            <ComicChapters chapters={comic?.episodes} comicSlug={comic?.slug} />
            <Loading isLoading_={isLoading} />
        </div>
    );
}

export default ComicIntroPage;
