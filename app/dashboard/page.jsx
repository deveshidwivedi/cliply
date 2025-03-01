"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import EmptyState from "./_components/EmptyState";

function Dashboard() {
    const [videoList, setVideoList] = useState([]);
    return (
        <div>
            <div className="flex justify-between items-center">
                <h2 className="font-bold text-2xl "> Dashboard</h2>
                <Button>+ Create New</Button>
            </div>

            {videoList?.length == 0 && <div><EmptyState /></div>}

        </div>
    )
}

export default Dashboard