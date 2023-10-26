<script setup lang = "ts">
import { defineEmits } from 'vue';

const emit = defineEmits(['create','propose'])

function createPost(){
    emit('create')
}

function proposalHangout(){
    emit('propose')
}
</script>
<template>
    <div class="buttons-container">
        <button @click="createPost">Create Post</button>
        <button @click="proposalHangout">Proposal Hangout</button>
    </div>
</template>

<style scoped>
.buttons-container {
    display: flex;
    flex-direction: row; /* ensures buttons are in a line, horizontally */
    justify-content: center; /* centers the buttons horizontally */
    gap: 20px;
    padding-bottom: 1%;
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
