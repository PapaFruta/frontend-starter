<script setup lang="ts">
import router from "@/router";
import { useUserStore } from "@/stores/user";
import { ref } from "vue";
import ImageUploader from "../Authentication/ImageUploader.vue";

const username = ref("");
const password = ref("");
const profilePic = ref("")
const firstname = ref("")
const lastname = ref("")

const { createUser, loginUser, updateSession } = useUserStore();

async function register() {
  await createUser(username.value, password.value,firstname.value,lastname.value,profilePic.value);
  await loginUser(username.value, password.value);
  void updateSession();
  void router.push({ name: "Home" });
}

function handleImageUpload(url:string){
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
      <hr/>
      <div class="pure-control-group">
          <label for="aligned-profile">Profile Picture:</label>
          <ImageUploader id = "aligned-profile" @update:imageSrc="handleImageUpload"></ImageUploader>
      </div>
      <div class="pure-controls">
        <button type="submit" class="pure-button pure-button-primary">Register</button>
      </div>
    </fieldset>
  </form>
</template>

<style scoped>
h3 {
  display: flex;
  justify-content: center;
}
</style>
