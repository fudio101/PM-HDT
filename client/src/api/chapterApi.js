import axiosClient from "./axiosClient";

const chapterApi = {
    getChapter: (comicSlug, chapter) =>
        axiosClient.get(`get-episode/${comicSlug}/${chapter}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("_userToken")}`,
            },
        }),
    acceptView: (comicSlug, chapter, viewId) =>
        axiosClient.put(
            `accept-view/${comicSlug}/${chapter}`,
            {
                view_id: viewId,
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "_userToken"
                    )}`,
                },
            }
        ),
};

export default chapterApi;
