<script setup lang="ts">
import { onMounted, ref, watch, nextTick } from "vue";
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
const albums = ref([]);

const {currentUsername} = useUserStore();

const usernameToID = new Map();

const messagesDiv = ref(null);

function scrollToBottom() {
  if (messagesDiv.value) {
    messagesDiv.value.scrollTop = messagesDiv.value.scrollHeight;
  }
}

async function fetchMessages() {
  const prev = messages.value;
  messages.value = []; // Clearing the messages before fetching new ones

  try {
    const response = await fetchy(`api/chat/${props.username}`, 'GET');
    if(!response.chat.message){
        messages.value = [];
    }
    else{
        messages.value = response.chat.message; // Assuming response is the array of messages
    }
  } catch (error) {
    const response = await fetchy('api/chat',"POST",{body:{
        to:props.username
    }})
    console.log('this is failing fetch')
    messages.value = []
  }

  await nextTick();
  scrollToBottom();

}

async function fetchAlbum(){
  const prev = albums.value;
  albums.value = []

  try{
    console.log(`Trying to get album frmo ${props.username}`)
    const response = await fetchy(`api/chat/album/${props.username}`,"GET")

    for(const r of response){
      albums.value.push(r)
    }

    console.log(`this is albums: `,albums)
  }
  catch{
    albums.value = prev;
    console.log(`Failed to fetch album`)
  }

}

async function sendMessage(message:string){
    const prev = messages.value;
    messages.value = []

    try{
        const response = await fetchy(`api/chat`,"PATCH",
                    {body:{to:props.username,
                        message:message}})
    }catch{
        console.log('fail send response')
    }

    await fetchMessages();
}

// Run fetchMessages on mount
onMounted(async () => {
  // fetchMessages();
  const user1Id = await getUser(currentUsername)
  const user1 = await getProfile(currentUsername)
  usernameToID.set(user1Id,user1)
  // fetchAlbum();

});

watch(
  () => [props.username, props.id, props.name],
  async ([newUsername, newId, newName], [oldUsername, oldId, oldName]) => {
    if (newUsername !== oldUsername) {
      fetchMessages(); // If username changes, fetch new messages
      fetchAlbum();
    }
    if (newId !== oldId || newName !== oldName) {
      usernameToID.set(newId, newName); // If id or name changes, update the map
    }
  },
);

watch(messages, ()=>{
  nextTick(scrollToBottom)
})
</script>

<template>
  <div class="chat-container">
    <!-- Name always at the top -->
    <h2>{{ username }}</h2>
    <hr>

    <!-- Message list -->
    <div class="messages" ref="messagesDiv">
      <div v-for="([user,message], index) in messages" :key="index">
        <p>{{ usernameToID.get(user) + ' : ' + message }}</p>
      </div>
    </div>
    <hr>
    <MessageBox :username = "props.username" v-if = "props.name" @send="message => sendMessage(message)" />
  </div>
</template>

<style scoped>
p{
  margin-left: 10%;
  padding-right:10%
}

.chat-container {
  display: flex;
  flex-direction: column;  /* Stack children vertically */
  height: 100%;  /* Take full available height */
}

.messages {
  flex: 1;  /* Allow it to grow and take available space */
  overflow-y: auto;  /* Add vertical scroll if content overflows */
  max-height: 90%;  /* Set the maximum height */
}

/* If you want to add space between name, message list, and MessageBox, you can use margin. For example: */
h2 {
  margin-bottom: 1rem;
  margin-left: 5%;
}

MessageBox {
  margin-top: 1rem;
}

hr {
  border: solid 1px lightgrey;
  width: 95%
}

</style>
