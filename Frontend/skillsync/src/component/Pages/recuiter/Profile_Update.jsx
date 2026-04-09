import React from 'react'
import Model from '../../Model'
import { useState,useContext } from 'react';

import UserContext from '../../context/UserContext.jsx'

import Input from '../../elements/Inputs/Input.jsx'

function Profile_Update() {

    const {user}=useContext(UserContext);

    const[fullname,setFullname]=useState('');
    const[email,setEmail]=useState('');
    const[username,setUsername]=useState('');
    const[skills,setSkills]=useState('');
    const[recruiterRole,setRecuiterRole]=useState('');
    const[location,SetLoaction]=useState('');
    const[contact,setContact]=useState('');
    const[companyName,SetCompany]=useState('');

  return (
    <div>
        <Input label={"Fullname"} type={'text'} placeholder={user.fullname} value={user.fullname} onChange={setFullname} autoComplete={fullname}/>

        <Input label={"Username"} type={'text'} placeholder={user.username} value={user.username} onChange={setUsername} autoComplete={username}/>

        <Input label={"Email"} type={'email'} placeholder={user.email} value={user.email} onChange={setEmail} autoComplete={email}/>

        <Input label={"Contact"} type={'number'} placeholder={user.contact || "add phone number"} value={user.contact} onChange={setContact} autoComplete={contact}/>

        <Input label={"Location"} type={'type'} placeholder={user.location || "add your loaction"}  value={user.location} onChange={SetLoaction} autoComplete={location}/>

        <Input label={"Company"} type={'text'} placeholder={user.companyName || "add company name"} value={user.companyName} onChange={SetCompany} autoComplete={companyName}/>

        <Input label={"Skills"} type={'text'} placeholder={"add skills"} value={skills} onChange={setSkills} autoComplete={skills}/>

        <Input label={"Recuiter role"} type={'text'} placeholder={user.recruiterRole} value={user.recruiterRole} onChange={setRecuiterRole} autoComplete={recruiterRole}/>

        <div className='flex justify-end mt-5 gap-4'>
            <button className='text-blue-800 text-lg font-medium'>
                Cancle
            </button>
            <button className='rounded-2xl bg-blue-800 text-lg text-white px-5 py-2'>
                Save
            </button>
        </div>
        
    </div>
  )
}

export default Profile_Update