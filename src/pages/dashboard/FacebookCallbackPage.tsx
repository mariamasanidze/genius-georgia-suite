import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import api from "@/lib/api";

const FacebookCallbackPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

    useEffect(() => {
        const linkAccount = async () => {
            try {
                const code = searchParams.get("code");
                const error = searchParams.get("error");
                const errorDescription = searchParams.get("error_description");

                console.log("Facebook Callback Page Loaded");
                console.log("Current URL:", window.location.href);
                console.log("Code:", code);
                console.log("Error:", error);


                if (error) {
                    console.error("Facebook OAuth error:", error, errorDescription);
                    toast.error(errorDescription || "Failed to connect Facebook account");
                    setStatus("error");
                    setTimeout(() => navigate("/settings"), 2000);
                    return;
                }


                if (!code) {
                    console.error("No authorization code in URL");
                    toast.error("Invalid callback - no authorization code");
                    setStatus("error");
                    setTimeout(() => navigate("/settings"), 2000);
                    return;
                }


                console.log("Linking Facebook account with code:", code);

                const response = await api.post("/api/rest/social/link", {
                    platformId: 1, // Facebook
                    code: code,
                });

                console.log("Link response:", response.data);

                toast.success("Facebook account successfully linked!");
                setStatus("success");
                setTimeout(() => navigate("/settings"), 1500);

            } catch (err: any) {
                console.error("Error linking Facebook account:", err);
                const errorMessage = err.response?.data?.message || "Failed to link Facebook account";
                toast.error(errorMessage);
                setStatus("error");
                setTimeout(() => navigate("/settings"), 2000);
            }
        };

        linkAccount();
    }, [navigate, searchParams]);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white gap-4">
            {status === "loading" && (
                <>
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                    <p className="text-lg">Connecting your Facebook account...</p>
                    <p className="text-sm text-gray-400">Please wait while we complete the setup</p>
                </>
            )}
            {status === "success" && (
                <>
                    <div className="text-green-500 text-6xl mb-4">✓</div>
                    <p className="text-xl font-semibold">Successfully connected!</p>
                    <p className="text-sm text-gray-400">Redirecting to settings...</p>
                </>
            )}
            {status === "error" && (
                <>
                    <div className="text-red-500 text-6xl mb-4">✗</div>
                    <p className="text-xl font-semibold">Connection failed</p>
                    <p className="text-sm text-gray-400">Redirecting back...</p>
                </>
            )}
        </div>
    );
};

export default FacebookCallbackPage;