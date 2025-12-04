// import React from 'react';
// import { useLanguage } from '@/contexts/LanguageContext';
// import { useAuth } from '@/contexts/AuthContext';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Switch } from '@/components/ui/switch';
// import { User, Building, Bell, Globe, Shield, CreditCard } from 'lucide-react';
//
// import LinkedInConnectionSection from "@/components/LinkedInConnectionSection";
//
// const SettingsPage: React.FC = () => {
//   const { language } = useLanguage();
//   const { user } = useAuth();
//
//   const settingSections = [
//     {
//       id: 'profile',
//       title: language === 'ka' ? 'პროფილის ინფორმაცია' : 'Profile Information',
//       icon: User,
//       component: (
//         <div className="space-y-4">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <Label htmlFor="name">{language === 'ka' ? 'სახელი' : 'Name'}</Label>
//               <Input id="name" value={user?.name} className="input-elegant" />
//             </div>
//             <div>
//               <Label htmlFor="email">{language === 'ka' ? 'ელ. ფოსტა' : 'Email'}</Label>
//               <Input id="email" value={user?.email} className="input-elegant" />
//             </div>
//           </div>
//           <div>
//             <Label htmlFor="business">{language === 'ka' ? 'ბიზნესის სახელი' : 'Business Name'}</Label>
//             <Input id="business" value={user?.businessName} className="input-elegant" />
//           </div>
//         </div>
//       )
//     },
//     // {
//     //   id: 'social',
//     //   title: language === 'ka' ? 'სოციალური ანგარიშები' : 'Connected Accounts',
//     //   icon: Building,
//     //   component: (
//     //     <div className="space-y-4">
//     //       {[
//     //         { platform: 'Facebook', connected: true, color: 'text-blue-600' },
//     //         { platform: 'Instagram', connected: true, color: 'text-pink-600' },
//     //         { platform: 'Linkedin', connected: false, color: 'text-blue-400' }
//     //       ].map((account, index) => (
//     //         <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
//     //           <div className="flex items-center space-x-3">
//     //             <div className={`w-8 h-8 rounded-full bg-current/10 flex items-center justify-center ${account.color}`}>
//     //               <span className="text-xs font-bold">{account.platform[0]}</span>
//     //             </div>
//     //             <span className="font-medium">{account.platform}</span>
//     //           </div>
//     //           <div className="flex items-center space-x-3">
//     //             <span className={`text-xs px-2 py-1 rounded-full ${
//     //               account.connected
//     //                 ? 'bg-success/10 text-success'
//     //                 : 'bg-foreground-subtle/10 text-foreground-subtle'
//     //             }`}>
//     //               {account.connected
//     //                 ? (language === 'ka' ? 'დაკავშირებული' : 'Connected')
//     //                 : (language === 'ka' ? 'არ არის დაკავშირებული' : 'Not Connected')
//     //               }
//     //             </span>
//     //             <Button size="sm" variant={account.connected ? "outline" : "default"}>
//     //               {account.connected
//     //                 ? (language === 'ka' ? 'გათიშვა' : 'Disconnect')
//     //                 : (language === 'ka' ? 'დაკავშირება' : 'Connect')
//     //               }
//     //             </Button>
//     //           </div>
//     //         </div>
//     //       ))}
//     //     </div>
//     //   )
//     // },
//       {
//           id: 'social',
//           title: language === 'ka' ? 'სოციალური ანგარიშები' : 'Connected Accounts',
//           icon: Building,
//           component: (
//               <div className="space-y-4">
//
//                   {/* LinkedIn REAL tile */}
//                   <LinkedInConnectionSection />
//
//                   {/* Existing dummy accounts */}
//                   {[
//                       { platform: 'Facebook', connected: true, color: 'text-blue-600' },
//                       { platform: 'Instagram', connected: true, color: 'text-pink-600' },
//                       { platform: 'Twitter', connected: false, color: 'text-blue-400' }
//                   ].map((account, index) => (
//                       <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
//                           <div className="flex items-center space-x-3">
//                               <div className={`w-8 h-8 rounded-full bg-current/10 flex items-center justify-center ${account.color}`}>
//                                   <span className="text-xs font-bold">{account.platform[0]}</span>
//                               </div>
//                               <span className="font-medium">{account.platform}</span>
//                           </div>
//                           <div className="flex items-center space-x-3">
//             <span className={`text-xs px-2 py-1 rounded-full ${
//                 account.connected
//                     ? 'bg-success/10 text-success'
//                     : 'bg-foreground-subtle/10 text-foreground-subtle'
//             }`}>
//               {account.connected
//                   ? (language === 'ka' ? 'დაკავშირებული' : 'Connected')
//                   : (language === 'ka' ? 'არ არის დაკავშირებული' : 'Not Connected')
//               }
//             </span>
//                               <Button size="sm" variant={account.connected ? "outline" : "default"}>
//                                   {account.connected
//                                       ? (language === 'ka' ? 'გათიშვა' : 'Disconnect')
//                                       : (language === 'ka' ? 'დაკავშირება' : 'Connect')
//                                   }
//                               </Button>
//                           </div>
//                       </div>
//                   ))}
//
//               </div>
//           )
//       },
//
//       {
//       id: 'notifications',
//       title: language === 'ka' ? 'შეტყობინებები' : 'Notifications',
//       icon: Bell,
//       component: (
//         <div className="space-y-4">
//           {[
//             {
//               label: language === 'ka' ? 'ელ.ფოსტა შეტყობინებები' : 'Email notifications',
//               description: language === 'ka' ? 'მიიღეთ ინფორმაცია ახალი ურთიერთობების შესახებ' : 'Receive updates about new interactions',
//               enabled: true
//             },
//             {
//               label: language === 'ka' ? 'გამოქვეყნების შეტყობინებები' : 'Post notifications',
//               description: language === 'ka' ? 'შეტყობინებები წარმატებული გამოქვეყნების შესახებ' : 'Notifications about successful posts',
//               enabled: true
//             },
//             {
//               label: language === 'ka' ? 'ანალიტიკის რეპორტები' : 'Analytics reports',
//               description: language === 'ka' ? 'კვირეული შესრულების რეპორტები' : 'Weekly performance reports',
//               enabled: false
//             }
//           ].map((notification, index) => (
//             <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
//               <div>
//                 <p className="font-medium text-foreground">{notification.label}</p>
//                 <p className="text-sm text-foreground-muted">{notification.description}</p>
//               </div>
//               <Switch checked={notification.enabled} />
//             </div>
//           ))}
//         </div>
//       )
//     }
//   ];
//
//   return (
//     <div className="p-6 space-y-8">
//       <div>
//         <h1 className="text-3xl font-jakarta font-bold text-foreground">
//           {language === 'ka' ? 'პარამეტრები' : 'Settings'}
//         </h1>
//         <p className="text-foreground-muted mt-2">
//           {language === 'ka' ? 'მართეთ თქვენი ანგარიშის პარამეტრები' : 'Manage your account settings'}
//         </p>
//       </div>
//
//       <div className="space-y-8">
//         {settingSections.map((section) => {
//           const Icon = section.icon;
//           return (
//             <div key={section.id} className="dashboard-card">
//               <div className="flex items-center space-x-3 mb-6">
//                 <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
//                   <Icon className="w-5 h-5 text-white" />
//                 </div>
//                 <h2 className="text-xl font-semibold text-foreground">
//                   {section.title}
//                 </h2>
//               </div>
//               {section.component}
//               <div className="flex justify-end mt-6">
//                 <Button className="btn-hero">
//                   {language === 'ka' ? 'შენახვა' : 'Save Changes'}
//                 </Button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };
//
// export default SettingsPage;


