import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import api from "@/lib/api";

const ForgotPasswordPage: React.FC = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await api.post("/api/rest/auth/forgot-password", { email });

            toast.success("Reset code sent to your email!");


            navigate("/reset-password", { state: { email } });
        } catch (err: any) {
            toast.error(
                err?.response?.data?.error?.message ||
                "Failed to send reset code"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center pt-20">
            <div className="bg-[#0F172A] w-[500px] p-10 rounded-2xl shadow-lg">
                <h1 className="text-3xl font-bold mb-4 text-white">Forgot Password</h1>

                <p className="text-gray-300 mb-6">
                    Enter your email and we will send you a reset code.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label className="text-white">Email</Label>
                        <Input
                            type="email"
                            className="input-elegant mt-1"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            required
                        />
                    </div>

                    <Button disabled={loading} className="w-full btn-hero">
                        {loading ? "Sending..." : "Send Reset Code"}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
