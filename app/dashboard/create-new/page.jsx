"use client"
import React, { useState } from "react";
import SelectTopic from "./_components/SelectTopic";
import SelectStyle from "./_components/SelectStyle";
import SelectDuration from "./_components/SelectDuration";
import { Button } from "@/components/ui/button";
import axios from "axios";
import CustomLoading from "./_components/CustomLoading";

function CreateNew() {

    const [formData, setFormData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [videoScript, setVideoScript] = useState();

    const onHandleInputChange = (fieldName, fieldValue) => {
        console.log(fieldName, fieldValue);

        setFormData(prev => ({
            ...prev,
            [fieldName]: fieldValue
        }))
    }

    const onCreateClickHandler = () => {
        GetVideoScript();
    }

    //get video script
    const GetVideoScript = async () => {
        setLoading(true);
        try {
            const prompt = `write a script to generate a ${formData.duration} seconds short video on the topic: ${formData.topic} along with AI image prompt in ${formData.imageStyle} format for each scene and give me result in JSON format with imagePrompt and ContentText as fields, no plain text`;

            console.log("Generated Prompt:", prompt);

            const response = await axios.post('/api/get-video-script', { prompt });

            console.log("API Response:", response.data.result);
            setVideoScript(response.data.result);

            if (!response.data || !response.data.result) {
                throw new Error("Invalid response format from API");
            }

            return response.data.result;
        } catch (error) {
            console.error("❌ ERROR fetching video script:", error);
        } finally {
            setLoading(false);
        }
    };




    return (
        <div className="md:px-20">
            <h2 className="font-bold text-4xl text-primary text-center"> Create new</h2>
            <div className="mt-10 shadow-md p-10">
                {/* topic */}
                <SelectTopic onUserSelect={onHandleInputChange} />
                {/* select style */}
                <SelectStyle onUserSelect={onHandleInputChange} />
                {/* Duration */}
                <SelectDuration onUserSelect={onHandleInputChange} />
                {/* create button  */}
                <Button className="mt-10 w-full" onClick={onCreateClickHandler}>Create Short Video</Button>
            </div>
            <CustomLoading loading={loading} />
        </div>
    )
}
export default CreateNew