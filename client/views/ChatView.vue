<template>
    <div class="chat-container">
        <div class="menu">
            <h2>Chats</h2>
            <ChatBar @select = "(username:string)=>updateChat(username)"/>
        </div>
        <div class="messages">
            <Messages
            :username = "currentChat"
            :id = "currentId"
            :name = "currentName" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ChatBar from "../components/ChatBar/ChatBar.vue";
import Messages from "../components/ChatBar/Messages.vue";
import { getProfile, getUser } from "../utils/getServices.ts";


const currentChat = ref('');
const currentId = ref('');
const currentName = ref('')

async function updateChat(username:string){
    currentChat.value = username
    currentId.value = await getUser(username)
    currentName.value = await getProfile(username);
}

</script>

<style scoped>
.chat-container {
  display: flex; /* Establishes a flex container */
  height: 100vh; /* Makes the container take up the full height of the viewport */
}

.messages {
  flex-grow: 1; /* Allows this element to take up the remaining space */
  max-width: 70%;
}
</style>