import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { User, Building, Bell } from "lucide-react";
import LinkedInConnectionSection from "@/components/LinkedInConnectionSection";

const SettingsPage: React.FC = () => {
    const { language } = useLanguage();
    const { user } = useAuth();


    const fullName = `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim();

    const settingSections = [

        {
            id: "profile",
            title: language === "ka" ? "პროფილის ინფორმაცია" : "Profile Information",
            icon: User,
            component: (
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="name">
                                {language === "ka" ? "სახელი" : "Name"}
                            </Label>
                            <Input
                                id="name"
                                value={fullName}
                                readOnly
                                className="input-elegant"
                            />
                        </div>

                        <div>
                            <Label htmlFor="email">
                                {language === "ka" ? "ელ. ფოსტა" : "Email"}
                            </Label>
                            <Input
                                id="email"
                                value={user?.email ?? ""}
                                readOnly
                                className="input-elegant"
                            />
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="business">
                            {language === "ka" ? "ბიზნესის სახელი" : "Business Name"}
                        </Label>
                        <Input
                            id="business"
                            value={user?.businessName ?? ""}
                            readOnly
                            className="input-elegant"
                        />
                    </div>
                </div>
            ),
        },


        {
            id: "social",
            title: language === "ka" ? "სოციალური ანგარიშები" : "Connected Accounts",
            icon: Building,
            component: (
                <div className="space-y-4">


                    <LinkedInConnectionSection />


                    {[
                        { platform: "Facebook", connected: true, color: "text-blue-600" },
                        { platform: "Instagram", connected: true, color: "text-pink-600" },
                        { platform: "Twitter", connected: false, color: "text-blue-400" },
                    ].map((account) => (
                        <div
                            key={account.platform}
                            className="flex items-center justify-between p-4 border border-border rounded-lg"
                        >
                            <div className="flex items-center space-x-3">
                                <div
                                    className={`w-8 h-8 rounded-full bg-current/10 flex items-center justify-center ${account.color}`}
                                >
                  <span className="text-xs font-bold">
                    {account.platform[0]}
                  </span>
                                </div>
                                <span className="font-medium">{account.platform}</span>
                            </div>

                            <div className="flex items-center space-x-3">
                <span
                    className={`text-xs px-2 py-1 rounded-full ${
                        account.connected
                            ? "bg-success/10 text-success"
                            : "bg-foreground-subtle/10 text-foreground-subtle"
                    }`}
                >
                  {account.connected
                      ? language === "ka"
                          ? "დაკავშირებული"
                          : "Connected"
                      : language === "ka"
                          ? "არ არის დაკავშირებული"
                          : "Not Connected"}
                </span>

                                <Button size="sm" variant={account.connected ? "outline" : "default"}>
                                    {account.connected
                                        ? language === "ka"
                                            ? "გათიშვა"
                                            : "Disconnect"
                                        : language === "ka"
                                            ? "დაკავშირება"
                                            : "Connect"}
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            ),
        },


        {
            id: "notifications",
            title: language === "ka" ? "შეტყობინებები" : "Notifications",
            icon: Bell,
            component: (
                <div className="space-y-4">
                    {[
                        {
                            label:
                                language === "ka" ? "ელ.ფოსტა შეტყობინებები" : "Email notifications",
                            description:
                                language === "ka"
                                    ? "მიიღეთ ინფორმაცია ახალი ურთიერთობების შესახებ"
                                    : "Receive updates about new interactions",
                            enabled: true,
                        },
                        {
                            label:
                                language === "ka" ? "გამოქვეყნების შეტყობინებები" : "Post notifications",
                            description:
                                language === "ka"
                                    ? "შეტყობინებები წარმატებული გამოქვეყნების შესახებ"
                                    : "Notifications about successful posts",
                            enabled: true,
                        },
                        {
                            label:
                                language === "ka" ? "ანალიტიკის რეპორტები" : "Analytics reports",
                            description:
                                language === "ka"
                                    ? "კვირეული შესრულების რეპორტები"
                                    : "Weekly performance reports",
                            enabled: false,
                        },
                    ].map((notification, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between p-4 border border-border rounded-lg"
                        >
                            <div>
                                <p className="font-medium text-foreground">{notification.label}</p>
                                <p className="text-sm text-foreground-muted">
                                    {notification.description}
                                </p>
                            </div>
                            <Switch checked={notification.enabled} />
                        </div>
                    ))}
                </div>
            ),
        },
    ];


    return (
        <div className="p-6 space-y-8">
            <div>
                <h1 className="text-3xl font-jakarta font-bold text-foreground">
                    {language === "ka" ? "პარამეტრები" : "Settings"}
                </h1>
                <p className="text-foreground-muted mt-2">
                    {language === "ka" ? "მართეთ თქვენი ანგარიშის პარამეტრები" : "Manage your account settings"}
                </p>
            </div>

            <div className="space-y-8">
                {settingSections.map((section) => {
                    const Icon = section.icon;
                    return (
                        <div key={section.id} className="dashboard-card">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                                    <Icon className="w-5 h-5 text-white" />
                                </div>
                                <h2 className="text-xl font-semibold text-foreground">
                                    {section.title}
                                </h2>
                            </div>

                            {section.component}

                            <div className="flex justify-end mt-6">
                                <Button className="btn-hero">
                                    {language === "ka" ? "შენახვა" : "Save Changes"}
                                </Button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default SettingsPage;
