<script setup lang="ts">
import Menu from "@/components/Menu/Menu.vue";
import router from "@/router";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import UpdateUserForm from "../components/Setting/UpdateUserForm.vue";

const { currentUsername } = storeToRefs(useUserStore());
const { logoutUser, deleteUser } = useUserStore();

async function logout() {
  await logoutUser();
  void router.push({ name: "Home" });
}

async function delete_() {
  await deleteUser();
  void router.push({ name: "Home" });
}
</script>

<template>
  <div class="container">
    <Menu class="menu"/>
    <main class="column">
      <h1>Settings for {{ currentUsername }}</h1>
      <button class="pure-button pure-button-primary" @click="logout">Logout</button>
      <button class="button-error pure-button" @click="delete_">Delete User</button>
      <UpdateUserForm />
    </main>
  </div>  
</template>

<style>
.container {
  display: flex; 
  height: 100vh;
}

.menu {
  position: relative; /* Make sure the ::after is positioned relative to this container */
  box-sizing: border-box;
  padding-left: 1%;
  width: 20%;
  overflow-y: auto;
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
