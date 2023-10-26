<script setup lang="ts">
import { onMounted, ref, watch, nextTick,onBeforeUnmount } from "vue";
import { fetchy } from "../../utils/fetchy";
import MessageBox from "./MessageBox.vue";
import { useUserStore } from "@/stores/user";
import {getProfile, getUser} from "../../utils/getServices.ts"
import Album from "../Album/Album.vue"

const props = defineProps({
  username: String,
  id: String,
  name: String
});

const messages= ref([]);
const albums = ref([]);

const combinedList = ref([]);

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
    console.log(`This is chat response: `,response)


    if(!response.chat.messages){
        messages.value = [];
    }
    else{
        messages.value = response.chat.messages; // Assuming response is the array of messages
    }
  } catch (error) {
    const response = await fetchy('api/chat',"POST",{body:{
        to:props.username
    }})
    console.log('this is failing fetch')
    messages.value = []
  }

  console.log(`This is the chat: `,messages.value)
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
    await updateCombinedList();
}

async function createdAlbum(){
  await fetchAlbum();
  await updateCombinedList();
}

async function updateCombinedList() {
    combinedList.value = [...messages.value, ...albums.value]
        .map(item => {
            if (item.photos) {  // Check if it has a 'message' property to distinguish
                return { ...item, type: 'album' };
            } else {
                return { ...item, type: 'message' };
            }
        })
        .sort((a, b) => new Date(a.dateUpdated).getTime() - new Date(b.dateUpdated).getTime());

    console.log(`this is combined List: `,combinedList.value)
    await nextTick();
    scrollToBottom();
}

// Run fetchMessages on mount
onMounted(async () => {
  // fetchMessages();
  const user1Id = await getUser(currentUsername)
  const user1 = await getProfile(currentUsername)
  usernameToID.set(user1Id,user1)
  // fetchAlbum();
  updateInterval = setInterval(async () => {
        await fetchMessages();
        await fetchAlbum();
        await updateCombinedList();
    }, 1000);
});

onBeforeUnmount(() => {
    // Clear the update interval when component is unmounted
    clearInterval(updateInterval);
}); 
watch(
  () => [props.username, props.id, props.name],
  async ([newUsername, newId, newName], [oldUsername, oldId, oldName]) => {
    if (newUsername !== oldUsername) {
      await fetchMessages(); // If username changes, fetch new messages
      await fetchAlbum();
      await updateCombinedList();
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
    <h2>{{ username }}</h2>
    <hr>

    <div class="messages" ref="messagesDiv">
      <div v-for="(item, index) in combinedList" :key="index">
          <p v-if="item.type === 'message'">{{ usernameToID.get(item.user) + ' : ' + item.message }}</p>
          <Album v-else-if="item.type === 'album'" :imgSources = "item.photos" :name="usernameToID.get(item.from)" :title="item.title" :id="item._id"/>
      </div>
    </div>
    <hr>
    <MessageBox :username="props.username" v-if="props.name" @send="message => sendMessage(message)" @created="createdAlbum"/>
  </div>
</template>

<style scoped>


.chat-container {
  display: flex;
  flex-direction: column;  /* Stack children vertically */
  height: 100%;  /* Take full available height */
}

.messages {
  flex: 1;  /* Allow it to grow and take available space */
  overflow-y: auto;  /* Add vertical scroll if content overflows */
  max-height: 90%;  /* Set the maximum height */
  margin-left: 10%;
  padding-right:10%
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
