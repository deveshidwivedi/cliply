import React from "react";
import Image from 'next/image';
import { useState } from "react";

function SelectStyle({ onUserSelect }) {
    const styleOptions = [
        {
            name: 'Photorealistic',
            image: '/real.jpg'
        },
        {
            name: 'Cartoonish',
            image: '/cartoon.jpg'
        },
        {
            name: 'Comic Book',
            image: '/comic.jpg'
        },
        {
            name: 'Watercolor Painting',
            image: '/watercolor.jpg'
        },
        {
            name: 'GTA Art Style',
            image: '/gta.jpg'
        },
    ];
    const [selectedOption, setSelectedOption] = useState();

    return (
        <div className="mt-7">
            <h2 className="font-bold text-2xl text-primary">
                Style
            </h2>
            <p className="text-gray-500">Choose your video style</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-5 mt-3 ">
                {styleOptions.map((item, index) => (
                    <div key={index} className={`relative hover:scale-105 transition-all  cursor-pointer rounded-xl
                    ${selectedOption == item.name && 'border-4 border-pink-500'}
                    `}>
                        <Image src={item.image} alt={item.name} width={100} height={100}
                            className="h-48 object-cover rounded-lg w-full"
                            onClick={() => {
                                setSelectedOption(item.name)
                                onUserSelect('imageStyle', item.name)
                            }}
                        />
                        <h2 className="absolute p-1 bg-black bottom-0 w-full text-white text-center rounded-b-lg">{item.name}</h2>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default SelectStyle