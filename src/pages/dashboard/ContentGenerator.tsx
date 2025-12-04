
import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

import {
    Facebook,
    Instagram,
    Linkedin,
    Calendar,
    Send,
    Wand2,
    Image,
    Edit3,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { generateContentApi, publishPostApi } from "@/lib/ai";

const ContentGenerator: React.FC = () => {
    const { language } = useLanguage();
    const navigate = useNavigate();


    const [selectedLanguage, setSelectedLanguage] = useState("georgian");
    const [contentType, setContentType] = useState("text-image");
    const [textStyle, setTextStyle] = useState("friendly");
    const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["linkedin"]);
    const [topic, setTopic] = useState("");

    const [generatedContent, setGeneratedContent] = useState("");
    const [postId, setPostId] = useState<number | null>(null);

    const [isGenerating, setIsGenerating] = useState(false);
    const [isPublishing, setIsPublishing] = useState(false);
    const [isEditing, setIsEditing] = useState(false);


    const languageMap = { georgian: 1, english: 2 };
    const contentTypeMap = { "text-only": 1, "image-only": 2, "text-image": 3 };
    const textStyleMap = { friendly: 1, professional: 2, everyday: 3, excited: 4 };
    const platformMap = { facebook: 1, instagram: 2, linkedin: 3 };


    const togglePlatform = (p: string) => {
        setSelectedPlatforms(prev =>
            prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]
        );
    };


    const generateContent = async () => {
        if (!topic.trim()) {
            toast.error(language === "ka" ? "თემა შევსებული უნდა იყოს" : "Topic is required");
            return;
        }

        setIsGenerating(true);
        setPostId(null);

        try {
            const payload = {
                languageId: languageMap[selectedLanguage],
                contentTypeId: contentTypeMap[contentType],
                textStyleId: textStyleMap[textStyle],
                socialNetworkPlatformIds: selectedPlatforms.map(p => platformMap[p]),
                prompt: topic,
            };

            console.log("Payload:", payload);

            const response = await generateContentApi(payload);
            console.log("Backend:", response);

            setGeneratedContent(response?.content?.text || "");
            setPostId(response?.content?.postId || null);

            toast.success(language === "ka" ? "კონტენტი შეიქმნა!" : "Content generated!");
        } catch (err) {
            console.error(err);
            toast.error("Generation failed.");
        } finally {
            setIsGenerating(false);
        }
    };


    const publishNow = async () => {
        if (!postId) return toast.error("No post to publish");

        setIsPublishing(true);
        try {
            await publishPostApi(postId);
            toast.success(language === "ka" ? "გამოქვეყნდა!" : "Published!");
        } catch (err) {
            console.error(err);
            toast.error("Publish failed");
        } finally {
            setIsPublishing(false);
        }
    };


    const schedulePost = () => {
        if (!postId) return toast.error("Generate content first");

        navigate("/content/calendar", {
            state: {
                postId,
                content: generatedContent,
                platforms: selectedPlatforms,
            },
        });
    };


    return (
        <div className="p-6 space-y-6">

            {/* PAGE TITLE */}
            <h1 className="text-3xl font-bold text-foreground">
                {language === "ka" ? "კონტენტის გენერატორი" : "Content Generator"}
            </h1>

            {/* LANGUAGE SELECTION */}
            <div className="card-gradient p-4">
                <h2 className="text-lg font-semibold mb-4">
                    {language === "ka" ? "ენა" : "Language"}
                </h2>

                <div className="grid grid-cols-2 gap-3">
                    <button
                        onClick={() => setSelectedLanguage("georgian")}
                        className={`p-3 border rounded-lg ${
                            selectedLanguage === "georgian"
                                ? "border-primary-light bg-primary-light/10"
                                : "border-border"
                        }`}
                    >
                        Georgian
                    </button>

                    <button
                        onClick={() => setSelectedLanguage("english")}
                        className={`p-3 border rounded-lg ${
                            selectedLanguage === "english"
                                ? "border-primary-light bg-primary-light/10"
                                : "border-border"
                        }`}
                    >
                        English
                    </button>
                </div>
            </div>


            <div className="card-gradient p-4">
                <h2 className="text-lg font-semibold mb-4">
                    {language === "ka" ? "პლატფორმა" : "Platforms"}
                </h2>

                <div className="grid grid-cols-3 gap-3">

                    <button
                        onClick={() => togglePlatform("linkedin")}
                        className={`p-3 border rounded-lg flex flex-col items-center ${
                            selectedPlatforms.includes("linkedin")
                                ? "border-primary-light bg-primary-light/10"
                                : "border-border"
                        }`}
                    >
                        <Linkedin className="w-5 h-5 text-blue-700" />
                        LinkedIn
                    </button>

                    <button
                        onClick={() => togglePlatform("facebook")}
                        className={`p-3 border rounded-lg flex flex-col items-center ${
                            selectedPlatforms.includes("facebook")
                                ? "border-primary-light bg-primary-light/10"
                                : "border-border"
                        }`}
                    >
                        <Facebook className="w-5 h-5 text-blue-600" />
                        Facebook
                    </button>

                    <button
                        onClick={() => togglePlatform("instagram")}
                        className={`p-3 border rounded-lg flex flex-col items-center ${
                            selectedPlatforms.includes("instagram")
                                ? "border-primary-light bg-primary-light/10"
                                : "border-border"
                        }`}
                    >
                        <Instagram className="w-5 h-5 text-pink-600" />
                        Instagram
                    </button>

                </div>
            </div>


            <div className="card-gradient p-4">
                <h2 className="text-lg font-semibold mb-4">
                    {language === "ka" ? "კონტენტის ტიპი" : "Content Type"}
                </h2>

                <div className="grid grid-cols-3 gap-3">
                    {["text-only", "image-only", "text-image"].map(ct => (
                        <button
                            key={ct}
                            onClick={() => setContentType(ct)}
                            className={`p-3 border rounded-lg ${
                                contentType === ct
                                    ? "border-primary-light bg-primary-light/10"
                                    : "border-border"
                            }`}
                        >
                            {ct}
                        </button>
                    ))}
                </div>
            </div>


            <div className="card-gradient p-4">
                <h2 className="text-lg font-semibold mb-4">Topic</h2>
                <Textarea
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    rows={3}
                    placeholder="Write your topic..."
                />
            </div>


            <div className="grid grid-cols-2 gap-3">
                {["friendly", "professional", "everyday", "excited"].map(style => (
                    <button
                        key={style}
                        onClick={() => setTextStyle(style)}
                        className={`p-3 border rounded-lg ${
                            textStyle === style
                                ? "border-primary-light bg-primary-light/10"
                                : "border-border"
                        }`}
                    >
                        {style}
                    </button>
                ))}
            </div>


            <Button className="btn-hero w-full" onClick={generateContent} disabled={isGenerating}>
                {isGenerating ? (
                    <>
                        <Wand2 className="w-4 h-4 mr-2 animate-spin" />
                        Generating...
                    </>
                ) : (
                    <>
                        <Wand2 className="w-4 h-4 mr-2" />
                        Generate
                    </>
                )}
            </Button>


            {!generatedContent ? (
                <div className="card-gradient p-12 text-center">No Content Yet</div>
            ) : (
                <div className="card-gradient p-4">

                    <h2 className="text-lg font-semibold mb-4">Generated Content</h2>

                    <pre className="bg-background-light border p-3 rounded-lg whitespace-pre-wrap text-sm">
                        {generatedContent}
                    </pre>

                    <div className="grid grid-cols-1 gap-3 mt-4">
                        <Button
                            className="btn-hero"
                            onClick={publishNow}
                            disabled={!postId || isPublishing}
                        >
                            <Send className="w-4 h-4 mr-2" />
                            {isPublishing ? "Publishing..." : "Publish Now"}
                        </Button>

                        <Button
                            variant="outline"
                            className="btn-outline-hero"
                            onClick={schedulePost}
                            disabled={!postId}
                        >
                            <Calendar className="w-4 h-4 mr-2" />
                            Schedule
                        </Button>
                    </div>

                </div>
            )}
        </div>
    );
};

export default ContentGenerator;
