<script setup lang="ts">
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
    <Bar class="nav"/>
    <!-- <Menu class = "menu"/> -->
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
  position: relative; /* this ensures the pseudo-element is positioned relative to this container */
  width: 10vh; 
  height: 100%; 
  box-sizing: border-box; 
}

.nav::after {
  content: ''; /* pseudo-elements require the content property, but it can be empty */
  position: absolute; 
  top: 50%; /* move the top edge of the pseudo-element to the center of the container */
  right: 0; /* aligned to the right of the .nav container */
  width: 1px; /* width of the bar, you can adjust as necessary */
  height: 100%; /* height of the bar */
  background-color: slategrey; /* or any color you prefer */
  transform: translateY(-50%); /* shift the pseudo-element up by half of its height */
}

.view-container {
  margin-left: 1%;
  flex-grow: 1; 
  overflow-y: auto;
}

/* Other styles remain unchanged */
</style>
