import {useEffect, useState} from 'react'
import './App.css';

import { Button, LinearProgress, Box, Typography } from '@mui/material';
import Masonry from '@mui/lab/Masonry';
import {PhotoCamera} from '@mui/icons-material';
import useFirebaseHook from './useFirebaseHook';

function App() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)
  const [imageAsFile, setImageAsFile] = useState('')
  const [imageAsUrl, setImageAsUrl] = useState(JSON.parse(localStorage.getItem('images')) || [])

  //TODO: Custom Hook to store image in firebase
  const {handleImageAsFile, handleFireBaseUpload, progress} = useFirebaseHook(imageAsFile, setImageAsFile, setImageAsUrl, 'images')

  useEffect(() => {
    localStorage.setItem("images", JSON.stringify(imageAsUrl))
  }, [imageAsUrl])

  useEffect(() => {
    let getImage = JSON.parse(localStorage.getItem('images'))
    if (!getImage.length) {
      setImageAsUrl(["https://firebasestorage.googleapis.com/v0/b/banner-photo.appspot.com/o/images%2Ffidel-fernando-3K0LfPFBz9U-unsplash.jpg?alt=media&token=d6058804-a975-480b-acf5-be751fad0a9d","https://firebasestorage.googleapis.com/v0/b/banner-photo.appspot.com/o/images%2Fsven-kucinic-_ZW5UUZ-1Yg-unsplash.jpg?alt=media&token=452d2244-444d-4e4c-8777-e897b0dfefff","https://firebasestorage.googleapis.com/v0/b/banner-photo.appspot.com/o/images%2Fdaniel-sessler-8vwjO4ucBA8-unsplash.jpg?alt=media&token=2b20cb66-9b16-42a3-94aa-cf0ed9d405cc","https://firebasestorage.googleapis.com/v0/b/banner-photo.appspot.com/o/images%2Ftezos-mKLjUjUkX6c-unsplash.jpg?alt=media&token=1144d89b-fc98-4c07-b2cd-8da4694d9c1d","https://firebasestorage.googleapis.com/v0/b/banner-photo.appspot.com/o/images%2Fcole-keister-HmRYWtfNXN0-unsplash.jpg?alt=media&token=b4f93b4f-cef8-4bd3-8b2e-4bc67e7cc75d","https://firebasestorage.googleapis.com/v0/b/banner-photo.appspot.com/o/images%2Fobi-pixel6propix-FSEMesejKWw-unsplash.jpg?alt=media&token=f8579ff7-a4da-44bd-a7bc-a4304a91dc95","https://firebasestorage.googleapis.com/v0/b/banner-photo.appspot.com/o/images%2Fsurface-CIrJuUI75hg-unsplash.jpg?alt=media&token=4eaf06fc-0a6f-4ced-a587-8c93224590a9","https://firebasestorage.googleapis.com/v0/b/banner-photo.appspot.com/o/images%2Fclayton-malquist-k-sk07-7vkA-unsplash.jpg?alt=media&token=8da4049e-f8e8-4e31-8a19-76d4707ab154"])
      localStorage.setItem("images", JSON.stringify(imageAsUrl))
    }
  }, [])

  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth)   
    }
    window.addEventListener('resize', handleResize)
  })

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
        <Masonry columns={screenWidth>=700?3:2} spacing={screenWidth>=700?2:1}>
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
