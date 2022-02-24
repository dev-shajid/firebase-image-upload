import {useEffect, useState} from 'react'
import './App.css';
import { storage } from './firebase';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

import { Button, LinearProgress, Box, Typography } from '@mui/material';
import Masonry from '@mui/lab/Masonry';
import {PhotoCamera} from '@mui/icons-material';

function App() {
  const [imageAsFile, setImageAsFile] = useState('')
  const [imageAsUrl, setImageAsUrl] = useState(JSON.parse(localStorage.getItem('images')))
  const [progress, setProgress] = useState(null)

  useEffect(() => {
    localStorage.setItem("images", JSON.stringify(imageAsUrl))
  }, [imageAsUrl])
  
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('images'))
    console.log(data);
  },[])

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

    const storageRef=ref(storage, `images/${imageAsFile.name}`)
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
          setImageAsUrl([url, ...imageAsUrl]);
          setImageAsFile('')
          setProgress(null)
        }).catch((err)=>console.log({Error:err.message}))
      })
    
  }

  return (
    <div className="App">
      <h1>Upload your image and make a gallery</h1>
      <div className='button_div'>
        {!progress && <label className='input_icon' htmlFor="img_upload">
          <input type="file" id='img_upload' onChange={handleImageAsFile} />
          {/* <IconButton> */}
            <PhotoCamera/>
          {/* </IconButton> */}
        </label>}
        
        {imageAsFile && !progress && <Button className='upload_button' variant="contained" onClick={handleFireBaseUpload}>
            Upload
        </Button>}
      </div>

      {progress!==0 && progress? <Box sx={{ display: 'flex', width: '300px', alignItems: 'center', margin:"auto", marginTop:"20px" }}>
        <Box className='progress' sx={{ width: '100%', mr: 1 }}>
          <LinearProgress variant="determinate" value={progress} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            progress,
          )}%`}</Typography>
        </Box>
      </Box> : <div style={{marginTop:"20px"}}></div>}

      <Box sx={{ width: "100%", minHeight: 829, marginTop:"20px" }}>
        <Masonry columns={3} spacing={2}>
          {imageAsUrl?.map((item, index) => (
            <div key={index}>
              <img
                src={`${item}`}
                srcSet={`${item}`}
                alt={'title of img'}
                loading="lazy"
                style={{
                  borderBottomLeftRadius: 4,
                  borderBottomRightRadius: 4,
                  display: 'block',
                  width: '100%',
                }}
              />
            </div>
          ))}
        </Masonry>
      </Box>

    </div>
  );
}

export default App;
