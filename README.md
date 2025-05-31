# Cliply - AI Short Video Generator

Cliply is an AI-powered web application that lets you generate short, engaging videos using different themes, styles, and durations. Leveraging the Gemini API for script generation, Cliply combines AI-generated scripts, voiceovers, captions, and themed images to create unique short videos in just a few clicks.

## Features

- Generate short videos on a variety of topics and themes
- Choose from multiple visual styles (Photorealistic, Cartoonish, Comic Book, Watercolor, GTA Art Style, and more)
- AI-generated scripts using Google Gemini API
- Automatic image generation and selection
- AI voiceover and captioning
- User authentication and video history
- Fast, serverless backend with Next.js, Drizzle ORM, and Firebase Storage

## Tech Stack

- **Next.js** (App Router)
- **React** (Client Components)
- **Google Gemini API** (Script generation)
- **AssemblyAI** (Audio captioning)
- **Google Cloud Text-to-Speech** (Voiceover)
- **Pexels API** (Image sourcing)
- **Firebase Storage** (Media storage)
- **Drizzle ORM + NeonDB** (Database)
- **Clerk** (Authentication)
- **Remotion** (Video rendering)
- **Tailwind CSS** (Styling)

## Getting Started

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/cliply.git
   cd cliply
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file and add your API keys and config:
   ```
   NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_DRIZZLE_URL=your_neon_db_url
   GOOGLE_API_KEY=your_google_cloud_api_key
   CAPTION_API=your_assemblyai_api_key
   PEXELS_API_KEY=your_pexels_api_key
   ```

4. **Run the development server:**
   ```sh
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

## Usage

- Sign up or log in with your account.
- Choose a topic, style, and duration for your video.
- Click "Create Short Video" and let the AI do the rest!
- Preview, download, or share your generated videos from your dashboard.
