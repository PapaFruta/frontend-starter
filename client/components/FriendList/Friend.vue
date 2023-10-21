<script setup lang="ts">
import { defineProps, ref } from 'vue';

const { profilePic, firstname, lastname } = defineProps({
    profilePic: String,
    firstname: String,
    lastname: String,
});

const displayedName = ref(firstname + ' ' + lastname[0] + '.');


</script>

<template>
    <div class="container">
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
