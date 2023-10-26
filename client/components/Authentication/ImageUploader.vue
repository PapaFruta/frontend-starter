<!-- <template>
    hi
</template> -->

<script setup lang="ts">
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { defineEmits, ref as vueRef } from "vue";

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

initializeApp(firebaseConfig);

const storage = getStorage();


function handleFileChange(event:Event) {
    if( event.target){
      const target = event.target as HTMLInputElement;
      if(target?.files?.length) {
          imageUpload.value = target.files[0];
      }
    }
    }

const uploadImage = () => {
  const file = imageUpload.value as File;
  const imageRef = ref(storage, `auth/${file.name}`);

  uploadBytes(imageRef,imageUpload.value).then((response)=>{
    console.log(response)
    getDownloadURL(ref(storage, response.ref.fullPath)).then((url)=>
    {
      // console.log('this is url from uploader: ',url);
      imageSrc.value = url
      emit("update:imageSrc",url)
    })
    alert(`Image Uploaded!`)
  })
}
</script>


<template>
    <div>
      <img v-if="imageSrc" :src="imageSrc" alt="Your Image">
      <br />
      <input type="file" @change = "handleFileChange">
      <button @click = "uploadImage">Upload</button>
      <br />
    </div>
  </template>
  
 
<style scoped>

 img{
  max-height: 300px;
 }
 

 button{
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background-color: #8DACC4;
    color: #F9F9F0;
    font-weight: bold;
    transition: background-color 0.2s;
}

button:hover {
    background-color: #6C9CB6;
}
 
  </style>
