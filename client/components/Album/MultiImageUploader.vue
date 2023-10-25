<template>
    <div class="container">
        <div class="image-grid" :style="{ gridTemplateColumns: getGridTemplateColumns() }">
            <div v-for="src in imageSrcs" :key="src" class="image-container">
                <img :src="src" alt="Your Image">
            </div>
        </div>
        <div v-if = "!fillTitle" class="upload-section">
            <input type="file" @change="handleFileChange" multiple>
            <button @click="uploadImages">Upload</button>
            <button v-if = "imageSrcs.length>0" @click="fillTitle = true">Next</button>
        </div>
        <div   class="upload-section" v-if = "fillTitle">
            <label>Album Title</label>
            <input v-model = "title" type = "text"/>
            <button @click="createAlbum">Create</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { defineEmits, defineProps, ref as vueRef } from "vue";
import { fetchy } from "../../utils/fetchy";

const imageUploads = vueRef<File[]>([]);
const imageSrcs = vueRef<string[]>([]);
const fillTitle = vueRef(false)
const title = vueRef<string>('');

const props = defineProps({
    username:String
})
const emit = defineEmits(['update:imageSrcs']);

const firebaseConfig = {
  apiKey: "AIzaSyD2j1ypdzQ-sYci8KhspfjAzLm_Up6VErw",
  authDomain: "interlives-c40b5.firebaseapp.com",
  projectId: "interlives-c40b5",
  storageBucket:"interlives-c40b5.appspot.com",
  messagingSenderId: "1051328712035",
  appId: "1:1051328712035:web:5488f26fae65422bf55756"
};

initializeApp(firebaseConfig);

const storage = getStorage();

function handleFileChange(event: Event) {
    if (event.target) {
        const target = event.target as HTMLInputElement;
        if (target.files) {
            imageUploads.value = Array.from(target.files);
        }
    }
}

const uploadImages = () => {
    imageSrcs.value = []
    if(imageUploads.value.length>0){
        imageUploads.value.forEach((file) => {
        const imageRef = ref(storage, `auth/${file.name}`);

        uploadBytes(imageRef, file).then((response) => {
            getDownloadURL(ref(storage, response.ref.fullPath)).then((url) => {
                imageSrcs.value.push(url);
            });
        });
        });
    // emit("update:imageSrcs", imageSrcs.value);
        alert(`Images Uploaded!`);
    }
    else{
        alert(`Please Select Photo`)
    }
   
}

const getGridTemplateColumns = () => {
    const columns = Math.min(imageSrcs.value.length, 4);
    return `repeat(${columns}, 1fr)`;
}

async function createAlbum(){
    console.log(`This is album titled ${title.value}, with files: ${imageSrcs.value}`)
    console.log(`this is file: `,imageSrcs.value)
    try{
        const response = await fetchy(`api/chat/album`,"POST",{body:{
                                to: props.username,
                                title: title.value,
                                photos: imageSrcs.value
        }})

        alert(response.msg)
    }
    catch{
        console.log(`Failing to create album`)
    }
    
    imageSrcs.value = []
    title.value = ''
    fillTitle.value = false
}
</script>

<style scoped>
.container {
    position: relative; /* New */
    display: flex;
    flex-direction: column;
    justify-content: space-between; /* Updated from 'center' to 'space-between' */
    align-items: center;
    height: 100%;
    gap: 10px;
}

.upload-section {
    position: absolute; /* New */
    top: 90%;        
    left: 50%;         /* New */
    transform: translate(-50%, -50%); /* New */
    display: flex;
    gap: 10px;
    align-items: center;
}

.image-grid {
    display: grid;
    gap: 10px;
    max-width: 70%;
    margin-bottom: 10px;
}

.image-container {
    overflow: hidden;
}

img {
    max-width: 100%;
    max-height: 250px;
}

/* .upload-section {
    display: flex;
    gap: 10px;
    align-items: center;
} */

button {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background-color: #007BFF;
    color: #fff;
    font-weight: bold;
    transition: background-color 0.2s;
}

button:hover {
    background-color: #0056b3;
}
</style>