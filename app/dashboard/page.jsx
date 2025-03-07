"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import EmptyState from "./_components/EmptyState";
import Link from "next/link";
import { VideoData } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";
import { db } from "@/configs/db";
import VideoList from "./_components/VideoList";
import { useContext } from "react";
import { UserDetailContext } from "../_context/UserDetailContext";

function Dashboard() {
    const [videoList, setVideoList] = useState([]);
    const { userDetail, setUserDetail } = useContext(UserDetailContext);
    const { user } = useUser();

    useEffect(() => {
        user && GetVideoList();
    }, [user])

    const GetVideoList = async () => {
        const result = await db.select().from(VideoData)
            .where(eq(VideoData?.createdBy, user?.primaryEmailAddress?.emailAddress))

        console.log(result)
        setVideoList(result)
    }

    return (
        <div>
            <div className="flex justify-between items-center">
                <h2 className="font-bold text-2xl "> Dashboard</h2>

                <Link href={'/dashboard/create-new'}> <Button className="mt-2 px-6 py-3 text-lg">+ Create New</Button></Link>
            </div>

            {videoList?.length == 0 && <div><EmptyState /></div>}

            {/* { List of videos} */}
            <VideoList videoList={videoList} />

        </div>
    )
}

export default Dashboard