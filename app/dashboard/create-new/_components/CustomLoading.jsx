import React from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogTitle,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Image from "next/image";


function CustomLoading({ loading }) {
    return (
        <AlertDialog open={loading}>
            <AlertDialogContent>
                <div className="flex flex-col items-center my-10 justify-center">
                    <Image src={'/progress.gif'} alt="loading" width={100} height={100} />
                    <h2>Generating your amazing video... Please don't Refresh</h2>
                </div>
            </AlertDialogContent>
        </AlertDialog>

    );
}

export default CustomLoading;