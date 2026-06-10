import React, { useRef, useState } from 'react'
import {LuUser, LuUpload, LuTrash} from 'react-icons/lu'

const ProfilePicSelector = ({image, setImage}) => {

    const inputRef = useRef(null);
    const[previewUrl, setPreviewUrl] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if(file){
            setImage(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    }

    const handleRemoveImage = () => {
        setImage(null);
        setPreviewUrl(null);
    }

    const onChooseFile = () => {
        inputRef.current.click();
    }

  return (
    <div className='flex justify-center mb-3'>
        <input type="file" ref={inputRef} accept='image/*' onChange={handleImageChange} className='hidden' />

        {!image ? (
            <div className='w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center bg-purple-600/10 relative'>
                <LuUser size={40} className='text-4xl text-primary' />

                <button type='button' onClick={onChooseFile} className='w-8 h-8 rounded-full bg-primary flex items-center justify-center rounded-full absolute -bottom-1 -right-1'><LuUpload size={20} className='text-white' /></button>
           </div>
        ) : (
            <div className='relative'>
                <img src={previewUrl} alt="profile" className='w-20 h-20 rounded-full object-cover' />
                <button type='button' onClick={handleRemoveImage} className='w-8 h-8 rounded-full bg-red-500 flex items-center justify-center rounded-full absolute -bottom-1 -right-1'><LuTrash size={20} className='text-white' /></button>
            </div>
        )}
    </div>
  )
}

export default ProfilePicSelector