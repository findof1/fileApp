'use client'
import React from 'react'
import { storage } from "../firebase-config"
import { db } from '../firebase-config'
import { ref, uploadBytes } from "firebase/storage"
import { v4 } from "uuid"
import { useState } from "react"
import Button from "../components/Button"
import TextArea from './TextArea'
import { MdOutlineUploadFile } from "react-icons/md";
import {
  collection,
  addDoc
} from "firebase/firestore";
import TextInput from './TextInput'
import { useRouter } from 'next/navigation'

const Uploader = ({userdata}) => {
  const [file, setFile] = useState()
  const [customName, setCustomName] = useState('')
  const [description, setDescription] = useState('')
  const [uploads, setUploads] = useState(0)
  const [errMsg, setErrMsg] = useState('')
  const router = useRouter()

  const saveFile = () => {
    if(uploads > 0){
      setErrMsg('No Spamming Uploads')
    }else{
    if(file){
      if(customName){
        if(description){
          if(customName.length < 60){
          setUploads(uploads + 1)
    const fileRef = ref(storage, `files/${file.name + v4()}`)
    uploadBytes(fileRef, file).then(async (res)=>{
      
      await addDoc(collection(db, "files"), {
        filename: res.metadata.name,
        user: userdata.username,
        name: customName,
        description: description,
        likes: [],
        downloads: [],
        likeCount: 0,
        downloadCount: 0
      });
      setCustomName('')
      setDescription('')
      setFile()
      router.push('/home')
    })
  }else{
    setErrMsg('Your Name Cannot Be Longer Than 60 Characters')
  }
  }else{
    setErrMsg('Please Enter A Description')
  }
    }else{
      setErrMsg('Please Enter A Name')
    }
    }else{
      setErrMsg('Please Enter A File')
    }
  }
  }
  return (

    <div class="flex flex-col items-center justify-center">
      <h1 className='text-6xl underline mt-12'>Upload A File</h1>
      <input  
        id="fileUpload"  
        type="file"  
        className="hidden"  
        onChange={(e) => {setFile(e.target.files[0]);}}  
      ></input>
      <label  
        for="fileUpload"  
        className=" px-4 py-2 text-white bg-blue-500 rounded cursor-pointer hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex flex-row justify-center items-center mt-8"
      >
        <MdOutlineUploadFile style={{ height: '30px', width: '30px' }} />
        Upload File
      </label>
      <TextInput label='Set A Name For Your File: ' extraStyles='mt-12' onChange={(e)=>{setCustomName(e.target.value)}} value={customName}></TextInput>
      <TextArea label='Set A Description For Your File: ' extraStyles='mt-12' onChange={(e)=>{setDescription(e.target.value)}} value={description}></TextArea>
      <p className='text-xl mt-5'>Uploaded File: {file?.name}</p>
      <p>{errMsg}</p>
      <Button style="submit" onClick={saveFile} extraStyles='mt-4 w-28 h-12'>Submit</Button>
    </div>

  )
}

export default Uploader