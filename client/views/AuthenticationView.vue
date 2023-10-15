<script setup lang="ts">
import router from "@/router";
import { useUserStore } from "@/stores/user";
import {useAuthStore} from "@/stores/auth"
import { storeToRefs } from "pinia";
import UpdateUserForm from "../components/Setting/UpdateUserForm.vue";
import AuthForm from "@/components/Authentication/AuthForm.vue";
import ImageUploader from "@/components/Authentication/ImageUploader.vue";

const { currentUsername } = storeToRefs(useUserStore());
const { logoutUser, deleteUser } = useUserStore();

</script>
<template>
    <AuthForm/>
    <ImageUploader/>
</template>