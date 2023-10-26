<script setup lang="ts">
import { defineEmits, defineProps, ref } from 'vue';

const { username, profilePic, firstname, lastname } = defineProps({
    username: String,
    profilePic: String,
    firstname: String,
    lastname: String,
});

const displayedName = ref(firstname + (lastname ? ' ' + lastname[0] + '.' : ''));
const emit = defineEmits(['accept','reject'])

function acceptRequest(){
    console.log('child: this is username: ',username)
    emit('accept', username)
}

function rejectRequest(){
    console.log('child: this is username: ',username)
    emit('reject', username)
}


</script>
<template>
    <div class="containers">
        <div class="display">
            <img :src="profilePic" :alt="displayedName" class="profilePic"/>
            <div class="name">{{ displayedName }}</div>
        </div>
        <div class = "buttons">
            <button class="accept-button" @click="acceptRequest">
            <img class="accept-img" src="client\assets\images\accept.png" alt="Clickable accept"/>
            </button>
            <button class="remove-button" @click="rejectRequest">
                <img class="remove-img" src="client\assets\images\remove.png" alt="Clickable remove"/>
            </button>
        </div>
       
    </div>
</template>


<style scoped>
.containers{
    display: flex; /* Changed from inline-flex to flex to ensure full width */
    padding: 5px;
    margin-bottom: 3%;
    height: 5%;
}

/* .buttons{
    margin-left: 35%;
} */

.accept-button{
    margin-top: 8%;
    margin-left: 35%;
    width: 30%;
    border: none;
    background-color: transparent;
}

.accept-img{
    width: 100%;
}

.remove-button{
    width: 30%;
    border: none;
    background-color: transparent;
}

.remove-img{
    width: 100%;
}

.profilePic-container {
    width: 20%; /* Set width relative to the container */
    aspect-ratio: 1; /* Ensures that width and height are equal */
}

.display {
    display: flex;           
    align-items: center;     
    padding: 1%;
    margin-bottom: 2%;
    cursor: pointer; 
}

.name {
    margin: 0;               
    margin-left: 5%;
    font-size: 1.5vw;
    white-space: nowrap;
    overflow: hidden;
    /* border: 1px red solid; */
}

/* Removed .profilePic-container as it's not being used in the template */

.profilePic {
    width: 8vh; /* Equals twice the desired radius */
    height: 8vh; /* Equals twice the desired radius */
    border-radius: 50%; /* Necessary for a circle shape */
    object-fit: cover; /* Ensures the image covers the frame without distortion */
    border: 1px grey solid;
}
</style>
