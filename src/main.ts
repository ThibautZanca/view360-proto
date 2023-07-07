import View360, { CylindricalProjection } from "@egjs/view360";
import { GyroControl } from "@egjs/view360";

interface DeviceOrientationEventiOS extends DeviceOrientationEvent {
  requestPermission?: () => Promise<'granted' | 'denied'>;
}
const requestPermission = (DeviceOrientationEvent as unknown as DeviceOrientationEventiOS).requestPermission;
const iOS = typeof requestPermission === 'function';
// shouldQueryPermission is 'true' on some envs like iOS 13+.
const shouldQueryPermission = iOS;
// Returns whether you have already acquired gyroscope permissions.
// This method is asynchronous, which can take up to 1 second.

// ⚠️ The code below must be executed within the user interaction context.
// That is, it must be run on a handler of click events, etc., otherwise it will not work.


const giroBtn = document.querySelector("#giro-btn");

if(giroBtn) {
  giroBtn.addEventListener('click',  () => {
    //const gyroAvailable = await GyroControl.isAvailable();

    if (shouldQueryPermission ) {
      GyroControl.requestSensorPermission().then(available => {
        alert(available);
      });

    }
  });
}

/*
const video = document.querySelector("#camera");

if (navigator.mediaDevices?.getUserMedia && video) {

  navigator.mediaDevices?.getUserMedia({ video: true })
      .then(function (stream) {
        video.srcObject = stream;
      })
      .catch(function (error) {
        console.log("Something went wrong!");
      });
}*/

const hotspots =  document.querySelectorAll(".view360-hotspot");
for(const hotspot of hotspots) {
  hotspot.addEventListener('click', ()=> alert(1));
}

//const image = '/panorama.png';
const image = '/panorama3.png';

//const image = 'https://images.pexels.com/photos/144352/pexels-photo-144352.jpeg';

 new View360("#viewer", {
  gyro: true,
  rotate: true,
  projection: new CylindricalProjection({
    src: image,
    video: false
  })
});
