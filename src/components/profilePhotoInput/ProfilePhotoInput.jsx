import React, { useState } from 'react';
import { Edit2 } from 'lucide-react'

const ProfilePhotoInput = () => {
    const [imageSrc, setImageSrc] = useState(''); // State to store the image data URI

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                setImageSrc(e.target.result);
            };

            reader.readAsDataURL(file);
        }
    };

    return (
        <div>
            <label htmlFor="imageInput">
                <div className='bg-blue-500 flex justify-center items-center'>
                    <img
                        className="p-2 h-[120px] w-[120px] rounded-full object-cover cursor-pointer"
                        src={imageSrc || 'https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGJsb2d8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60'}
                        alt="Image"
                    />
                    {/* </img> */}
                    <Edit2 className='absolute font cursor-pointer'/>
                    {/* >/ */}
                    {/* /> */}

                </div>
            </label>
            <input
                type="file"
                id="imageInput"
                accept="image/*"
                capture="camera"
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
        </div>
    );
};

export default ProfilePhotoInput;
