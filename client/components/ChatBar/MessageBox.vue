<script setup lang = "ts">
import { defineEmits, defineProps, ref } from 'vue';
import MultiImageUploader from '../Album/MultiImageUploader.vue';

const message = ref('');
const upload = ref(false)

const emit = defineEmits(['send','created']);
const props = defineProps({
    username:String
})

function sendMessage(){
    try {
        emit('send', message.value);
        message.value = ''
    } catch (error) {
        console.error('Error sending message:', error);
    }
}

async function startAlbum(){
    upload.value = !upload.value
}

function createdAlbum(){
    emit('created')
}


</script>
<template>
    <div class="uploader-container" v-if="upload">
        <MultiImageUploader @created = "createdAlbum" class="uploader" :username="props.username"/> 
    </div>

    <div class="chatBox">
        <input v-model="message" type="text" @keyup.enter="sendMessage"/>
        <button @click="sendMessage"><img class="icon" src="client\assets\images\send.png"/></button>
        <button @click="startAlbum"><img class="icon" src="client\assets\images\image-gallery.png"/></button>
    </div>
</template>

<style scoped>
.uploader-container {
    display: flex;  /* Enable flexbox */
    align-items:center;
    justify-content: center;  /*Center the content horizontally */
    height: 300px;  /* Set a height for the container. Adjust this value as needed. */
    padding-bottom: 3%;
}

.chatBox {
    margin-left: 10%;
    display: flex;  /* To align the input and button side by side */
    align-items: center;  /* Vertically align items */
    padding-bottom: 2%;
}

input, input:focus, input:active {
    width: 80%;
    height: 40px;  /* Example height, you can adjust as needed */
    border-radius: 5px;  /* Optional, to give rounded corners */
    border: 2px solid grey;
    background-color: aliceblue;
    outline: none;  /* Prevent default browser focus outline */
}

button {
    width: 5%;
    height: 40px;  /* Match the height of the input box */
    border-radius: 100%;
    padding: 5px;  /* Remove default padding */
    margin-left: 10px;  /* Optional, to give some space between the input and the button */
    border: 2px solid grey;
    background-color: aliceblue;
}

button:hover {
    background-color: #0056b3;
}

.icon {
    width: 70%;
    display: block;  /* To remove extra space below the image */
    margin: auto;  /* To center the image within the button */
}
</style>
