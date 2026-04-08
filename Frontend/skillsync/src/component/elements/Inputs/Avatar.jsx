import React, { useRef, useState, useEffect } from 'react'
import { LuUser, LuUpload, LuTrash } from 'react-icons/lu';

export default function Avatar({ image, setImage }) {

    const inputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    // Sync previewUrl if parent resets image to null externally
    useEffect(() => {
        if (!image) {
            setPreviewUrl(prev => {
                if (prev) URL.revokeObjectURL(prev);
                return null;
            });
        }
    }, [image]);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Revoke previous blob URL before creating a new one
            if (previewUrl) URL.revokeObjectURL(previewUrl);
            setImage(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleRemoveImage = () => {
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setImage(null);
        setPreviewUrl(null);
        // Reset input so the same file can be re-selected
        if (inputRef.current) inputRef.current.value = "";
    };

    const onChooseFile = () => {
        inputRef.current.click();
    };

    return (
        <div className='flex justify-center mb-1'>
            <input
                type="file"
                accept='image/*'
                ref={inputRef}
                onChange={handleImageChange}
                className='hidden'
            />

            {!image ? (
                <div className='w-24 h-24 flex flex-col items-center justify-center bg-purple-100 rounded-full relative'>
                    <LuUser className='text-4xl text-blue-950' />
                    <button
                        type='button'
                        className='absolute bottom-0 right-0 bg-blue-800 p-2 rounded-full text-white'
                        onClick={onChooseFile}
                    >
                        <LuUpload />
                    </button>
                </div>
            ) : (
                <div className='relative'>
                    <img
                        src={previewUrl}
                        alt="profile"
                        className='w-24 h-24 rounded-full object-cover'
                    />
                    <button
                        type='button'
                        className='absolute bottom-0 right-0 bg-red-400 p-2 rounded-full text-white'
                        onClick={handleRemoveImage}
                    >
                        <LuTrash />
                    </button>
                </div>
            )}
        </div>
    );
}