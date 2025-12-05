// import api from "./api";
//
//
// export const publishPostApi = async (postId: number) => {
//     const response = await api.post("/api/rest/post/publish", { postId });
//     return response.data;
// };
//
//
// export const schedulePostApi = async (postId: number) => {
//     const response = await api.post("/api/rest/post/schedule-post", { postId });
//     return response.data;
// };
//


// before get all api


import api from "./api";

export const getAllPosts = async ({ page, size, status, startDate, endDate }) => {
    const params = { page, size };

    if (status && status !== "all") params.status = status;
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;

    const res = await api.get("/api/rest/post/get-all", { params });
    return res.data;
};

export const getPostById = async (id: string | number) => {
    const res = await api.get(`/api/rest/post/${id}`);
    return res.data; // must return { success, content, error }
};
