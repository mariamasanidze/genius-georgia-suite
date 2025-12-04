

import api from "./api";

export const generateContentApi = async (payload: {
    languageId: number;
    contentTypeId: number;
    textStyleId: number;
    socialNetworkPlatformIds: number[];
    prompt: string;
}) => {
    const res = await api.post("/api/rest/ai/generate-content", payload);
    return res.data;
};

export const publishPostApi = async (postId: number) => {
    const res = await api.post("/api/rest/post/publish", { postId });
    return res.data;
};

export const schedulePostApi = async (postId: number, scheduleDate: string) => {
    const res = await api.post("/api/rest/post/schedule-post", {
        postId,
        scheduleDate,
    });
    return res.data;
};
