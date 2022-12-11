import axiosClient from "./axiosClient";

const chapterApi = {
    getChapter: (token, comicSlug, chapter) =>
        axiosClient.get(`get-episode/${comicSlug}/${chapter}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }),
    acceptView: (token, comicSlug, chapter, viewId) =>
        axiosClient.put(
            `accept-view/${comicSlug}/${chapter}`,
            {
                view_id: viewId,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        ),
};

export default chapterApi;
