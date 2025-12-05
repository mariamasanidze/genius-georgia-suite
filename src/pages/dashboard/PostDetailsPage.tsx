import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPostById } from "@/lib/post";

const PostDetailsPage = () => {
    const { id } = useParams();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["post", id],
        queryFn: () => getPostById(id!),
        enabled: !!id,
        retry: false
    });

    if (isLoading) return <div className="p-6">Loading...</div>;


    if (isError) {
        return (
            <div className="p-6 text-red-500">
                <h2 className="text-xl font-bold">Failed to fetch post.</h2>
                <p className="opacity-70 mt-2">A server error occurred.</p>
            </div>
        );
    }


    if (data?.success === false) {
        return (
            <div className="p-6 text-red-500">
                <h2 className="text-xl font-bold">Error loading post</h2>
                <p className="opacity-70 mt-2">{data.error?.message}</p>
            </div>
        );
    }


    const post = data?.content;
    if (!post) {
        return (
            <div className="p-6 text-red-500">
                <h2 className="text-xl font-bold">Post not found</h2>
            </div>
        );
    }


    return (
        <div className="p-6 space-y-6">
            <h1 className="text-3xl font-bold">{post.title}</h1>

            {post.imageUrl && (
                <img src={post.imageUrl} alt="" className="rounded-lg max-w-lg" />
            )}

            <p className="opacity-70 text-sm">{post.status}</p>

            <div className="whitespace-pre-line text-lg leading-relaxed mt-4">
                {post.text}
            </div>

            <p className="text-xs opacity-50">
                Created: {new Date(post.createDate).toLocaleString()}
            </p>
        </div>
    );
};

export default PostDetailsPage;
