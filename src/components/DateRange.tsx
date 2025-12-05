import { useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";

export const DateRange = ({ value, onChange }) => {
    const [open, setOpen] = useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className="w-[260px] justify-start"
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {value?.from && value?.to
                        ? `${value.from.toLocaleDateString()} → ${value.to.toLocaleDateString()}`
                        : "Choose Date Range"}
                </Button>
            </PopoverTrigger>

            <PopoverContent className="p-0">
                <Calendar
                    mode="range"
                    selected={value}
                    onSelect={(range) => {
                        onChange(range);
                        setOpen(false);
                    }}
                />
            </PopoverContent>
        </Popover>
    );
};
