import api from "./api";


export const getOAuthConfig = async (platformId: number) => {
    const res = await api.get(`/admin/oauth-configs/${platformId}`);
    return res.data;
};


export const updateOAuthConfig = async (platformId: number, data: any) => {
    const res = await api.put(`/admin/oauth-configs/${platformId}`, data);
    return res.data;
};


export const getAllOAuthConfigs = async () => {
    const res = await api.get("/admin/oauth-configs");
    return res.data;
};


export const testOAuthConfig = async (platformId: number) => {
    const res = await api.get(`/admin/oauth-configs/${platformId}/test`);
    return res.data;
};


export const getSystemStats = async () => {
    const res = await api.get("/admin/stats");
    return res.data;
};
