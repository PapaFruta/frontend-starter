<script setup lang = "ts">
import { ref } from 'vue';
import { fetchy } from '../../utils/fetchy';
import ImageUploader from '../Authentication/ImageUploader.vue';

const imgSrc = ref('');
const caption = ref('')

function handleUpload(url:string){
    imgSrc.value = url;
}

async function uploadPost(){
    try{
        const response = await fetchy(`api/posts`,"POST",{body:{
            photo:imgSrc.value,
            caption:caption.value,
        }})
        alert('Post Successfully Uploaded')
    }
    catch{
        console.log('failed to upload post')
    }

    imgSrc.value = ''
    caption.value = ''
}

</script>

<template>
    <hr class = "main-break">
    <div class = "main">
        <label>Caption</label>
        <input  class = "caption-form" v-model="caption" type="text" placeholder="Caption" optional />
        <ImageUploader
        class = "uploader"
        @update:imageSrc="(url)=>handleUpload(url)"/>
        <hr class = "special-break">
        <div class = "button-container">
            <button @click = "uploadPost">Create</button>
        </div>
    </div>
</template>

<style scoped>
.button-container {
    display: flex;
    justify-content: center;
    width: 100%; /* makes sure the container takes full width */
}

.caption-form{
    margin-left: 10%;
    padding: 2%;
    padding-right: 24%;
    background-color: #F9F9F0;
    border: #8DACC4 solid 1px;
    border-radius: 2px;
}

.main-break{
    width: 90%;
}

.special-break{
    width: 100%;
}

.uploader{
    margin-top: 1%;
    margin-bottom: 4%;
}

.main{
    gap: 1%;
}

button {
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