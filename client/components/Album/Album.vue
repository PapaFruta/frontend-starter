<script setup lang="ts">
import { defineProps, ref } from 'vue';
import { fetchy } from '../../utils/fetchy';
import MultiImageUploader from './MultiImageUploader.vue';

const props = defineProps({
    id:String,
    name: String,
    imgSources: Array,
    title: String,
})

const showUpload = ref(false);
const displayPhoto = ref([...props.imgSources])

async function addPhoto(photos){
    try{
        const response = await fetchy(`api/chat/album/${props.id}`,"PATCH",{body:{
            update:{photos:[...displayPhoto.value,...photos]}
        }})
        // console.log(``)
        displayPhoto.value = [...displayPhoto.value,...photos]
    }
    catch{
        console.log(`Failed to update album`)
    }
}

async function handleButtonClick(){
    showUpload.value = !showUpload.value
}
</script>

<template>
    <label>{{ name + "'s Album: " }}</label>
    <strong>{{ title }}</strong>
    <div class = "album">
        <div class="img-container">
            <div class="img-wrap" v-for="(image, index) in displayPhoto" :key="index">
                <img :src="image"/>
            </div>
        </div>
        <hr/>
        <div class = "change-container">
            <div class="uploader-container">
                <MultiImageUploader v-if="showUpload" :create="false" @update="(photos)=>{addPhoto(photos)}"/>
            </div>
            <div class="button-container">
                <button @click="handleButtonClick">Add Photo</button>
            </div>
        </div>

        
    </div>
    
</template>

<style scoped>
hr{
    color: greys;
    width: 100%;
}

.album{
    background-color: aliceblue;
    display: flex;
    flex-direction: column; /* stack children vertically */
    align-items: center; /* center children horizontally */
    padding: 2%;
}

.img-container {
    /* padding: 2%; */
    display: flex;
    flex-wrap: wrap; /* allows the items to wrap to the next line when the container is full */
    justify-content: space-between; /* provides equal spacing between the items */
}

.change-container {
    display: flex;
    flex-direction: column; /* stack children vertically */
    align-items: center;    /* center children horizontally */
    width: 100%;            /* ensure that the container takes up the full width of its parent */
}

.uploader-container, .button-container {
    display: flex;
    justify-content: center; /* center children horizontally */
    width: 100%;             /* ensure that the container takes up the full width of its parent */
}

.img-wrap {
    flex: 1 1 calc(33.33% - 4%); /* This will make it take up roughly 1/3 of the container width, minus the 2% padding on each side */
    margin: 1%; /* Margin for spacing */
}

img {
    max-width: 100%; 
    max-height: 300px;
    height: auto;
    display: block;
}

button {
    margin-top: 20px;
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
