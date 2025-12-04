//
//
// import React from "react";
// import ConnectLinkedInButton from "@/pages/dashboard/ConnectLinkedInButton";
// import { Linkedin } from "lucide-react";
//
// const LinkedInConnectionSection: React.FC = () => {
//     return (
//         <div className="flex items-center justify-between p-4 border border-border rounded-lg">
//             <div className="flex items-center space-x-3">
//                 <div className="w-8 h-8 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-600">
//                     <Linkedin className="w-4 h-4" />
//                 </div>
//                 <span className="font-medium">LinkedIn</span>
//             </div>
//
//             <div className="flex items-center space-x-3">
//                 <span className="text-xs px-2 py-1 rounded-full bg-foreground-subtle/10 text-foreground-subtle">
//                    არ არის დაკავშირებული
//                 </span>
//                 <ConnectLinkedInButton />
//             </div>
//         </div>
//     );
// };
//
// export default LinkedInConnectionSection;


//before adding unlink api

import React, { useEffect, useState } from "react";
import ConnectLinkedInButton from "@/pages/dashboard/ConnectLinkedInButton";
import { Linkedin } from "lucide-react";
import { getSocialAccounts, unlinkLinkedIn } from "@/lib/social";

const LinkedInConnectionSection: React.FC = () => {
    const [connected, setConnected] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            setLoading(true);

            const accounts = await getSocialAccounts();
            const isLinked = accounts.some(acc => acc.platformId === 3);

            setConnected(isLinked);
            setLoading(false);
        };

        load();
    }, []);

    const handleUnlink = async () => {
        await unlinkLinkedIn();
        setConnected(false);
    };

    return (
        <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-600">
                    <Linkedin className="w-4 h-4" />
                </div>
                <span className="font-medium">LinkedIn</span>
            </div>

            <div className="flex items-center space-x-3">
                {loading ? (
                    <span className="text-xs text-foreground-muted">იტვირთება...</span>
                ) : connected ? (
                    <>
                        <span className="text-xs px-2 py-1 rounded-full bg-green-600/10 text-green-600">
                            დაკავშირებულია
                        </span>
                        <button
                            onClick={handleUnlink}
                            className="px-3 py-1 text-sm border rounded-lg hover:bg-red-50"
                        >
                            გათიშვა
                        </button>
                    </>
                ) : (
                    <>
                        <span className="text-xs px-2 py-1 rounded-full bg-foreground-subtle/10 text-foreground-subtle">
                            არ არის დაკავშირებული
                        </span>
                        <ConnectLinkedInButton />
                    </>
                )}
            </div>
        </div>
    );
};

export default LinkedInConnectionSection;
