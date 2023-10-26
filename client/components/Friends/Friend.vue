<script setup lang="ts">
import { defineEmits, defineProps, ref } from 'vue';

const props = defineProps(["username","profilePic","firstname","lastname","chat"])

const displayedName = ref(props.firstname + ' ' + props.lastname[0] + '.');
const emit = defineEmits(['select'])

const isSelected = ref(false);  // Added this line

function handleSelect(){
    if(props.chat){
        isSelected.value = !isSelected.value;  // Toggle the selected state
    }
    emit('select', props.username);
}
</script>

<template>
    <div class="display" :class="{ selected: isSelected }" @click="handleSelect">
        <img :src="profilePic" :alt="displayedName" class="profilePic"/>
        <p class="name">{{ displayedName }}</p>
    </div>
</template>



<style scoped>
.display {
    display: flex;           
    align-items: center;     
    padding: 3%;
    margin-bottom: 2%;
    margin-right: 5%;
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

.selected {
    background-color: aliceblue;
    border: 1px solid #0056b3;
    border-radius: 5px;
}
</style>