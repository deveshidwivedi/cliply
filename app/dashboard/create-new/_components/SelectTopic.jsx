"use client"
import React from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

function SelectTopic() {
    const options = [
        'Write Your Own',
        'AI’s Pick',
        'Spooky Tale',
        'History Bites',
        'Sleepy Story',
        'Get Inspired',
        'Did You Know?'
    ];
    const [selectedOption, setSelectedOption] = useState();

    return (
        <div>
            <h2 className="font-bold text-2xl text-primary">
                Content
            </h2>
            <p className="text-gray-500">What is the topic of your video?</p>
            <Select onValueChange={(value) => setSelectedOption(value)}>
                <SelectTrigger className="w-full mt-2 p-6 text-lg">
                    <SelectValue placeholder="Content Type" />
                </SelectTrigger>
                <SelectContent>
                    {options.map((item, index) => (
                        <SelectItem key={index} value={item}>
                            {item}
                        </SelectItem>
                    ))}

                </SelectContent>
            </Select>

            {selectedOption == 'Write Your Own' &&
                <Textarea />
            }
        </div>
    )
}

export default SelectTopic
