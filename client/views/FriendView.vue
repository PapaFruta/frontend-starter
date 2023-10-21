<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import FriendMenu from "../components/FriendList/FriendMenu.vue"

const { currentUsername } = storeToRefs(useUserStore());
const { logoutUser, deleteUser } = useUserStore();

</script>
<template>
    <div class = "container">
    <FriendMenu class = "menu"/>
    </div>
    
</template>
<style scoped>
.authForm{
    margin-left: 1%;
}
</style>