import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { useContext } from "react";
import { UserDetailContext } from "@/app/_context/UserDetailContext";

function Header() {
    const { userDetail, setUserDetail } = useContext(UserDetailContext);

    return (
        <div className="p-3 px-5 flex items-center justify-between shadow-md">
            <div className="flex gap-3 items-center">
                <Image src={'/logo.svg'} alt="Cliply" width={30} height={30} />
                <h2 className="font-bold text-xl">Cliply</h2>
            </div>
            <div className="flex gap-3 items-center">
                <div className="flex gap-1 items-center">
                    <img src="/star.png" alt="Coin" width={30} height={30} />
                    <h2>{userDetail ? userDetail.credits : "Loading..."}</h2>

                </div>
                <Button>Dashboard</Button>
                <UserButton />
            </div>
        </div>
    )
}

export default Header