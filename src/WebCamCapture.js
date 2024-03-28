
import React, { useCallback, useRef } from 'react'
import  Webcam from 'react-webcam'
import {useDispatch} from 'react-redux'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { setCameraImage } from './features/cameraSlice';
import { useHistory } from 'react-router-dom';
import './WebCamCapture.css'
const videoConstarints = {
    width: 250,
    height:400,
    facingMode: 'user',
}

function WebCamCapture () {

    const webcamRef = useRef(null)
    const dispatch = useDispatch()
    const history = useHistory()
   
    const capture = useCallback(() =>{
     
        const imageSrc = webcamRef.current.getScreenshot();

        dispatch(setCameraImage(imageSrc))
            history.push('/preview')
    },[webcamRef]);

  return (
    <div className = 'webcamcapture'>
 <Webcam
     audio = {false}
     height = {videoConstarints.height}
     ref ={webcamRef}
     screenshotFormat='image/jpeg'
     width={videoConstarints.width}
     videoConstraints={videoConstarints}
 />
 <RadioButtonUncheckedIcon 
     className = 'webcameCapture__button'
     onClick={capture}
      fontSize = 'large'
     
 />

 
</div>
  )
}

export default WebCamCapture