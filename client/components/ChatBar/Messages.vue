<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { fetchy } from "../../utils/fetchy";
import MessageBox from "./MessageBox.vue";
import { useUserStore } from "@/stores/user";
import {getProfile, getUser} from "../../utils/getServices.ts"

const props = defineProps({
  username: String,
  id: String,
  name: String
});

const messages= ref([]);

const {currentUsername} = useUserStore();

const usernameToID = new Map();


async function fetchMessages() {
  const prev = messages.value;
  messages.value = []; // Clearing the messages before fetching new ones

  try {
    console.log('this is current user: ',currentUsername)
    const response = await fetchy(`api/chat/${props.username}`, 'GET');
    console.log('this is resposne: ',response)
    console.log(`this is messages from response ${response.chat.message}`)
    if(!response.chat.message){
        messages.value = [];
        console.log('reset update')
    }
    else{
        messages.value = response.chat.message; // Assuming response is the array of messages
        console.log('else update')
    }
  } catch (error) {
    const response = await fetchy('api/chat',"POST",{body:{
        to:props.username
    }})
    console.log('this is failing fetch')
    messages.value = []
  }

  console.log(`this is message after ${messages.value}`)
}

async function sendMessage(message:string){
    // console.log('this is the sent message: ',message)
    // messages.value.push([props.username,message])
    const prev = messages.value;
    messages.value = []

    try{
        console.log(`trying to send message to ${props.username} with message ${message}`)
        const response = await fetchy(`api/chat`,"PATCH",
                    {body:{to:props.username,
                        message:message}})
        console.log('Send message: ',response)
    }catch{
        console.log('fail send response')
    }

    await fetchMessages();
}

// Run fetchMessages on mount
onMounted(async () => {
  fetchMessages();
  const user1Id = await getUser(currentUsername)
  const user1 = await getProfile(currentUsername)
  usernameToID.set(user1Id,user1)

 
//   for (let [key, value] of usernameToID) {
//   console.log(`this is key value set of username to ID: ${key}: ${value}`);
// }
//   console.log(`this is id to firstname: ${usernameToID}`)
//   usernameToID.set(currentUsername,user1)
//   usernameToID.set(props.username,await getProfile(props.username))
});

// Watch for changes in username and refetch messages when it changes
// Watch for changes in username and refetch messages when it changes
watch(
  () => [props.username, props.id, props.name],
  async ([newUsername, newId, newName], [oldUsername, oldId, oldName]) => {
    if (newUsername !== oldUsername) {
      fetchMessages(); // If username changes, fetch new messages
    }
    if (newId !== oldId || newName !== oldName) {
      usernameToID.set(newId, newName); // If id or name changes, update the map
    }
  }
);
</script>

<template>
    <h2>This is chat with {{ username }}</h2>
  <div v-for="([user,message], index) in messages" :key="index">
    {{usernameToID.get(user) +' : '+ message }}
    </div>
  <MessageBox @send="message => sendMessage(message)"/>
</template>
