
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "@/lib/api";

const LINKEDIN_PLATFORM_ID = 3;

export default function LinkedInCallbackPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const code = params.get("code");

        if (!code) {
            setError("Missing LinkedIn authorization code");
            return;
        }

        const linkAccount = async () => {
            try {
                // ⚠️ match your LinkSocialAccountRequestDTO (check Swagger)
                await api.post("/api/rest/social/link", {
                    platformId: LINKEDIN_PLATFORM_ID,
                    // or authorizationCode: code, depending on DTO
                    code: code,
                });

                navigate("/settings?linkedin=success");
            } catch (e) {
                console.error(e);
                setError("Failed to link LinkedIn account");
            }
        };

        linkAccount();
    }, [location.search, navigate]);

    if (error) return <p>{error}</p>;
    return <p>Finishing LinkedIn connection…</p>;
}


