import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getAllPosts } from "@/lib/post";
import { DateRange } from "@/components/DateRange";

import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";

const PostsPage = () => {
    const navigate = useNavigate();

    const [statusFilter, setStatusFilter] = useState("all");
    const [dateRange, setDateRange] = useState({ from: null, to: null });

    const { data, isLoading } = useQuery({
        queryKey: ["posts", statusFilter, dateRange],
        queryFn: () =>
            getAllPosts({
                page: 1,
                size: 20,
                status: statusFilter,
                startDate: dateRange.from ? dateRange.from.toISOString() : undefined,
                endDate: dateRange.to ? dateRange.to.toISOString() : undefined,
            }),
    });

    const posts = data?.content?.data ?? [];

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-xl font-bold">Posts</h1>


            <div className="flex gap-4">


                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-48">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="გამოქვეყნებული">გამოქვეყნებული</SelectItem>
                        <SelectItem value="დრაფტი">დრაფტი</SelectItem>
                    </SelectContent>
                </Select>


                <DateRange value={dateRange} onChange={setDateRange} />
            </div>


            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div className="space-y-4">
                    {posts.map((post) => (
                        <div
                            key={post.id}
                            onClick={() => navigate(`/dashboard/posts/${post.id}`)}
                            className="p-4 border rounded bg-card cursor-pointer hover:bg-accent transition"
                        >
                            <h2 className="font-semibold text-lg">{post.title}</h2>

                            <p className="text-sm opacity-70">{post.status}</p>

                            <p className="text-xs opacity-60 mt-1">
                                Created: {new Date(post.createDate).toLocaleString()}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PostsPage;



