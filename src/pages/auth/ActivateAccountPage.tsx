import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import api from "@/lib/api";

const ActivateAccountPage: React.FC = () => {
    const [code, setCode] = useState("");
    const navigate = useNavigate();

    const handleActivate = async () => {
        if (!code.trim()) {
            return toast.error("Please enter activation code");
        }

        try {
            const res = await api.get("/api/rest/auth/activate-account", {
                params: { activationCode: code },
            });

            toast.success("Account activated successfully!");
            navigate("/login");
        } catch (err: any) {
            toast.error(
                err?.response?.data?.error?.message || "Activation failed"
            );
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-center">Activate Account</h1>

            <p className="text-center text-foreground-muted">
                Enter the 6-digit activation code sent to your email.
            </p>

            <Input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter activation code"
                className="h-12 text-center text-lg"
            />

            <Button onClick={handleActivate} className="w-full h-12 btn-hero">
                Activate Account
            </Button>
        </div>
    );
};

export default ActivateAccountPage;
