<script setup lang="ts">
import Menu from "@/components/Menu/Menu.vue";
import Bar from "@/components/NavBar/Bar.vue";
import { useToastStore } from "@/stores/toast";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { computed, onBeforeMount } from "vue";
import { useRoute } from "vue-router";

const currentRoute = useRoute();
const currentRouteName = computed(() => currentRoute.name);
const userStore = useUserStore();
const { isLoggedIn } = storeToRefs(userStore);
const { toast } = storeToRefs(useToastStore());

// Make sure to update the session before mounting the app in case the user is already logged in
onBeforeMount(async () => {
  try {
    await userStore.updateSession();
  } catch {
    // User is not logged in
  }
});
</script>
<template>
  <div class="app-layout">
    <Bar class="nav">
      <li>
          <RouterLink :to="{ name: 'Home' }" :class="{ underline: currentRouteName == 'Home' }"> Home </RouterLink>
        </li>
        <li v-if="isLoggedIn">
          <RouterLink :to="{ name: 'Settings' }" :class="{ underline: currentRouteName == 'Settings' }"> Settings </RouterLink>
          <RouterLink :to="{ name: 'Authentication' }" :class="{ underline: currentRouteName == 'Authentication' }"> Authentication </RouterLink>
        </li>
        <li v-else>
          <RouterLink :to="{ name: 'Login' }" :class="{ underline: currentRouteName == 'Login' }"> Login </RouterLink>
        </li>

    </Bar>
    <Menu class = "menu"/>
    <div class="view-container">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
@import "./assets/toast.css";

.app-layout {
  display: flex; 
  height: 100vh;
}

.nav {
  padding: 1em 2em;
  background-color: lightgray;
  width: 5%; 
  height: 100%; 
  box-sizing: border-box; 
}

.menu {
  box-sizing: border-box;
  background-color: lightgray;
  margin-left: 1%;
  width: 20%;
  overflow-y: auto;
}

.view-container {
  margin-left: 1%;
  flex-grow: 1; 
  overflow-y: auto;
}

/* Other styles remain unchanged */
</style>
