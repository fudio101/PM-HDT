import axiosClient from "./axiosClient";

const chapterApi = {
    getChapter: (comicSlug, chapter) =>
        axiosClient.get(`get-episode/${comicSlug}/${chapter}`),
};

export default chapterApi;
