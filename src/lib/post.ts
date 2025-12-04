import api from "./api";


export const publishPostApi = async (postId: number) => {
    const response = await api.post("/api/rest/post/publish", { postId });
    return response.data;
};


export const schedulePostApi = async (postId: number) => {
    const response = await api.post("/api/rest/post/schedule-post", { postId });
    return response.data;
};

