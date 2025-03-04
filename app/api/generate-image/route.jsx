import axios from "axios";

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


        const response = await axios.get("https://api.pexels.com/v1/search", {
            headers: {
                Authorization: PEXELS_API_KEY,
            },
            params: {
                query: prompt,
                per_page: 1,
            },
        });

        //save to firebase

        return new Response(JSON.stringify(response.data), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });

    } catch (error) {
        console.error("Pexels API Error:", error.response?.data || error.message);

        return new Response(
            JSON.stringify({ error: error.response?.data || "Internal Server Error" }),
            {
                status: error.response?.status || 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
}
