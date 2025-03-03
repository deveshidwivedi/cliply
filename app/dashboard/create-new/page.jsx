"use client"
import React, { useState } from "react";
import SelectTopic from "./_components/SelectTopic";
import SelectStyle from "./_components/SelectStyle";
import SelectDuration from "./_components/SelectDuration";
import { Button } from "@/components/ui/button";
import axios from "axios";
import CustomLoading from "./_components/CustomLoading";
import { v4 as uuidv4 } from 'uuid';

const scriptData = 'They say the old Blackwood Manor is cursed. Locals whisper tales of a tragic past and unexplained events. Sarah, drawn by the stories, could not resist its allure. Ignoring the warnings, she pushed the creaking door open.The air grew heavy, a chilling presence washing over her as she ventured deeper into the manors decaying heart. Suddenly, a flicker in the corner of her eye. A glimpse of something... or someone  in the reflection that should not be there. A bone-chilling whisper echoed through the hall, a voice barely audible, yet filled with unspeakable sorrow and dread. In the ballroom, she saw it. A spectral woman, forever trapped in a mournful waltz, a prisoner of the manors tragic history. Panic seized her. Sarah turned and fled, desperate to escape the Blackwood Manors suffocating embrace.  She escaped that night, forever haunted by what she witnessed. Blackwood Manor remains, a chilling reminder of the secrets that lie hidden within its walls... '
const FILEURL = 'https://firebasestorage.googleapis.com/v0/b/cliply-20f33.firebasestorage.app/o/cliply-video-files%2Fe341b216-e712-4ed6-9d28-3d6ba44748fa.mp3?alt=media&token=81ec2e0f-4e31-4227-a403-eb7551a73ede';
function CreateNew() {

    const [formData, setFormData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [videoScript, setVideoScript] = useState();
    const [audioFileUrl, setAudioFileUrl] = useState();
    const [captions, setCaptions] = useState();


    const onHandleInputChange = (fieldName, fieldValue) => {
        console.log(fieldName, fieldValue);

        setFormData(prev => ({
            ...prev,
            [fieldName]: fieldValue
        }))
    }

    const onCreateClickHandler = () => {
        //  GetVideoScript();
        //  GenerateAudioFile(scriptData);
        GenerateAudioCaption(FILEURL);
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
            GenerateAudioFile(response.data.result);

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

    const GenerateAudioFile = async (videoScriptData) => {
        setLoading(true);
        let script = '';
        const id = uuidv4();
        // videoScriptData.forEach(item => {
        //     script += item.ContentText + ' ';
        // })

        await axios.post('/api/generate-audio', {
            text: videoScriptData,
            id: id
        }).then(resp => {
            console.log(resp.data);
            setAudioFileUrl(resp.data.result);
        }).finally(() => {
            setLoading(false);
        });

    }

    const GenerateAudioCaption = async (audioUrl) => {
        setLoading(true);

        await axios.post('/api/generate-caption', {
            audioFileUrl: audioUrl
        }).then(resp => {
            console.log(resp.data.result);
            setCaptions(resp.data.result);
        }).finally(() => {
            setLoading(false);
        });
    }


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