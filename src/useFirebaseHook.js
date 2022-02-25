import { storage } from './firebase';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useState } from 'react';


const useFirebaseHook = (imageAsFile, setImageAsFile, setImageAsUrl, images) => {

  const [progress, setProgress] = useState(null)

  const handleImageAsFile = (e) => {
      const image = e.target.files[0]
      const type=image.type.split('/')[1]
      console.log(type === 'png' || type ==='jpg' || type==='jpeg');
      if(type === 'png' || type ==='jpg' || type==='jpeg') {
        setImageAsFile(image)
      } else {
        alert("Only JPG, JPEG, PNG format is suported")
      }
  }

  const handleFireBaseUpload = (e) => {
      e.preventDefault()
      console.log('start of upload')
  
      const storageRef=ref(storage, `${images}/${imageAsFile.name}`)
      const uploadTask = uploadBytesResumable(storageRef, imageAsFile)
  
      uploadTask.on('state_changed', 
        (snapshot) => {
          // progress function
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setProgress(progress)
        }, 
        (error) => {
          console.log({error});
        }, () => {
          // complete function
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            console.log(url);
            setImageAsUrl((imageAsUrl)=>[url, ...imageAsUrl]);
            setImageAsFile('')
            setProgress()
          }).catch((err)=>console.log({Error:err}))
        })
      
  }
  return (
      {handleImageAsFile,handleFireBaseUpload, progress}
  )
}

export default useFirebaseHook