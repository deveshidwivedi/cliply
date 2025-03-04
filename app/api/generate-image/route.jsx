import axios from "axios";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/configs/FirebaseConfig"; // Ensure Firebase is initialized
import { v4 as uuidv4 } from "uuid";

export async function POST(req) {
    try {
        const { prompt } = await req.json();
        if (!prompt) {
            return new Response(JSON.stringify({ error: "Missing prompt" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        const PEXELS_API_KEY = process.env.PEXELS_API_KEY;
        if (!PEXELS_API_KEY) {
            return new Response(JSON.stringify({ error: "Missing Pexels API key" }), {
                status: 500,
                headers: { "Content-Type": "application/json" },
            });
        }

        // Fetch image from Pexels
        const response = await axios.get("https://api.pexels.com/v1/search", {
            headers: { Authorization: PEXELS_API_KEY },
            params: { query: prompt, per_page: 1 },
        });

        if (!response.data.photos || response.data.photos.length === 0) {
            return new Response(JSON.stringify({ error: "No images found" }), {
                status: 404,
                headers: { "Content-Type": "application/json" },
            });
        }

        const imageUrl = response.data.photos[0].src.original;

        // Download the image as a Blob
        const imageResponse = await axios.get(imageUrl, { responseType: "arraybuffer" });
        const imageBuffer = Buffer.from(imageResponse.data, "binary");

        // Upload to Firebase Storage
        const imageId = uuidv4();
        const storageRef = ref(storage, `cliply-video-files/${imageId}.jpg`);
        await uploadBytes(storageRef, imageBuffer, { contentType: "image/jpeg" });

        // Get public URL
        const downloadUrl = await getDownloadURL(storageRef);

        return new Response(JSON.stringify({ imageUrl: downloadUrl }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });

    } catch (error) {
        console.error("Pexels API Error:", error.response?.data || error.message);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
