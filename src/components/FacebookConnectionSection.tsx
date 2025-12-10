import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import {
    getFacebookAuthUrl,
    unlinkFacebook,
    isFacebookConnected,
} from "@/lib/social";

const FacebookConnectionSection = () => {
    const { language } = useLanguage();
    const [connected, setConnected] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkConnection = async () => {
            const status = await isFacebookConnected();
            setConnected(status);
            setLoading(false);
        };

        checkConnection();
    }, []);

    const handleConnect = async () => {
        try {
            const url = await getFacebookAuthUrl();
            window.location.href = url;
        } catch (error) {
            console.error("Failed to connect Facebook:", error);
            alert("Facebook connection failed");
        }
    };

    const handleDisconnect = async () => {
        try {
            await unlinkFacebook();
            setConnected(false);
        } catch (error) {
            console.error("Failed to disconnect Facebook:", error);
            alert("Facebook disconnect failed");
        }
    };

    if (loading) return null;

    return (
        <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-600">
                    <span className="text-xs font-bold">F</span>
                </div>
                <span className="font-medium">Facebook</span>
            </div>

            <div className="flex items-center space-x-3">
        <span
            className={`text-xs px-2 py-1 rounded-full ${
                connected
                    ? "bg-success/10 text-success"
                    : "bg-foreground-subtle/10 text-foreground-subtle"
            }`}
        >
          {connected
              ? language === "ka"
                  ? "დაკავშირებული"
                  : "Connected"
              : language === "ka"
                  ? "არ არის დაკავშირებული"
                  : "Not Connected"}
        </span>

                <Button
                    size="sm"
                    variant={connected ? "outline" : "default"}
                    onClick={connected ? handleDisconnect : handleConnect}
                >
                    {connected
                        ? language === "ka"
                            ? "გათიშვა"
                            : "Disconnect"
                        : language === "ka"
                            ? "დაკავშირება"
                            : "Connect"}
                </Button>
            </div>
        </div>
    );
};

export default FacebookConnectionSection;
