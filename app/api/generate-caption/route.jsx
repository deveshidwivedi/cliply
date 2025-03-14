import { AssemblyAI } from "assemblyai";
import { NextResponse } from "next/server";

export async function POST(req) {

    try {
        const { audioFileUrl } = await req.json();

        const client = new AssemblyAI({
            apiKey: process.env.CAPTION_API,
        });


        const FILE_URL = audioFileUrl

        const data = {
            audio_url: FILE_URL
        }


        const transcript = await client.transcripts.transcribe(data)
        console.log("Transcript Response:", transcript);

        return NextResponse.json({ 'result': transcript.words });

    }
    catch (e) {
        return NextResponse.json({ 'error': e });
    }
}