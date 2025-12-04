import { useState } from "react";
import { changePassword } from "@/lib/user";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ChangePasswordPage() {
    const [form, setForm] = useState({
        currentPassword: "",
        newPassword: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const submit = async (e) => {
        e.preventDefault();

        try {
            await changePassword(form);
            toast.success("Password changed successfully!");
        } catch (err: any) {
            toast.error(err.response?.data?.error?.message || "Failed to change password");
        }
    };

    return (
        <div className="max-w-md space-y-4">
            <h1 className="text-xl font-bold">Change Password</h1>

            <form className="space-y-3" onSubmit={submit}>
                <div>
                    <Label>Current Password</Label>
                    <Input type="password" name="currentPassword" onChange={handleChange} />
                </div>

                <div>
                    <Label>New Password</Label>
                    <Input type="password" name="newPassword" onChange={handleChange} />
                </div>

                <Button type="submit">Update Password</Button>
            </form>
        </div>
    );
}
