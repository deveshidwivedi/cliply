import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Player } from "@remotion/player";
import RemotionVideo from "./RemotionVideo";
import { VideoData } from "@/configs/schema";
import { db } from "@/configs/db";
import { eq } from "drizzle-orm";
import { useRouter } from "next/navigation";

function PlayerDialog({ playVideo, setPlayVideo, videoId }) {
    const [videoData, setVideoData] = useState(null);
    const [durationInFrame, setDurationInFrame] = useState(100);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // Only fetch video data if dialog is open and we have a videoId
        if (playVideo && videoId) {
            getVideoData();
        }
    }, [playVideo, videoId]);

    const getVideoData = async () => {
        setIsLoading(true);
        try {
            const result = await db.select().from(VideoData)
                .where(eq(VideoData.id, videoId));

            if (result && result.length > 0) {
                setVideoData(result[0]);
            } else {
                console.error("No video found with ID:", videoId);
            }
        } catch (error) {
            console.error("Error fetching video data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        if (setPlayVideo) {
            setPlayVideo(false);
        }
    };

    const handleExport = () => {
        // Implement export functionality
        console.log("Exporting video:", videoId);
        // You might want to redirect to an export page or initiate download
    };

    if (!videoId) return null;

    return (
        <Dialog open={Boolean(playVideo)} onOpenChange={handleClose}>
            <DialogContent className="flex flex-col items-center">
                <DialogHeader>
                    <DialogTitle className="text-3xl font-bold my-5">
                        Your amazing video is ready!
                    </DialogTitle>
                    <DialogDescription>
                        {isLoading ? (
                            <div className="flex justify-center items-center h-[450px]">
                                Loading video...
                            </div>
                        ) : videoData ? (
                            <Player
                                component={RemotionVideo}
                                durationInFrames={Number(durationInFrame.toFixed(0))}
                                compositionWidth={300}
                                compositionHeight={450}
                                fps={30}
                                controls={true}
                                inputProps={{
                                    ...videoData,
                                    setDurationInFrame: (frameValue) => setDurationInFrame(frameValue)
                                }}
                            />
                        ) : (
                            <div className="text-red-500">Error loading video</div>
                        )}
                        <div className="flex gap-10 mt-10">
                            <Button onClick={handleClose} className="bg-red-400">
                                Close
                            </Button>
                            <Button onClick={handleExport}>Export</Button>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}

export default PlayerDialog;