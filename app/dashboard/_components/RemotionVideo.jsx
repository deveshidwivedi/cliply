import React, { useEffect, useState } from "react";
import { AbsoluteFill, Audio, Sequence, useCurrentFrame, useVideoConfig } from "remotion";

function RemotionVideo({ script, imageList, audioFileUrl, captions, setDurationInFrame }) {
    const { fps, durationInFrames } = useVideoConfig();
    const [computedDuration, setComputedDuration] = useState(durationInFrames);
    const frame = useCurrentFrame();

    useEffect(() => {
        if (!captions || captions.length === 0) return;

        // Ensure correct conversion from milliseconds to frames
        const lastCaptionEnd = captions[captions.length - 1]?.end || 0;
        const calculatedDuration = Math.round((lastCaptionEnd / 1000) * fps); // Convert ms to frames

        if (calculatedDuration > 0) {
            setComputedDuration(calculatedDuration);
            setDurationInFrame(calculatedDuration); // ✅ Update parent state
        }
    }, [captions, fps, setDurationInFrame]);

    const getCurrentCaptions = () => {
        const currentTime = frame / 30 * 1000; //frame num to milliseconds
        const currentCaption = captions.find((word) => currentTime >= word.start && currentTime <= word.end);
        return currentCaption ? currentCaption?.text : '';
    }

    return (
        <AbsoluteFill className="bg-black">
            {imageList?.map((item, index) => (
                <Sequence
                    key={index}
                    from={(index * computedDuration) / imageList.length}
                    durationInFrames={computedDuration / imageList.length}
                >
                    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }} >


                        <img
                            src={item}
                            alt={`Scene ${index}`}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                        <AbsoluteFill style={{
                            color: 'white',
                            justifyContent: 'center',
                            top: undefined,
                            bottom: 50,
                            height: 150,
                            textAlign: 'center',
                            width: '100%',
                        }}>
                            <h2 className="text-2xl">{getCurrentCaptions()}</h2>
                        </AbsoluteFill>
                    </AbsoluteFill>

                </Sequence>
            ))}
            {audioFileUrl && <Audio src={audioFileUrl} />}
        </AbsoluteFill>
    );
}

export default RemotionVideo;
