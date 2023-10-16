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
    <Bar class="nav"/>
    <Menu class = "menu"/>
    <div class="view-container">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
@import "./assets/toast.css";

.app-layout {
  display: flex; /* Establishes a flex container */
  height: 100vh; /* Ensures full viewport height */
}

.nav {
  padding: 1em 2em;
  background-color: lightgray;
  width: 5%; /* Set the width of the navigation bar to 10% of the view width */
  height: 100%; /* Full height of the parent container */
  box-sizing: border-box; /* Include padding and border in the element's total width and height */
}

.menu {
  box-sizing: border-box;
  background-color: lightgray;
  margin-left: 1%;
  width: 20%;
  overflow-y: auto; /* Adds scroll if content overflows */
}

.view-container {
  margin-left: 1%;
  flex-grow: 1; /* Takes up the remaining space, so it fills up the rest of the horizontal space */
  overflow-y: auto; /* Adds scroll if content overflows */
}

/* Other styles remain unchanged */
</style>
