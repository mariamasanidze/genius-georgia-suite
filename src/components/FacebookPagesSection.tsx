import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { toast } from "sonner";
import { Facebook, RefreshCw, CheckCircle, AlertCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const FacebookPagesSection = () => {
    const { language } = useLanguage();

    const [pages, setPages] = useState<any[]>([]);
    const [linkedPageId, setLinkedPageId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [linking, setLinking] = useState(false);
    const [unlinking, setUnlinking] = useState(false);

    const fetchPages = async () => {
        try {
            setLoading(true);

            const res = await api.get("/api/rest/social/get-facebook-pages");
            setPages(res.data?.content || []);

            const accounts = await api.get("/api/rest/social/accounts");
            const fb = accounts.data?.content?.find((a: any) => a.platformId === 1);

            if (fb?.pageId) {
                setLinkedPageId(fb.pageId);
            }

        } catch (err) {
            console.error(err);
            toast.error(language === "ka" ? "Facebook გვერდების ჩატვირთვა ვერ მოხერხდა" : "Facebook pages loading failed");
        } finally {
            setLoading(false);
        }
    };

    // Auto-load pages on mount
    useEffect(() => {
        fetchPages();
    }, []);

    const refreshPages = async () => {
        try {
            setLoading(true);

            const res = await api.get("/api/rest/social/get-facebook-pages");
            setPages(res.data?.content || []);

            toast.success(language === "ka" ? "გვერდები განახლდა" : "Pages refreshed");

        } catch (err) {
            console.error(err);
            toast.error(language === "ka" ? "განახლება ვერ მოხერხდა" : "Refresh failed");
        } finally {
            setLoading(false);
        }
    };

    const linkPage = async (pageId: string) => {
        try {
            setLinking(true);
            await api.post("/api/rest/social/link-facebook-page", pageId, {
                headers: { "Content-Type": "application/json" }
            });
            setLinkedPageId(pageId);
            toast.success(language === "ka" ? "გვერდი დაკავშირდა!" : "Page linked!");
        } catch (err) {
            console.error(err);
            toast.error(language === "ka" ? "დაკავშირება ვერ მოხერხდა" : "Failed to link page");
        } finally {
            setLinking(false);
        }
    };

    const unlinkPage = async () => {
        try {
            setUnlinking(true);
            await api.post("/api/rest/social/unlink", { platformId: 1 });
            setLinkedPageId(null);
            toast.success(language === "ka" ? "გვერდი გათიშულია!" : "Page unlinked!");
        } catch (err) {
            console.error(err);
            toast.error(language === "ka" ? "გათიშვა ვერ მოხერხდა" : "Failed to unlink page");
        } finally {
            setUnlinking(false);
        }
    };

    return (
        <div className="p-6 border rounded-xl bg-background-dark mt-6">


            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center">
                        <Facebook className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold">
                            {language === "ka" ? "Facebook გვერდები" : "Facebook Pages"}
                        </h2>
                        <p className="text-sm text-gray-400">
                            {language === "ka" ? "მართეთ თქვენი Facebook გვერდები" : "Manage your Facebook pages"}
                        </p>
                    </div>
                </div>

                {pages.length > 0 && (
                    <Button
                        onClick={refreshPages}
                        disabled={loading}
                        variant="outline"
                        size="sm"
                    >
                        <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                        {language === "ka" ? "განახლება" : "Refresh"}
                    </Button>
                )}
            </div>


            {pages.length > 0 && linkedPageId && (
                <div className="mb-4 p-3 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-green-400">
                        {language === "ka"
                            ? `დაკავშირებულია 1 გვერდი ${pages.length}-დან`
                            : `Connected 1 of ${pages.length} pages`
                        }
                    </span>
                </div>
            )}


            {pages.length === 0 && !loading && (
                <div className="text-center py-12 border rounded-lg border-dashed">
                    <Facebook className="w-12 h-12 text-gray-500 mx-auto mb-3 opacity-50" />
                    <p className="text-gray-400">
                        {language === "ka" ? "Facebook გვერდები ვერ მოიძებნა" : "No Facebook pages found"}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                        {language === "ka" ? "სცადეთ განახლება ან დარწმუნდით რომ გაქვთ წვდომა" : "Try refreshing or check your permissions"}
                    </p>
                </div>
            )}


            {loading && pages.length === 0 && (
                <div className="text-center py-12">
                    <RefreshCw className="w-8 h-8 text-blue-500 mx-auto mb-3 animate-spin" />
                    <p className="text-gray-400">
                        {language === "ka" ? "იტვირთება..." : "Loading..."}
                    </p>
                </div>
            )}


            {pages.length > 0 && (
                <div className="space-y-3">
                    {pages.map((p) => (
                        <div
                            key={p.id}
                            className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                                linkedPageId === p.id
                                    ? 'bg-blue-500/5 border-blue-500/30'
                                    : 'bg-background-light border-gray-700 hover:border-gray-600'
                            }`}
                        >

                            <div className="flex items-center space-x-3">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                    linkedPageId === p.id ? 'bg-blue-600/30' : 'bg-blue-600/20'
                                }`}>
                                    <Facebook className={`w-5 h-5 ${
                                        linkedPageId === p.id ? 'text-blue-400' : 'text-blue-600'
                                    }`} />
                                </div>

                                <div>
                                    <div className="flex items-center gap-2">
                                        <p className="font-medium">{p.name}</p>
                                        {linkedPageId === p.id && (
                                            <CheckCircle className="w-4 h-4 text-green-500" />
                                        )}
                                    </div>
                                    <p className="text-xs text-gray-400">{p.id}</p>
                                    {p.category && (
                                        <p className="text-xs text-gray-500 mt-1">{p.category}</p>
                                    )}
                                </div>
                            </div>


                            <div className="flex items-center space-x-3">

                                {linkedPageId === p.id ? (
                                    <>
                                        <span className="text-green-400 text-sm font-semibold px-3 py-1 rounded-full bg-green-500/10">
                                            {language === "ka" ? "დაკავშირებულია" : "Connected"}
                                        </span>

                                        <Button
                                            variant="destructive"
                                            onClick={unlinkPage}
                                            disabled={unlinking}
                                            size="sm"
                                        >
                                            {unlinking
                                                ? (language === "ka" ? "მიმდინარეობს..." : "Unlinking...")
                                                : (language === "ka" ? "გათიშვა" : "Unlink")
                                            }
                                        </Button>
                                    </>
                                ) : (
                                    <Button
                                        onClick={() => linkPage(p.id)}
                                        disabled={linking || linkedPageId !== null}
                                        size="sm"
                                    >
                                        {linking
                                            ? (language === "ka" ? "მიმდინარეობს..." : "Linking...")
                                            : (language === "ka" ? "დაკავშირება" : "Link Page")
                                        }
                                    </Button>
                                )}

                            </div>
                        </div>
                    ))}
                </div>
            )}


            {pages.length > 0 && !linkedPageId && (
                <div className="mt-4 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-blue-300">
                        {language === "ka"
                            ? "აირჩიეთ Facebook გვერდი თქვენს ანგარიშთან დასაკავშირებლად"
                            : "Select a Facebook page to link with your account"
                        }
                    </p>
                </div>
            )}
        </div>
    );
};

export default FacebookPagesSection;