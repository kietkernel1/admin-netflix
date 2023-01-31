import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDMWTvrVr9hlDtmqpKPznTFDb3nItPH9Y0",
    authDomain: "shop-cart-8f373.firebaseapp.com",
    databaseURL: "https://shop-cart-8f373-default-rtdb.firebaseio.com",
    projectId: "shop-cart-8f373",
    storageBucket: "shop-cart-8f373.appspot.com",
    messagingSenderId: "71722824912",
    appId: "1:71722824912:web:861c59a2046b987ef45ad5",
    measurementId: "G-Z4BEQ6YXG3"
  };

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export const uploadToFirebase = ({file, label}, setUpload, setLoading) => {

    const fileName = new Date().getTime() + file.name
    const storageRef = ref(storage, `assets/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

     uploadTask.on('state_changed', 
     (snapshot) =>  {

    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
      default :
        return ;
    }
    }, 
    (error) => {
        throw(error.code)
    }, () => {
     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);
      setUpload( prev => ({...prev, [label]: downloadURL}))
      setLoading(prev => ({...prev, [label]: false}))
    });
    }
    );
}

export const deleteData = (url) => {
  const desertRef = ref(storage, url);
  deleteObject(desertRef).then(() => {
  }).catch((error) => {
    throw error
  })
}