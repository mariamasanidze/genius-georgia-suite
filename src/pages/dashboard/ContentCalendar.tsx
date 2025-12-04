
import React, { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import {
    Calendar as CalendarIcon,
    ChevronLeft,
    ChevronRight,
    Clock,
    Linkedin,
    X,
    Check,
} from "lucide-react";
import { schedulePostApi } from "@/lib/ai";
import { toast } from "sonner";

const ContentCalendar: React.FC = () => {
    const { language } = useLanguage();
    const location = useLocation();
    const navigate = useNavigate();

    const [currentDate, setCurrentDate] = useState(new Date());


    const incomingPost = location.state as {
        postId: number;
        content: string;
        platforms: string[];
    } | null;

    const [scheduledPosts, setScheduledPosts] = useState<any[]>(() => {
        const stored = localStorage.getItem("scheduledPosts");
        return stored ? JSON.parse(stored) : [];
    });

    const [selectedDate, setSelectedDate] = useState<string>("");
    const [selectedHour, setSelectedHour] = useState<string>("12");
    const [selectedMinute, setSelectedMinute] = useState<string>("00");
    const [selectedSecond, setSelectedSecond] = useState<string>("00");
    const [isScheduling, setIsScheduling] = useState(false);


    useEffect(() => {
        if (!selectedDate) {
            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, "0");
            const day = String(today.getDate()).padStart(2, "0");
            setSelectedDate(`${year}-${month}-${day}`);
        }
    }, []);

    const savePosts = (posts: any[]) => {
        setScheduledPosts(posts);
        localStorage.setItem("scheduledPosts", JSON.stringify(posts));
    };


    const buildScheduleDate = (dateStr: string, hour: string, minute: string, second: string) => {
        const local = new Date(dateStr);
        local.setHours(parseInt(hour), parseInt(minute), parseInt(second), 0);


        const corrected = new Date(local.getTime() - local.getTimezoneOffset() * 60000);
        return corrected.toISOString();
    };



    const handleDayClick = (dayStr: string) => {
        setSelectedDate(dayStr);
        // Scroll to scheduling form
        window.scrollTo({ top: 0, behavior: "smooth" });
    };


    const schedulePost = async () => {
        if (!incomingPost?.postId) {
            toast.error("No post to schedule");
            return;
        }

        if (!selectedDate) {
            toast.error("Please select a date");
            return;
        }

        setIsScheduling(true);

        try {
            const scheduleDate = buildScheduleDate(selectedDate, selectedHour, selectedMinute, selectedSecond);

            console.log("Scheduling post:", {
                postId: incomingPost.postId,
                scheduleDate,
            });

            await schedulePostApi(incomingPost.postId, scheduleDate);


            const timeStr = `${selectedHour.padStart(2, '0')}:${selectedMinute.padStart(2, '0')}:${selectedSecond.padStart(2, '0')}`;
            const newPost = {
                id: Date.now(),
                content: incomingPost.content,
                date: selectedDate,
                time: timeStr,
                platforms: incomingPost.platforms || ["linkedin"],
            };

            savePosts([...scheduledPosts, newPost]);

            toast.success(
                language === "ka" ? "პოსტი წარმატებით დაგეგმილია!" : "Post scheduled successfully!"
            );


            setTimeout(() => {
                navigate("/content/generator");
            }, 1500);
        } catch (err) {
            console.error("Scheduling error:", err);
            toast.error("Failed to schedule post. Check console for details.");
        } finally {
            setIsScheduling(false);
        }
    };


    const deletePost = (postId: number) => {
        const updated = scheduledPosts.filter((p) => p.id !== postId);
        savePosts(updated);
        toast.success("Post removed from calendar");
    };

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const lastDay = new Date(year, month + 1, 0).getDate();

        const days = [];

        for (let i = 0; i < firstDay; i++) days.push(null);
        for (let d = 1; d <= lastDay; d++) days.push(d);

        return days;
    };

    const monthNames =
        language === "ka"
            ? [
                "იანვარი",
                "თებერვალი",
                "მარტი",
                "აპრილი",
                "მაისი",
                "ივნისი",
                "ივლისი",
                "აგვისტო",
                "სექტემბერი",
                "ოქტომბერი",
                "ნოემბერი",
                "დეკემბერი",
            ]
            : [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
            ];

    const dayNames =
        language === "ka"
            ? ["კვი", "ორშ", "სამ", "ოთხ", "ხუთ", "პარ", "შაბ"]
            : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const goMonth = (dir: "next" | "prev") => {
        setCurrentDate((prev) => {
            const n = new Date(prev);
            n.setMonth(n.getMonth() + (dir === "next" ? 1 : -1));
            return n;
        });
    };


    const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
    const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));
    const seconds = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));

    return (
        <div className="p-6 space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-foreground">
                    {language === "ka" ? "კონტენტის კალენდარი" : "Content Calendar"}
                </h1>
                {incomingPost && (
                    <Button
                        variant="ghost"
                        onClick={() => navigate("/content/generator")}
                        className="text-foreground-muted hover:text-foreground"
                    >
                        <X className="w-4 h-4 mr-2" />
                        {language === "ka" ? "გაუქმება" : "Cancel"}
                    </Button>
                )}
            </div>


            {incomingPost && (
                <div className="card-gradient p-6 space-y-6 border-2 border-primary-light shadow-lg">
                    <div className="flex items-start space-x-4">
                        <div className="p-3 bg-primary-light/10 rounded-lg">
                            <CalendarIcon className="w-6 h-6 text-primary-light" />
                        </div>
                        <div className="flex-1">
                            <h2 className="text-xl font-semibold text-foreground mb-2">
                                {language === "ka" ? "ახალი პოსტის დაგეგმვა" : "Schedule New Post"}
                            </h2>
                            <p className="text-sm text-foreground-muted">
                                {language === "ka"
                                    ? "აირჩიეთ თარიღი და დრო კალენდარში ან ფორმაში"
                                    : "Select date and time from calendar or form below"}
                            </p>
                        </div>
                    </div>


                    <div className="p-4 bg-background-light border-2 border-border rounded-lg">
                        <div className="flex items-center space-x-2 mb-3">
                            <Linkedin className="w-4 h-4 text-primary-light" />
                            <span className="text-xs font-medium text-foreground-muted uppercase tracking-wide">
                                {language === "ka" ? "პოსტის შინაარსი" : "Post Content"}
                            </span>
                        </div>
                        <div className="text-sm text-foreground whitespace-pre-wrap max-h-32 overflow-y-auto">
                            {incomingPost.content}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-semibold text-foreground mb-3 block">
                                {language === "ka" ? "არჩეული თარიღი" : "Selected Date"}
                            </label>
                            <div className="p-4 bg-primary-light/5 border-2 border-primary-light/20 rounded-lg">
                                <div className="flex items-center space-x-2">
                                    <CalendarIcon className="w-5 h-5 text-primary-light" />
                                    <span className="text-lg font-medium text-foreground">
                                        {selectedDate || (language === "ka" ? "აირჩიეთ თარიღი" : "Select a date")}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-semibold text-foreground mb-3 flex items-center">
                                <Clock className="w-4 h-4 mr-2 text-primary-light" />
                                {language === "ka" ? "დრო (საათი:წუთი:წამი)" : "Time (Hour:Minute:Second)"}
                            </label>
                            <div className="grid grid-cols-3 gap-3">
                                <div>
                                    <label className="text-xs text-foreground-muted mb-1 block">
                                        {language === "ka" ? "საათი" : "Hour"}
                                    </label>
                                    <select
                                        value={selectedHour}
                                        onChange={(e) => setSelectedHour(e.target.value)}
                                        className="w-full p-3 bg-background border-2 border-border rounded-lg text-foreground font-medium focus:border-primary-light focus:outline-none transition-colors"
                                    >
                                        {hours.map((h) => (
                                            <option key={h} value={h}>{h}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="text-xs text-foreground-muted mb-1 block">
                                        {language === "ka" ? "წუთი" : "Minute"}
                                    </label>
                                    <select
                                        value={selectedMinute}
                                        onChange={(e) => setSelectedMinute(e.target.value)}
                                        className="w-full p-3 bg-background border-2 border-border rounded-lg text-foreground font-medium focus:border-primary-light focus:outline-none transition-colors"
                                    >
                                        {minutes.map((m) => (
                                            <option key={m} value={m}>{m}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="text-xs text-foreground-muted mb-1 block">
                                        {language === "ka" ? "წამი" : "Second"}
                                    </label>
                                    <select
                                        value={selectedSecond}
                                        onChange={(e) => setSelectedSecond(e.target.value)}
                                        className="w-full p-3 bg-background border-2 border-border rounded-lg text-foreground font-medium focus:border-primary-light focus:outline-none transition-colors"
                                    >
                                        {seconds.map((s) => (
                                            <option key={s} value={s}>{s}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>


                    <Button
                        className="btn-hero w-full text-lg py-6"
                        onClick={schedulePost}
                        disabled={isScheduling || !selectedDate}
                    >
                        {isScheduling ? (
                            <>
                                <Clock className="w-5 h-5 mr-2 animate-spin" />
                                {language === "ka" ? "მიმდინარეობს დაგეგმვა..." : "Scheduling..."}
                            </>
                        ) : (
                            <>
                                <Check className="w-5 h-5 mr-2" />
                                {language === "ka" ? "დაგეგმვა" : "Schedule Post"}
                            </>
                        )}
                    </Button>
                </div>
            )}


            <div className="card-gradient overflow-hidden">
                <div className="flex justify-between items-center p-6 border-b border-border bg-background-light">
                    <Button
                        variant="ghost"
                        onClick={() => goMonth("prev")}
                        className="hover:bg-primary-light/10 hover:text-primary-light"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </Button>
                    <h2 className="text-2xl font-bold text-foreground">
                        {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                    </h2>
                    <Button
                        variant="ghost"
                        onClick={() => goMonth("next")}
                        className="hover:bg-primary-light/10 hover:text-primary-light"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </Button>
                </div>


                <div className="grid grid-cols-7 bg-background-light border-b border-border">
                    {dayNames.map((d) => (
                        <div key={d} className="p-4 text-center text-sm font-bold text-foreground-muted uppercase tracking-wide">
                            {d}
                        </div>
                    ))}
                </div>


                <div className="grid grid-cols-7 gap-px bg-border p-px">
                    {getDaysInMonth(currentDate).map((day, i) => {
                        if (!day)
                            return <div key={"empty-" + i} className="bg-background min-h-[100px]"></div>;

                        const year = currentDate.getFullYear();
                        const month = currentDate.getMonth() + 1;
                        const dayStr = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

                        const posts = scheduledPosts.filter((p) => p.date === dayStr);
                        const isSelected = selectedDate === dayStr;
                        const isToday = dayStr === new Date().toISOString().split('T')[0];

                        return (
                            <div
                                key={dayStr}
                                onClick={() => handleDayClick(dayStr)}
                                className={`bg-background min-h-[100px] p-3 cursor-pointer transition-all hover:bg-primary-light/5 ${
                                    isSelected ? "ring-2 ring-primary-light ring-inset" : ""
                                } ${isToday ? "bg-primary-light/5" : ""}`}
                            >
                                <div className={`text-sm font-semibold mb-2 ${
                                    isToday ? "text-primary-light" : "text-foreground"
                                } ${isSelected ? "text-primary" : ""}`}>
                                    {day}
                                </div>

                                <div className="space-y-1">
                                    {posts.map((p) => (
                                        <div
                                            key={p.id}
                                            className="p-2 border border-primary-light/30 rounded bg-primary-light/10 text-xs group relative hover:bg-primary-light/20 transition-colors"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <div className="flex items-center justify-between mb-1">
                                                <div className="flex items-center space-x-1">
                                                    <Clock className="w-3 h-3 text-primary-light flex-shrink-0" />
                                                    <span className="text-primary font-semibold">
                                                        {p.time}
                                                    </span>
                                                </div>
                                                <button
                                                    onClick={() => deletePost(p.id)}
                                                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-destructive/20 rounded"
                                                >
                                                    <X className="w-3 h-3 text-destructive" />
                                                </button>
                                            </div>
                                            <div className="text-foreground-muted line-clamp-2 leading-tight">
                                                {p.content}
                                            </div>
                                            <div className="flex items-center space-x-1 mt-1.5">
                                                <Linkedin className="w-3 h-3 text-primary-light" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>


            {scheduledPosts.length > 0 && (
                <div className="card-gradient p-6">
                    <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                        <Clock className="w-5 h-5 mr-2 text-primary-light" />
                        {language === "ka" ? "ყველა დაგეგმილი პოსტი" : "All Scheduled Posts"}
                    </h2>

                    <div className="space-y-3">
                        {scheduledPosts
                            .sort((a, b) => {
                                const dateA = new Date(`${a.date}T${a.time}`);
                                const dateB = new Date(`${b.date}T${b.time}`);
                                return dateA.getTime() - dateB.getTime();
                            })
                            .map((post) => (
                                <div
                                    key={post.id}
                                    className="p-4 bg-background-light border-2 border-border rounded-lg flex items-start justify-between hover:border-primary-light/50 transition-colors"
                                >
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-3 mb-3">
                                            <div className="flex items-center space-x-2 px-3 py-1.5 bg-primary-light/10 border border-primary-light/30 rounded-full">
                                                <CalendarIcon className="w-4 h-4 text-primary-light" />
                                                <span className="text-sm font-semibold text-foreground">
                                                    {post.date}
                                                </span>
                                            </div>
                                            <div className="flex items-center space-x-2 px-3 py-1.5 bg-primary-light/10 border border-primary-light/30 rounded-full">
                                                <Clock className="w-4 h-4 text-primary-light" />
                                                <span className="text-sm font-semibold text-foreground">
                                                    {post.time}
                                                </span>
                                            </div>
                                            <Linkedin className="w-4 h-4 text-primary-light" />
                                        </div>
                                        <p className="text-sm text-foreground-muted line-clamp-2 leading-relaxed">
                                            {post.content}
                                        </p>
                                    </div>

                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => deletePost(post.id)}
                                        className="text-destructive hover:bg-destructive/10 ml-4"
                                    >
                                        <X className="w-4 h-4" />
                                    </Button>
                                </div>
                            ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContentCalendar;