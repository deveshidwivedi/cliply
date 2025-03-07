import React, { useState } from "react";
import { Thumbnail } from "@remotion/player";
import RemotionVideo from "./RemotionVideo";
import PlayerDialog from "./PlayerDialog";

function VideoList({ videoList }) {
    const [playVideo, setPlayVideo] = useState(false);
    const [videoId, setVideoId] = useState(null);

    const handleVideoClick = (id) => {
        setVideoId(id);
        setPlayVideo(true);
    };

    return (
        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {videoList && videoList.length > 0 ? (
                videoList.map((video, index) => (
                    <div
                        key={index}
                        className="cursor-pointer hover:scale-105 transition-all"
                        onClick={() => handleVideoClick(video?.id)}
                    >
                        <Thumbnail
                            component={RemotionVideo}
                            compositionWidth={250}
                            compositionHeight={390}
                            frameToDisplay={30}
                            durationInFrames={120}
                            fps={30}
                            style={{
                                borderRadius: 15,
                            }}
                            inputProps={{
                                ...video,
                                setDurationInFrame: (v) => console.log(v),
                            }}
                        />
                    </div>
                ))
            ) : (
                <div className="col-span-full text-center text-gray-500">
                    No videos found
                </div>
            )}

            <PlayerDialog
                playVideo={playVideo}
                setPlayVideo={setPlayVideo}
                videoId={videoId}
            />
        </div>
    );
}

export default VideoList;