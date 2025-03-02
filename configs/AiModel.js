const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
 
    export const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "write a script to generate a 30 seconds short video on the topic: interesting historical story along with AI image prompt in Realistic format for each scene and give me result in JSON format with imagePrompt and ContentText as fields, no plain text"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n[\n  {\n    \"imagePrompt\": \"A photorealistic image of a grand library in ancient Alexandria, Egypt. Papyrus scrolls are stacked high, sunlight streams through tall windows illuminating dust motes dancing in the air. Scholars in simple robes are engrossed in reading and writing.\",\n    \"ContentText\": \"Did you know? The Library of Alexandria, one of the largest and most significant libraries of the ancient world, was tragically lost.\"\n  },\n  {\n    \"imagePrompt\": \"A realistic depiction of a catastrophic fire engulfing a massive library. Flames are licking at the scrolls, the roof is collapsing, and smoke billows into the sky. Roman soldiers in armor stand by, seemingly helpless to stop the blaze. Focus on the intensity of the heat and destruction.\",\n    \"ContentText\": \"While the exact cause remains debated, theories suggest everything from accidental fires to deliberate destruction during Roman conquests contributed to its demise.\"\n  },\n  {\n    \"imagePrompt\": \"A photorealistic, slightly aged parchment map showing the Mediterranean region. Highlight Alexandria, Egypt.  The map is detailed, showing trade routes and important cities.\",\n    \"ContentText\": \"Its destruction represents an irreplaceable loss of knowledge and a setback to scientific and cultural advancement in the region.\"\n  },\n  {\n    \"imagePrompt\": \"A photorealistic reconstruction of a scholar in the Library of Alexandria, looking heartbroken as he watches the destruction. He holds a precious scroll in his hands, his face filled with sorrow and regret.\",\n    \"ContentText\": \"Imagine the countless lost works of literature, science, and philosophy... lost forever.\"\n  },\n  {\n    \"imagePrompt\": \"A photorealistic close-up shot of a charred piece of papyrus. Fragments of ancient Greek writing are barely visible. The background is blurred, emphasizing the fragility and irretrievability of the lost knowledge.\",\n    \"ContentText\": \"A chilling reminder of the fragility of knowledge and the importance of preserving our intellectual heritage.\"\n  },\n  {\n    \"imagePrompt\": \"A photorealistic, modern-day library. Clean lines, filled with rows upon rows of books. People are browsing and studying quietly. Sunlight streams through the windows, creating a sense of peace and learning. A subtle reminder of the need to safeguard such resources.\",\n    \"ContentText\": \"Let's learn from history and protect the libraries and knowledge centers of today!\"\n  }\n]\n```"},
          ],
        },
      ],
    });
  
 