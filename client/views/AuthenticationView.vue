<script setup lang="ts">
import AuthForm from "@/components/Authentication/AuthForm.vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import Menu from "../components/Menu/Menu.vue";

const { currentUsername } = storeToRefs(useUserStore());
const { logoutUser, deleteUser } = useUserStore();

</script>
<template>
    <div class = "container">
    <Menu class = "menu"/>
    <AuthForm class = "authForm"/>
    </div>
    
</template>
<style scoped>
.authForm{
    margin-left: 1%;
}
</style>