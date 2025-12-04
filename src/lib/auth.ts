import api from "./api";

export const sendForgotPassword = async (email: string) => {
    const res = await api.post("/api/rest/auth/forgot-password", { email });
    return res.data;
};

export const resetPassword = async (
    email: string,
    activationCode: string,
    newPassword: string
) => {
    const res = await api.post("/api/rest/auth/reset-password", {
        email,
        activationCode,
        newPassword,
    });
    return res.data;
};
