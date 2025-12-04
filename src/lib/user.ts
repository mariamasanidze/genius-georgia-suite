
import api from "./api";


export const logout = async () => {
    const res = await api.post("/api/rest/user/logout");
    return res.data;
};

export interface ChangePasswordRequest {
    currentPassword: string;
    newPassword: string;
}

export const changePassword = async (data: ChangePasswordRequest) => {
    const res = await api.post("/api/rest/user/change-password", data);
    return res.data;
};
