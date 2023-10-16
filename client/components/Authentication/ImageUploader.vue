<!-- <template>
    hi
</template> -->

<script setup lang="ts">
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { ref as vueRef, defineEmits } from "vue";

const imageUpload = vueRef();
const imageSrc = vueRef();

const emit = defineEmits(['update:imageSrc']);

const firebaseConfig = {
  apiKey: "AIzaSyD2j1ypdzQ-sYci8KhspfjAzLm_Up6VErw" ,
  authDomain: "interlives-c40b5.firebaseapp.com",
  projectId: "interlives-c40b5",
  storageBucket:"interlives-c40b5.appspot.com",
  messagingSenderId: "1051328712035",
  appId: "1:1051328712035:web:5488f26fae65422bf55756"
};


//Initialize a firebase application
initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage();


function handleFileChange(event:Event) {
    if( event.target){
      imageUpload.value = event.target.files[0];
    }
    }

const uploadImage = () => {
  console.log('trying to upload')
  const imageRef = ref(storage, `auth/${imageUpload.name}`)

  uploadBytes(imageRef,imageUpload.value).then((response)=>{
    console.log(response)
    getDownloadURL(ref(storage, response.ref.fullPath)).then((url)=>
    {
      console.log('this is url');
      imageSrc.value = url
      emit("update:imageSrc",url)
    })
    alert(`Image Uploaded!`)
  })
}
</script>


<template>
    <div>
      <img :src="imageSrc" alt="Your Image">
      <br />
      <input type="file" @change = "handleFileChange">
      <button @click = "uploadImage">Upload ID</button>
      <br />
      <strong>
        <!-- <p>{{ imgUrl }}</p> -->
      </strong>
    </div>
  </template>
  
 
  <style>
  /* You can add styles here if you want */
  </style>
