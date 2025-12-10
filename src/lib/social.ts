//
// import api from "./api";
//
// const LINKEDIN_PLATFORM_ID = 3;
//
//
// export const getLinkedInAuthUrl = async (): Promise<string> => {
//     try {
//         const res = await api.get(`/api/rest/social/auth-url/${LINKEDIN_PLATFORM_ID}`);
//
//         console.log("Full LinkedIn URL response:", res.data);
//
//         const url =
//             res.data?.content?.url ||
//             res.data?.content ||
//             res.data?.url ||
//             res.data;
//
//         if (!url || typeof url !== "string") {
//             throw new Error("Invalid LinkedIn auth URL returned by backend");
//         }
//
//         return url;
//     } catch (error) {
//         console.error("Failed to load LinkedIn auth URL:", error);
//         throw error;
//     }
// };
//
// export const unlinkLinkedIn = async () => {
//     try {
//         const res = await api.post("/api/rest/social/unlink", {
//             platformId: LINKEDIN_PLATFORM_ID,
//         });
//
//         return res.data?.content ?? res.data ?? true;
//     } catch (error) {
//         console.error("Failed to unlink LinkedIn:", error);
//         throw error;
//     }
// };
//
// export const getSocialAccounts = async () => {
//     try {
//         const res = await api.get("/api/rest/social/accounts");
//
//         return Array.isArray(res.data?.content)
//             ? res.data.content
//             : [];
//     } catch (error) {
//         console.error("Failed to fetch social accounts:", error);
//         return [];
//     }
// };
//
// export const isLinkedInConnected = async (): Promise<boolean> => {
//     const accounts = await getSocialAccounts();
//     return accounts.some(acc => acc.platformId === LINKEDIN_PLATFORM_ID);
// };


//linkedin works , facebook does not

import api from "./api";

const FACEBOOK_PLATFORM_ID = 1;
const INSTAGRAM_PLATFORM_ID = 2;
const LINKEDIN_PLATFORM_ID = 3;



export const getLinkedInAuthUrl = async (): Promise<string> => {
    try {
        const res = await api.get(
            `/api/rest/social/auth-url/${LINKEDIN_PLATFORM_ID}`
        );

        const url =
            res.data?.content?.url ||
            res.data?.content ||
            res.data?.url ||
            res.data;

        if (!url || typeof url !== "string") {
            throw new Error("Invalid LinkedIn auth URL returned by backend");
        }

        return url;
    } catch (error) {
        console.error("Failed to load LinkedIn auth URL:", error);
        throw error;
    }
};

export const unlinkLinkedIn = async () => {
    try {
        const res = await api.post("/api/rest/social/unlink", {
            platformId: LINKEDIN_PLATFORM_ID,
        });

        return res.data?.content ?? res.data ?? true;
    } catch (error) {
        console.error("Failed to unlink LinkedIn:", error);
        throw error;
    }
};

export const isLinkedInConnected = async (): Promise<boolean> => {
    const accounts = await getSocialAccounts();
    return accounts.some((acc) => acc.platformId === LINKEDIN_PLATFORM_ID);
};

export const getInstagramAuthUrl = async (): Promise<string> => {
    try {
        const res = await api.get(
            `/api/rest/social/auth-url/${INSTAGRAM_PLATFORM_ID}`
        );

        console.log("Instagram Auth URL Response:", res.data);

        const url =
            res.data?.content?.url ||
            res.data?.content ||
            res.data?.url ||
            res.data;

        if (!url || typeof url !== "string") {
            throw new Error("Invalid Instagram auth URL returned by backend");
        }

        return url;
    } catch (error) {
        console.error("Failed to load Instagram auth URL:", error);
        throw error;
    }
};

export const unlinkInstagram = async () => {
    try {
        const res = await api.post("/api/rest/social/unlink", {
            platformId: INSTAGRAM_PLATFORM_ID,
        });

        return res.data?.content ?? res.data ?? true;
    } catch (error) {
        console.error("Failed to unlink Instagram:", error);
        throw error;
    }
};

export const isInstagramConnected = async (): Promise<boolean> => {
    const accounts = await getSocialAccounts();
    return accounts.some((acc) => acc.platformId === INSTAGRAM_PLATFORM_ID);
};



export const getFacebookAuthUrl = async (): Promise<string> => {
    try {
        const res = await api.get(
            `/api/rest/social/auth-url/${FACEBOOK_PLATFORM_ID}`
        );

        console.log("Facebook Auth URL Response:", res.data); // DEBUG LOG

        const url =
            res.data?.content?.url ||
            res.data?.content ||
            res.data?.url ||
            res.data;

        console.log("Extracted Facebook URL:", url); // DEBUG LOG

        if (!url || typeof url !== "string") {
            throw new Error("Invalid Facebook auth URL returned by backend");
        }

        return url;
    } catch (error) {
        console.error("Failed to load Facebook auth URL:", error);
        throw error;
    }
};

export const unlinkFacebook = async () => {
    try {
        const res = await api.post("/api/rest/social/unlink", {
            platformId: FACEBOOK_PLATFORM_ID,
        });

        return res.data?.content ?? res.data ?? true;
    } catch (error) {
        console.error("Failed to unlink Facebook:", error);
        throw error;
    }
};

export const isFacebookConnected = async (): Promise<boolean> => {
    const accounts = await getSocialAccounts();
    return accounts.some((acc) => acc.platformId === FACEBOOK_PLATFORM_ID);
};



export const getSocialAccounts = async () => {
    try {
        const res = await api.get("/api/rest/social/accounts");

        return Array.isArray(res.data?.content) ? res.data.content : [];
    } catch (error) {
        console.error("Failed to fetch social accounts:", error);
        return [];
    }
};