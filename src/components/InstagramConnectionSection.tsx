// import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { useLanguage } from "@/contexts/LanguageContext";
// import {
//     getInstagramAuthUrl,
//     unlinkInstagram,
//     isInstagramConnected,
// } from "@/lib/social";
//
// const InstagramConnectionSection = () => {
//     const { language } = useLanguage();
//     const [connected, setConnected] = useState(false);
//     const [loading, setLoading] = useState(true);
//     const [actionLoading, setActionLoading] = useState(false);
//
//     useEffect(() => {
//         const checkConnection = async () => {
//             try {
//                 const status = await isInstagramConnected();
//                 setConnected(status);
//             } catch (error) {
//                 console.error("Failed to check Instagram connection:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//
//         checkConnection();
//     }, []);
//
//     const connectInstagram = async () => {
//         try {
//             setActionLoading(true);
//             const url = await getInstagramAuthUrl();
//             window.location.href = url;
//         } catch (error) {
//             console.error("Failed to connect Instagram:", error);
//             alert("Failed to connect Instagram");
//         } finally {
//             setActionLoading(false);
//         }
//     };
//
//     const disconnectInstagram = async () => {
//         try {
//             setActionLoading(true);
//             await unlinkInstagram();
//             setConnected(false);
//         } catch (error) {
//             console.error("Failed to disconnect Instagram:", error);
//             alert("Failed to disconnect Instagram");
//         } finally {
//             setActionLoading(false);
//         }
//     };
//
//     if (loading) {
//         return (
//             <div className="flex items-center justify-between p-4 border border-border rounded-lg animate-pulse">
//                 <div className="flex items-center space-x-3">
//                     <div className="w-8 h-8 rounded-full bg-pink-600/10 flex items-center justify-center text-pink-600">
//                         <span className="text-xs font-bold">I</span>
//                     </div>
//                     <span className="font-medium">Instagram</span>
//                 </div>
//                 <div className="h-6 w-24 bg-muted rounded"></div>
//             </div>
//         );
//     }
//
//     return (
//         <div className="flex items-center justify-between p-4 border border-border rounded-lg">
//             <div className="flex items-center space-x-3">
//                 <div className="w-8 h-8 rounded-full bg-pink-600/10 flex items-center justify-center text-pink-600">
//                     <span className="text-xs font-bold">I</span>
//                 </div>
//                 <span className="font-medium">Instagram</span>
//             </div>
//
//             <div className="flex items-center space-x-3">
//                 {connected && (
//                     <span className="text-xs px-2 py-1 rounded-full bg-success/10 text-success">
//             {language === "ka" ? "დაკავშირებული" : "Connected"}
//           </span>
//                 )}
//
//                 {connected ? (
//                     <Button
//                         size="sm"
//                         variant="outline"
//                         disabled={actionLoading}
//                         onClick={disconnectInstagram}
//                     >
//                         {actionLoading
//                             ? language === "ka" ? "იტვირთება..." : "Loading..."
//                             : language === "ka" ? "გათიშვა" : "Disconnect"}
//                     </Button>
//                 ) : (
//                     <Button
//                         size="sm"
//                         className="btn-hero"
//                         disabled={actionLoading}
//                         onClick={connectInstagram}
//                     >
//                         {actionLoading
//                             ? language === "ka" ? "იტვირთება..." : "Loading..."
//                             : language === "ka" ? "დაკავშირება" : "Connect"}
//                     </Button>
//                 )}
//             </div>
//         </div>
//     );
// };
//
// export default InstagramConnectionSection;

//before fixing buttons

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Instagram } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
    getInstagramAuthUrl,
    unlinkInstagram,
    isInstagramConnected,
} from "@/lib/social";

const InstagramConnectionSection = () => {
    const { language } = useLanguage();
    const [connected, setConnected] = useState(false);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);

    useEffect(() => {
        const checkConnection = async () => {
            try {
                const status = await isInstagramConnected();
                setConnected(status);
            } catch (error) {
                console.error("Failed to check Instagram connection:", error);
            } finally {
                setLoading(false);
            }
        };

        checkConnection();
    }, []);

    const handleConnect = async () => {
        try {
            setActionLoading(true);
            const url = await getInstagramAuthUrl();
            window.location.href = url;
        } catch (error) {
            console.error("Failed to connect Instagram:", error);
            alert("Instagram connection failed");
        } finally {
            setActionLoading(false);
        }
    };

    const handleDisconnect = async () => {
        try {
            setActionLoading(true);
            await unlinkInstagram();
            setConnected(false);
        } catch (error) {
            console.error("Failed to disconnect Instagram:", error);
            alert("Instagram disconnect failed");
        } finally {
            setActionLoading(false);
        }
    };

    if (loading) return null;

    return (
        <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            {/* Left */}
            <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-pink-600/10 flex items-center justify-center text-pink-600">
                    <Instagram className="w-4 h-4" />
                </div>
                <span className="font-medium">Instagram</span>
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
                    disabled={actionLoading}
                    onClick={connected ? handleDisconnect : handleConnect}
                >
                    {actionLoading
                        ? language === "ka"
                            ? "იტვირთება..."
                            : "Loading..."
                        : connected
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

export default InstagramConnectionSection;
