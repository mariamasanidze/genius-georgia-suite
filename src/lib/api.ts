

import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});


api.interceptors.request.use((config) => {
    const publicAuthRoutes = [
        "/auth/login",
        "/auth/register",
        "/auth/activate-account",
        "/auth/forgot-password",
        "/auth/reset-password",
        "/auth/refresh",
    ];

    const isPublic = publicAuthRoutes.some((r) =>
        config.url?.includes(r)
    );

    if (!isPublic) {
        const session = localStorage.getItem("sg_session");

        if (session) {
            const token = JSON.parse(session)?.accessToken;
            if (token) config.headers["Authorization"] = `Bearer ${token}`;
        }
    }

    return config;
});


api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;


        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const session = localStorage.getItem("sg_session");
            if (!session) return Promise.reject(error);

            try {
                const { refreshToken } = JSON.parse(session);


                const res = await axios.post(
                    `${import.meta.env.VITE_API_BASE_URL}/api/rest/auth/refresh`,
                    { refreshToken }
                );

                const newSession = res.data.content.session;


                localStorage.setItem("sg_session", JSON.stringify(newSession));


                originalRequest.headers["Authorization"] =
                    `Bearer ${newSession.accessToken}`;

                return api(originalRequest);
            } catch {

                localStorage.removeItem("sg_user");
                localStorage.removeItem("sg_session");
                window.location.href = "/login";
            }
        }

        return Promise.reject(error);
    }
);

export default api;
