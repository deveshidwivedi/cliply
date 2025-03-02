"use client"
import React, { useState } from "react";
import SelectTopic from "./_components/SelectTopic";
import SelectStyle from "./_components/SelectStyle";

function CreateNew() {

    const [formData, setFormData] = useState([]);
    const onHandleInputChange = (fieldName, fieldValue) => {
        console.log(fieldName, fieldValue);
    }

    return (
        <div className="md:px-20">
            <h2 className="font-bold text-4xl text-primary text-center"> Create new</h2>
            <div className="mt-10 shadow-md p-10">
                {/* topic */}
                <SelectTopic onUserSelect={onHandleInputChange} />
                {/* select style */}
                <SelectStyle onUserSelect={onHandleInputChange} />
                {/* Duration */}

                {/* reate button  */}

            </div>
        </div>
    )
}
export default CreateNew