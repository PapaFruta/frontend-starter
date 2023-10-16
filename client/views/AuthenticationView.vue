<script setup lang="ts">
import AuthForm from "@/components/Authentication/AuthForm.vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

const { currentUsername } = storeToRefs(useUserStore());
const { logoutUser, deleteUser } = useUserStore();

</script>
<template>
    <AuthForm/>
</template>