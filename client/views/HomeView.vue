<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());
</script>

<template>
  <main class="background-blue">
    <img src="../assets/images/logo.png" />
    <router-link :to="isLoggedIn ? '/friend' : '/login'" class="center-button">
      <button class="centered-button">{{!isLoggedIn ? "Getting Started" : "Take Me to Friend"}}</button>
    </router-link>
  </main>
</template>


<style scoped>
main.background-blue{
  background-color: #8DACC4;
  height: 100vh;
}

h1 {
  text-align: center;
}

.centered-button {
  position: absolute;     /* Position the button over the container */
  top: 60%;               /* Center the button vertically */
  left: 50%;              /* Set the left side of the button to the center of its container */
  transform: translate(-50%, 0);  /* Move the button left by half its own width */
  font-size: 4vh;
  padding: 1% 10%;
}


img {
  height: 25vh;
  width: 70%;
  margin-left: 15%;
  margin-top: 20%;
  /* display: none;            Hide the img since we're using a background image */
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
