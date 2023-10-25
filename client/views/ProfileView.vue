<script setup lang="ts">
import Menu from "@/components/Menu/Menu.vue";
import { onMounted, ref } from 'vue';
import ImageUploader from "../components/Authentication/ImageUploader.vue";
import { useUserStore } from "../stores/user";
import { fetchy } from "../utils/fetchy";
import { getFullProfile } from "../utils/getServices";

const { currentUsername } = useUserStore();
const profile = ref({firstname:'',lastname:'',profilePic:''});

async function updateProfile(){
    const response = await getFullProfile(currentUsername);
    profile.value = response;
}

onMounted(async () => {
    await updateProfile();
    console.log(`This is the profile Pic: ${profile.value.profilePic}`)
});

async function updateProfilePicture(url:string){
    console.log(`this is url: ${url}`)
    try{
        const response = await fetchy(`api/profile/update`,"PATCH",{body:{
            update:{profilePic:url}
        }})
        await updateProfile();
        location.reload();
    }
    catch{
        console.log(`Failed to upload profile photo!`)
    }
}
</script>

<template>
  <div class="container">
    <Menu class="menu"/>
    <main class="column">
        <div class = "profile">
            <p>Name: {{ profile.firstname + ' ' + profile.lastname}}</p>
            <p>Profile Picture:</p>
            <img class = "upload" :src = "profile.profilePic"/>
        </div>
        <div>
        <h3>Update Profile Picture: </h3>
        <ImageUploader @update:imageSrc="(url:string)=>{updateProfilePicture(url)}"/>
        </div>
        
    </main>
  </div>  
</template>

<style>
.profile {
    display: flex;
    flex-direction: column;  /* Stack the children vertically */
    justify-content: center; /* Center children vertically */
    align-items: center;     /* Center children horizontally */
    height: 100%;            /* You might need to adjust this according to your design */
}


.upload{
    max-height: 300px;
}

.container {
  display: flex; 
  height: 100vh;
}

.menu {
  position: relative; /* Make sure the ::after is positioned relative to this container */
  box-sizing: border-box;
  padding-left: 1%;
  width: 25%;
  overflow-y: auto;
  height: 100%;
}

.menu::after {
  content: ''; /* Required for the pseudo-element */
  position: absolute; /* Absolute positioning relative to the menu */
  top: 0; /* Position at the top */
  right: 0; /* Position to the right, creating the vertical line */
  height: 100%; /* Full height of the parent */
  width: 1px; /* Width of the bar */
  background-color: slategray; /* Color of the bar */
}

.column {
  flex-grow: 1; 
  overflow-y: auto;
}
</style>
