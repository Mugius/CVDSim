import React, {useEffect, useState} from 'react';
import './home.scss';
import css from './home.scss';


export default () => {
  const [CVDType, setCVDType] = useState('NONE');
  const [frontFacing, setFrontFacing] = useState(true);
  
  useEffect(()=>{
    getCamera(frontFacing ? 'user' : 'environment');
  }, [frontFacing])

  const flipCamera = () => {
    const video = document.querySelector('video');
    video.srcObject && video.srcObject.getTracks().forEach(t => t.stop());
    setFrontFacing(!frontFacing);
    
  }

  return (
  <>
    <div className={css.buttonContainer}>
      <button className={CVDType === 'NONE' ? css.active : ''} onClick={()=>setCVDType('NONE')}>Reset</button>
      <button className={CVDType === 'deuteranopia' ? css.active : ''} onClick={()=>setCVDType('deuteranopia')}>Deuteranopia</button>
      <button className={CVDType === 'protanopia' ? css.active : ''} onClick={()=>setCVDType('protanopia')}>Protanopia</button>
      <button className={CVDType === 'tritanopia' ? css.active : ''} onClick={()=>setCVDType('tritanopia')}>Tritanopia</button>
    </div>
    <button className={css.flip} onClick={()=>flipCamera()}>Flip Camera</button>
    <video autoPlay playsInline muted className={css[CVDType]}/>
  </>
  )
};

const getCamera = (mode) => {
    if (navigator.mediaDevices === undefined) {
      navigator.mediaDevices = {};
    }
    if (navigator.mediaDevices.getUserMedia === undefined) {
      navigator.mediaDevices.getUserMedia = function(constraints) {
        var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        if (!getUserMedia) {
          return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
        }
        return new Promise(function(resolve, reject) {
          getUserMedia.call(navigator, constraints, resolve, reject);
        });
      }
    }
    navigator.mediaDevices.getUserMedia({ video: { facingMode:  mode } })
    .then(function(stream) {
      const video = document.querySelector('video');
      if ("srcObject" in video) {
        video.srcObject = stream;
      } else {
        video.src = window.URL.createObjectURL(stream);
      }
      video.onloadedmetadata = function(e) {
        video.play();
      };
    })
}