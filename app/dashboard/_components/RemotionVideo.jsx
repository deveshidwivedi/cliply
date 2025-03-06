import React, { useEffect, useState } from "react";
import {
    AbsoluteFill,
    Audio,
    interpolate,
    Sequence,
    useCurrentFrame,
    useVideoConfig,
} from "remotion";

function RemotionVideo({ script, imageList, audioFileUrl, captions, setDurationInFrame }) {
    const { fps, durationInFrames } = useVideoConfig();
    const [computedDuration, setComputedDuration] = useState(durationInFrames);
    const frame = useCurrentFrame();

    useEffect(() => {
        if (!captions || captions.length === 0) return;

        // Convert ms to frames
        const lastCaptionEnd = captions[captions.length - 1]?.end || 0;
        const calculatedDuration = Math.round((lastCaptionEnd / 1000) * fps);

        if (calculatedDuration > 0) {
            setComputedDuration(calculatedDuration);
            setDurationInFrame(calculatedDuration);
        }
    }, [captions, fps, setDurationInFrame]);

    const getCurrentCaptions = () => {
        const currentTime = (frame / fps) * 1000; // Convert frames to milliseconds
        const currentCaption = captions.find(
            (word) => currentTime >= word.start && currentTime <= word.end
        );
        return currentCaption ? currentCaption.text : "";
    };

    return (
        <AbsoluteFill className="bg-black">
            {imageList?.map((item, index) => {
                const startTime = (index * computedDuration) / imageList.length;
                const duration = computedDuration / imageList.length;
                const scale = interpolate(
                    frame,
                    [startTime, startTime + duration / 2, startTime + duration],
                    [1, 1.8, 1],
                    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                );

                return (
                    <Sequence key={index} from={Math.round(startTime)} durationInFrames={Math.round(duration)}>
                        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
                            <img
                                src={item}
                                alt={`Scene ${index}`}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    transform: `scale(${scale})`,
                                }}
                            />
                            <AbsoluteFill
                                style={{
                                    color: "white",
                                    justifyContent: "center",
                                    bottom: 50,
                                    height: 150,
                                    textAlign: "center",
                                    width: "100%",
                                }}
                            >
                                <h2 className="text-2xl">{getCurrentCaptions()}</h2>
                            </AbsoluteFill>
                        </AbsoluteFill>
                    </Sequence>
                );
            })}
            {audioFileUrl && <Audio src={audioFileUrl} />}
        </AbsoluteFill>
    );
}

export default RemotionVideo;
