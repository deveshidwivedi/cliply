import { Button } from "@/components/ui/button";
import React from "react";
import Link from "next/link";

function EmptyState() {
    return (
        <div className="p-8 py-24 flex flex-col items-center justify-center mt-10 border-2 border-dashed border-gray-300 rounded-lg text-center">
            <h2 className="text-2xl font-semibold text-gray-600 mb-4">
                No videos yet—time to create something awesome!
            </h2>
            <Link href={'/dashboard/create-new'}> <Button className="mt-2 px-6 py-3 text-lg">Create a fresh short video</Button></Link>
        </div>
    );
}

export default EmptyState;
