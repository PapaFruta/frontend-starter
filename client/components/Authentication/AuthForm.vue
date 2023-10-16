<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { fetchy } from "@/utils/fetchy";
import { onMounted, ref } from "vue";
import ImageUploader from "./ImageUploader.vue";

const { currentAuthStatus, getRecentStatus } = useAuthStore();

const id = ref("");
const status = ref();

onMounted(async () => {
    status.value = await getRecentStatus();
});


const newImageSrc = ref('');

const handleNewImageSrc = (url:string) => {
  id.value = url;
  submitAuthentication();
};

const submitAuthentication = async () => {
    const _id = id.value
    try {
        await fetchy("api/vertify/:ids", "PATCH", {
            body: { _id },
        });
    } catch (_) {
        return;
    }
    status.value = (await getRecentStatus());
};
</script>

<!-- /v-if="!status" -->
<template>
<div>
    <h1>Authentication</h1>
    <ImageUploader v-if="!status" @update:imageSrc="handleNewImageSrc"/>
    <h2>Authentication status: {{ status ? 'verified' : 'not verified' }}</h2>
</div>
  
</template>

<style scoped>
h2 {

}
</style>
