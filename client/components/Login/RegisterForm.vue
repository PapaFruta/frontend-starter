<script setup lang="ts">
import router from "@/router";
import { useUserStore } from "@/stores/user";
import { ref } from "vue";

const username = ref("");
const password = ref("");
const profilePic = ref("")
const firstname = ref("")
const lastname = ref("")

const { createUser, loginUser, updateSession } = useUserStore();

async function register() {
  console.log(`This is url to proifle when creating: ${profilePic.value}`)
  await createUser(username.value, password.value,firstname.value,lastname.value,profilePic.value);
  await loginUser(username.value, password.value);
  void updateSession();
  void router.push({ name: "Home" });
}

function handleImageUpload(url:string){
  console.log(`This is the link to proifle picture: ${url}`)
  profilePic.value = url;
}

</script>

<template>
  <form class="pure-form pure-form-aligned" @submit.prevent="register">
    <h3>Register User</h3>
    <fieldset>
      <div class="pure-control-group">
        <label for="aligned-name">Username</label>
        <input v-model.trim="username" type="text" id="aligned-name" placeholder="Username" required />
      </div>
      <div class="pure-control-group">
        <label for="aligned-password">Password</label>
        <input type="password" v-model.trim="password" id="aligned-password" placeholder="Password" required />
      </div>
      <div class="pure-control-group">
        <label for="aligned-firstname">First Name</label>
        <input v-model.trim="firstname" id="aligned-firstname" placeholder="First name" required />
      </div>
      <div class="pure-control-group">
        <label for="aligned-lastname">last Name</label>
        <input v-model.trim="lastname" id="aligned-lastname" placeholder="last name" required />
      </div>
      <!-- <hr/>
      <div class="pure-control-group">
          <label for="aligned-profile">Profile Picture:</label>
          <ImageUploader @update:imageSrc="(url:string)=>{handleImageUpload(url)}"/>
      </div>
      <hr/> -->
      <div class="pure-controls">
        <button @click="register" type="button" class="pure-button pure-button-primary">Register</button>
      </div>
    </fieldset>
  </form>
</template>

<style scoped>
form{
  background-color: #E2E2E8;
  padding: 2%;
  border-radius: 20px;
}

h3 {
  display: flex;
  justify-content: center;
}

hr{
  margin-top:2%;
}

button{
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
