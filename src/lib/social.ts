
import api from "./api";

const LINKEDIN_PLATFORM_ID = 3;


export const getLinkedInAuthUrl = async (): Promise<string> => {
    try {
        const res = await api.get(`/api/rest/social/auth-url/${LINKEDIN_PLATFORM_ID}`);

        console.log("Full LinkedIn URL response:", res.data);

        // Backend returns { success, message, content: "url" }
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

export const getSocialAccounts = async () => {
    try {
        const res = await api.get("/api/rest/social/accounts");

        // Backend returns: { success, message, content: [ { platformId, ... } ] }
        return Array.isArray(res.data?.content)
            ? res.data.content
            : [];
    } catch (error) {
        console.error("Failed to fetch social accounts:", error);
        return [];
    }
};

export const isLinkedInConnected = async (): Promise<boolean> => {
    const accounts = await getSocialAccounts();
    return accounts.some(acc => acc.platformId === LINKEDIN_PLATFORM_ID);
};
