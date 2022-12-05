import axiosClient from "./axiosClient";

const chapterApi = {
    getChapter: (comicSlug, chapter) =>
        axiosClient.get(`get-episode/${comicSlug}/${chapter}`),
    acceptView: (comicSlug, chapter, viewId) =>
        axiosClient.put(`accept-view/${comicSlug}/${chapter}`, {
            view_id: viewId,
        }),
};

export default chapterApi;
