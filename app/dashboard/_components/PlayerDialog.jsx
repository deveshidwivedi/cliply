import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Player } from "@remotion/player";
import RemotionVideo from "./RemotionVideo";
import { VideoData } from "@/configs/schema";
import { db } from "@/configs/db";
import { eq } from "drizzle-orm";
import { useRouter } from "next/navigation";

function PlayerDialog({ playVideo, videoId }) {

    const [openDialog, setOpenDialog] = useState(false);
    const [videoData, setVideoData] = useState();
    const [durationInFrame, setDurationInFrame] = useState(100);
    const router = useRouter();

    useEffect(() => {
        setOpenDialog(!openDialog)
        videoId && GetVideoData();
    }, [playVideo])

    const GetVideoData = async () => {
        const result = await db.select().from(VideoData)
            .where(eq(VideoData.id, videoId))

        console.log(result);
        setVideoData(result[0]);
    }

    return (
        <Dialog open={openDialog}>
            <DialogContent className="flex flex-col items-center">
                <DialogHeader>
                    <DialogTitle className="text-3xl font-bold my-5">Your amazing video is ready!</DialogTitle>
                    <DialogDescription>
                        <Player
                            component={RemotionVideo}
                            durationInFrames={Number(durationInFrame.toFixed(0))}
                            compositionWidth={300}
                            compositionHeight={450}
                            fps={30}
                            controls={true}
                            inputProps={
                                {
                                    ...videoData,
                                    setDurationInFrame: (frameValue) => setDurationInFrame(frameValue)
                                }}

                        />
                        <div className="flex gap-10 mt-10">
                            <Button
                                onClick={() => {
                                    router.replace('/dashboard'); setOpenDialog(false)

                                }}
                                className="bg-red-400">Cancel</Button>
                            <Button>Export</Button>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}

export default PlayerDialog;