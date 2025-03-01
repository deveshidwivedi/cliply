import { SignIn } from "@clerk/nextjs";

export default function Page() {
    return (
        <div className="relative flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
            {/* Background Image */}
            <div className="absolute inset-0 bg-[url('/bgimg.jpg')] bg-cover bg-center opacity-40 dark:opacity-30"></div>

            {/* Login Form */}
            <div className="relative z-10  bg-white/70 dark:bg-gray-800/70 backdrop-blur-md shadow-xl rounded-lg border border-gray-200 dark:border-gray-700">
                <SignIn />
            </div>
        </div>
    );
}
