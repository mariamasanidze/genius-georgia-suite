import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { toast } from "sonner";

const ResetPasswordPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const passedEmail = (location.state as any)?.email || "";

    const [form, setForm] = useState({
        email: passedEmail,
        resetCode: "",
        newPassword: "",
        confirmPassword: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await api.post("/api/rest/auth/reset-password", form);
            toast.success("Password reset successfully!");
            navigate("/login");
        } catch (err: any) {
            toast.error(
                err?.response?.data?.error?.message ||
                "Failed to reset password"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center pt-20">
            <div className="bg-[#0F172A] w-[500px] p-10 rounded-2xl shadow-lg">
                <h1 className="text-3xl font-bold mb-4 text-white">Reset Password</h1>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <div>
                        <Label className="text-white">Email</Label>
                        <Input
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className="input-elegant mt-1"
                            disabled
                        />
                    </div>

                    <div>
                        <Label className="text-white">Reset Code</Label>
                        <Input
                            name="resetCode"
                            value={form.resetCode}
                            onChange={handleChange}
                            className="input-elegant mt-1"
                            placeholder="Enter the code from email"
                            required
                        />
                    </div>

                    <div>
                        <Label className="text-white">New Password</Label>
                        <Input
                            type="password"
                            name="newPassword"
                            value={form.newPassword}
                            onChange={handleChange}
                            className="input-elegant mt-1"
                            placeholder="New password"
                            required
                        />
                    </div>

                    <div>
                        <Label className="text-white">Confirm Password</Label>
                        <Input
                            type="password"
                            name="confirmPassword"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            className="input-elegant mt-1"
                            placeholder="Confirm password"
                            required
                        />
                    </div>

                    <Button disabled={loading} className="w-full btn-hero mt-4">
                        {loading ? "Resetting..." : "Reset Password"}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default ResetPasswordPage;
