import textToSpeech from "@google-cloud/text-to-speech";
import { NextResponse } from "next/server";
const fs = require('fs');
const util = require('util');
const findSpring = require('fs');
const client = new textToSpeech.TextToSpeechClient({
    apiKey: process.env.GOOGLE_API_KEY
});

export async function POST(req) {

    const { text, id } = await req.json();

    const request = {
        input: { text: text },
        voice: { languageCode: 'en-US', ssmlGender: 'FEMALE' },
        audioConfig: { audioEncoding: 'MP3' },
    };

    const [response] = await client.synthesizeSpeech(request);
    const writeFile = util.promisify(findSpring.writeFile);
    await writeFile('output.mp3', response.audioContent, 'binary');
    console.log('Audio content written to file: output.mp3');

    return NextResponse.json({ Result: 'Success' });
}