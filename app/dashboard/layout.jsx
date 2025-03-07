"use client"
import React, { useEffect, useState } from "react";
import Header from "./_components/Header";
import SideNav from "./_components/SideNav";
import { VideoDataContext } from "../_context/VideoDataContext";
import { UserDetailContext } from "../_context/UserDetailContext";
import { useUser } from "@clerk/nextjs";
import { db } from "@/configs/db";
import { Users } from "@/configs/schema";
import { eq } from "drizzle-orm";
function DashboardLayout({ children }) {

    const [videoData, setVideoData] = useState({});
    const [userDetail, setUserDetail] = useState({});
    const { user, isLoaded } = useUser();  // Use isLoaded to ensure user data is ready

    useEffect(() => {
        if (isLoaded && user) {
            getUserDetail();
        }
    }, [isLoaded, user]);

    const getUserDetail = async () => {
        try {
            console.log("Fetching user with email:", user?.primaryEmailAddress?.emailAddress);

            const result = await db
                .select()
                .from(Users)
                .where(eq(Users.email, user?.primaryEmailAddress?.emailAddress));

            console.log("Fetched User Detail:", result);

            if (result.length > 0) {
                setUserDetail(result[0]);
            } else {
                console.warn("User details not found!");
                setUserDetail(null);  // Explicitly set null
            }
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    };

    return (
        <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>


            <VideoDataContext.Provider value={{ videoData, setVideoData }}>
                <div>
                    <div className="hidden md:block h-screen bg-white fixed mt-[65px] w-64">
                        <SideNav />
                    </div>
                    <div>
                        <Header />
                        <div className="md:ml-64 p-10">
                            {children}
                        </div>
                    </div>
                </div>
            </VideoDataContext.Provider>
        </UserDetailContext.Provider>
    );
}

export default DashboardLayout;