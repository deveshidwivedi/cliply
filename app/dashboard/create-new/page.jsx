import React from "react";
import SelectTopic from "./_components/SelectTopic";

function CreateNew() {
    return (
        <div className="md:px-20">
            <h2 className="font-bold text-4xl text-primary text-center"> Create new</h2>
            <div className="mt-10 shadow-md p-10">
                {/* topic */}
                <SelectTopic />
                {/* select style */}

                {/* Duration */}

                {/* reate button  */}

            </div>
        </div>
    )
}
export default CreateNew