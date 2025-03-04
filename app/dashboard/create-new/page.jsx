"use client"
import React, { useEffect, useState, useContext } from "react";
import SelectTopic from "./_components/SelectTopic";
import SelectStyle from "./_components/SelectStyle";
import SelectDuration from "./_components/SelectDuration";
import { Button } from "@/components/ui/button";
import axios from "axios";
import CustomLoading from "./_components/CustomLoading";
import { v4 as uuidv4 } from 'uuid';
import { VideoDataContext } from "@/app/_context/VideoDataContext";

function CreateNew() {

    const [formData, setFormData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [videoScript, setVideoScript] = useState();
    const [audioFileUrl, setAudioFileUrl] = useState();
    const [captions, setCaptions] = useState();
    const [imageList, setImageList] = useState([]);
    const { videoData, setVideoData } = useContext(VideoDataContext);

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
            if (response.data.result) {
                setVideoData(prev => ({
                    ...prev,
                    'videoScript': response.data.result
                }));
            }
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

    /**
     * Generate Audio File and save to firebase storage
     * @param {*} videoScriptData 
     */
    const GenerateAudioFile = async (videoScriptData) => {
        setLoading(true);
        const id = uuidv4();

        // Extract text content from each scene
        let scriptText = videoScriptData.map(item => item.ContentText).join(' ');

        await axios.post('/api/generate-audio', {
            text: scriptText,  // ✅ Now it's a plain string
            id: id
        }).then(resp => {
            console.log(resp.data);
            setVideoData(prev => ({
                ...prev,
                'audioFileUrl': resp.data.result
            }));
            setAudioFileUrl(resp.data.result);
            resp.data.result && GenerateAudioCaption(resp.data.result, videoScriptData);
        }).finally(() => {
            setLoading(false);
        });
    }

    /**
     * generate caption from audio files
     * @param {*} audioUrl 
     */
    const GenerateAudioCaption = async (audioUrl, videoScriptData) => {
        setLoading(true);

        await axios.post('/api/generate-caption', {
            audioFileUrl: audioUrl
        }).then(resp => {
            console.log(resp.data.result);
            setCaptions(resp?.data?.result);
            setVideoData(prev => ({
                ...prev,
                'captions': resp.data.result
            }));
            resp.data.result && GenerateImage(videoScriptData);
        })
        console.log(videoScript, captions, audioFileUrl);
    }

    const GenerateImage = async (videoScriptData) => {
        setLoading(true);
        try {
            const imagePromises = videoScriptData.map(async (scene) => {
                const response = await axios.post('/api/generate-image', {
                    prompt: scene.imagePrompt
                });
                return response.data.imageUrl;
            });

            const images = await Promise.all(imagePromises);

            // Update both local state and context
            setImageList(images);
            setVideoData(prev => ({
                ...prev,
                'imageList': images // Pass the actual images array
            }));

        } catch (error) {
            console.error("❌ ERROR generating images:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        console.log("Video Data:", videoData);
    }, [videoData])

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