<script setup lang = "ts">
import { defineEmits, ref } from 'vue';

const message = ref('');

const emit = defineEmits(['send']);

function sendMessage(){
    try {
        emit('send', message.value);
    } catch (error) {
        console.error('Error sending message:', error);
    }
}

</script>

<template>
    <input v-model="message" type = "text" @keyup.enter="sendMessage"/>
    <button @click = "sendMessage"><img class = "icon" src = "client\assets\images\send.png"/></button>
</template>

<style scoped>
button{
    width: 5%;
    border-radius: 100%;
}

.icon{
    width: 70%;
    padding-top: 35%;
    padding-bottom: 15%;
}
</style>