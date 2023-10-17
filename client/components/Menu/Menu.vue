<script setup lang="ts">
import router from "@/router";
import { useUserStore } from "@/stores/user";

const { logoutUser} = useUserStore();

async function logout() {
  await logoutUser();
  void router.push({ name: "Home" });
}
</script>
<template>
  <div>
    <h1>Setting</h1>
    <div class="links-column">
      <router-link to="/my-post" class="text-link">My post</router-link>
      <router-link to="/authentication" class="text-link">My Authentication</router-link>
      <router-link to="/setting" class="text-link">My Setting</router-link>
      <router-link to="/" @click="logout">Log out</router-link>
    </div>  
  </div>
</template>

<style scoped>
.links-column {
    display: flex;
    flex-direction: column;
    align-items: flex-start; /* aligns the links to the left */
    gap: 10px; /* optional: adds some space between the links */
}

.text-link {
    text-decoration: none; /* optional: removes the underline from the links */
    color: inherit; /* optional: ensures the links use the default text color */
}
</style>
