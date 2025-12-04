import React, { useState } from "react";
import { getLinkedInAuthUrl } from "@/lib/social";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ConnectLinkedInButton: React.FC = () => {
    const [loading, setLoading] = useState(false);

    const handleConnect = async () => {
        try {
            setLoading(true);
            const url = await getLinkedInAuthUrl();

            if (!url) {
                toast.error("Failed to get LinkedIn authorization URL");
                return;
            }

            window.location.href = url; // redirect to LinkedIn login
        } catch (err) {
            console.error("LinkedIn connection error:", err);
            toast.error("Could not start LinkedIn linking");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button onClick={handleConnect} disabled={loading} className="btn-hero">
            {loading ? "Connecting..." : "Connect LinkedIn"}
        </Button>
    );
};

export default ConnectLinkedInButton;