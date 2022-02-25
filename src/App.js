import {useEffect, useState} from 'react'
import './App.css';

import { Button, LinearProgress, Box, Typography } from '@mui/material';
import Masonry from '@mui/lab/Masonry';
import {PhotoCamera} from '@mui/icons-material';
import useFirebaseHook from './useFirebaseHook';

function App() {
  const [imageAsFile, setImageAsFile] = useState('')
  const [imageAsUrl, setImageAsUrl] = useState(JSON.parse(localStorage.getItem('images')) || [])

  //TODO: Custom Hook to store image in firebase
  const {handleImageAsFile, handleFireBaseUpload, progress} = useFirebaseHook(imageAsFile, setImageAsFile, setImageAsUrl, 'images')

  useEffect(() => {
    localStorage.setItem("images", JSON.stringify(imageAsUrl))
  }, [imageAsUrl])

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
