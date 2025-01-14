"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type DatePickerPropsType = {
    date: Date | undefined;
    onChange: (date: Date) => void;
}

function DatePicker({ date, onChange }: DatePickerPropsType) {

    const handleDateSelect = (selectedDate: Date | undefined) => {
        if (!selectedDate) {
            return;
        }
        onChange(selectedDate);
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-[240px] justify-start text-left font-normal bg-white border border hover:bg-black-50 ",
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className="w-auto p-0 z-50 bg-white shadow-lg rounded-md"
                align="start"
            >
                <Calendar mode="single" selected={date} onSelect={handleDateSelect} initialFocus />
            </PopoverContent>
        </Popover>
    );
}

export default DatePicker;
