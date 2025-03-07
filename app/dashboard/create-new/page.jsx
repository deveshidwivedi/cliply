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
import { useUser } from "@clerk/nextjs";
import { useCallback } from "react";
import { db } from "@/configs/db";
import { VideoData } from "@/configs/schema";
import PlayerDialog from "../_components/PlayerDialog";
import { useRouter } from "next/navigation";
import { UserDetailContext } from "@/app/_context/UserDetailContext";
import { toast } from "sonner";
import { Users } from "@/configs/schema";
import { eq } from "drizzle-orm";

function CreateNew() {
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);
    const [videoScript, setVideoScript] = useState();
    const [audioFileUrl, setAudioFileUrl] = useState();
    const [captions, setCaptions] = useState();
    const [imageList, setImageList] = useState([]);
    const { videoData, setVideoData } = useContext(VideoDataContext);
    const { user } = useUser();
    const [playVideo, setPlayVideo] = useState(false);
    const [videoId, setVideoId] = useState(null);
    const router = useRouter();

    // Ensure context is correctly structured
    const userContext = useContext(UserDetailContext);
    const userDetail = userContext?.userDetail ?? {};
    const setUserDetail = userContext?.setUserDetail ?? (() => { });

    const onHandleInputChange = (fieldName, fieldValue) => {
        setFormData(prev => ({
            ...prev,
            [fieldName]: fieldValue
        }));
    };

    const onCreateClickHandler = () => {
        if (userDetail?.credits === undefined || userDetail.credits < 10) {
            toast("You don't have enough credits!");
            return;
        }
        GetVideoScript();
    };

    const GetVideoScript = async () => {
        setLoading(true);
        try {
            // Fixed template string syntax with backticks
            const prompt = `Write a script to generate a ${formData.duration} seconds short video on the topic: ${formData.topic} along with AI image prompt in ${formData.imageStyle} format for each scene and give me result in JSON format with imagePrompt and ContentText as fields.`;

            const response = await axios.post('/api/get-video-script', { prompt });

            if (response.data?.result) {
                setVideoData(prev => ({
                    ...prev,
                    videoScript: response.data.result
                }));
                setVideoScript(response.data.result);
                GenerateAudioFile(response.data.result);
            } else {
                throw new Error("Invalid response format from API");
            }
        } catch (error) {
            console.error("❌ ERROR fetching video script:", error);
            toast.error("Failed to generate video script");
            setLoading(false);
        }
    };

    const GenerateAudioFile = async (videoScriptData) => {
        try {
            const id = uuidv4();
            let scriptText = videoScriptData.map(item => item.ContentText).join(' ');

            const resp = await axios.post('/api/generate-audio', {
                text: scriptText,
                id: id
            });

            if (resp.data?.result) {
                setVideoData(prev => ({
                    ...prev,
                    audioFileUrl: resp.data.result
                }));
                setAudioFileUrl(resp.data.result);
                GenerateAudioCaption(resp.data.result, videoScriptData);
            } else {
                throw new Error("Invalid response from audio generation API");
            }
        } catch (error) {
            console.error("❌ ERROR generating audio:", error);
            toast.error("Failed to generate audio");
            setLoading(false);
        }
    };

    const GenerateAudioCaption = async (audioUrl, videoScriptData) => {
        try {
            const resp = await axios.post('/api/generate-caption', {
                audioFileUrl: audioUrl
            });

            if (resp.data?.result) {
                setCaptions(resp.data.result);
                setVideoData(prev => ({
                    ...prev,
                    captions: resp.data.result
                }));
                GenerateImage(videoScriptData);
            } else {
                throw new Error("Invalid response from caption generation API");
            }
        } catch (error) {
            console.error("❌ ERROR generating captions:", error);
            toast.error("Failed to generate captions");
            setLoading(false);
        }
    };

    const GenerateImage = async (videoScriptData) => {
        try {
            const imagePromises = videoScriptData.map(async (scene) => {
                const response = await axios.post('/api/generate-image', {
                    prompt: scene.imagePrompt
                });
                return response.data.imageUrl;
            });

            const images = await Promise.all(imagePromises);

            setImageList(images);
            setVideoData(prev => ({
                ...prev,
                imageList: images
            }));
        } catch (error) {
            console.error("❌ ERROR generating images:", error);
            toast.error("Failed to generate images");
        } finally {
            setLoading(false);
        }
    };

    const saveVideoData = useCallback(async () => {
        if (!videoData?.videoScript || !videoData?.audioFileUrl ||
            !videoData?.captions || !videoData?.imageList ||
            !user?.primaryEmailAddress?.emailAddress) {
            console.error("Missing required data for saving video");
            return;
        }

        setLoading(true);

        try {
            const result = await db.insert(VideoData).values({
                script: videoData.videoScript,
                audioFileUrl: videoData.audioFileUrl,
                captions: videoData.captions,
                imageList: videoData.imageList,
                createdBy: user.primaryEmailAddress.emailAddress
            }).returning({ id: VideoData.id });

            await updateUserCredits();

            if (result && result[0]?.id) {
                setVideoId(result[0].id);
                setPlayVideo(true);
            } else {
                throw new Error("Failed to get video ID from database");
            }
        } catch (error) {
            console.error("❌ ERROR saving video data:", error);
            toast.error("Failed to save video data");
        } finally {
            setLoading(false);
        }
    }, [videoData, user]);

    useEffect(() => {
        if (videoData?.videoScript && videoData?.audioFileUrl &&
            videoData?.captions && videoData?.imageList) {
            saveVideoData();
        }
    }, [videoData, saveVideoData]);

    const updateUserCredits = async () => {
        try {
            if (!user?.primaryEmailAddress?.emailAddress) {
                throw new Error("User email not available");
            }

            await db.update(Users).set({
                credits: (userDetail?.credits || 0) - 10
            }).where(eq(Users.email, user.primaryEmailAddress.emailAddress));

            setUserDetail(prev => ({
                ...prev,
                credits: (prev?.credits ?? 0) - 10
            }));

            // Only clear videoData after successful update
            setVideoData({});
        } catch (error) {
            console.error("❌ ERROR updating user credits:", error);
            toast.error("Failed to update user credits");
        }
    };

    return (
        <div className="md:px-20">
            <h2 className="font-bold text-4xl text-primary text-center">Create New</h2>
            <div className="mt-10 shadow-md p-10">
                <SelectTopic onUserSelect={onHandleInputChange} />
                <SelectStyle onUserSelect={onHandleInputChange} />
                <SelectDuration onUserSelect={onHandleInputChange} />
                <Button
                    className="mt-10 w-full"
                    onClick={onCreateClickHandler}
                    disabled={loading || !formData.topic || !formData.imageStyle || !formData.duration}
                >
                    {loading ? "Creating..." : "Create Short Video"}
                </Button>
            </div>
            <CustomLoading loading={loading} />
            {videoId && (
                <PlayerDialog
                    playVideo={playVideo}
                    setPlayVideo={setPlayVideo}
                    videoId={videoId}
                />
            )}
        </div>
    );
}

export default CreateNew;