import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "@/lib/api";

const FACEBOOK_PLATFORM_ID = 1;

export default function FacebookCallbackPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const code = params.get("code");

        if (!code) {
            setError("Missing Facebook authorization code");
            return;
        }

        const linkAccount = async () => {
            try {
                await api.post("/api/rest/social/link", {
                    platformId: FACEBOOK_PLATFORM_ID,
                    code: code,
                });

                navigate("/settings?facebook=success");
            } catch (e) {
                console.error(e);
                setError("Failed to link Facebook account");
            }
        };

        linkAccount();
    }, [location.search, navigate]);

    if (error) return <p>{error}</p>;
    return <p>Finishing Facebook connection…</p>;
}
