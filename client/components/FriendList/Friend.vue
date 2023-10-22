<script setup lang="ts">
import { defineEmits, defineProps, ref } from 'vue';

const { username, profilePic, firstname, lastname } = defineProps({
    username: String,
    profilePic: String,
    firstname: String,
    lastname: String,
});

const displayedName = ref(firstname + ' ' + lastname[0] + '.');
const emit = defineEmits(['select'])

function handleSelect(){
    emit('select', username)
}
</script>

<template>
    <div class="container" @click = "handleSelect">
        <img :src="profilePic" :alt="displayedName" class="profilePic"/>
        <div class="name">{{ displayedName }}</div>
    </div>
</template>
s

<style scoped>
.container{
    display: inline-flex; /* Changed from block to inline-flex */
    /* border: 1px red solid; */
    padding: 5px;
    margin-bottom: 3%;
    height: 5%;
}

.profilePic-container {
    width: 20%; /* Set width relative to the container */
    aspect-ratio: 1; /* Ensures that width and height are equal */
}

.profilePic{
    width: 100%; /* Make the image fill the container */
    height: 100%; /* Make the image fill the container */
    width: 20%; 
    border: 1px grey solid;
    border-radius: 50%;
}

.name {
    display: flex;
    margin-left: 5%;
    font-size: 2vw; /* adjust as needed */
    white-space: nowrap; /* prevents the text from breaking into multiple lines */
    overflow: hidden; /* prevents text from spilling out of the container */
    /* border: 1px grey solid; */
}
</style>
