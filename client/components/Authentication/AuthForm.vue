<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";
import { fetchy } from "@/utils/fetchy";

const { currentAuthStatus, getRecentStatus } = useAuthStore();

const id = ref("");
const status = ref();

onMounted(async () => {
    status.value = await getRecentStatus();
});

const submitAuthentication = async () => {
    try {
        await fetchy("api/vertify/:ids", "PATCH", {
            body: { id },
        });
    } catch (_) {
        return;
    }
    status.value = await getRecentStatus();
};
</script>


<template>
  <h2>authentication status: </h2>
  <li>hi: {{status}}</li>
  <form @submit.prevent = "submitAuthentication()">
    <label for="content">Post Contents:</label>
    <textarea id="content" v-model="id" placeholder="submit your government id" required> </textarea>
    <button type="submit" class="pure-button-primary pure-button">Submit authentication</button>
  </form>
</template>

<style scoped>
.authentication {
    text-align: center;
    padding: 50px;
    border: 1px solid #e1e1e1;
    border-radius: 5px;
    width: 250px;
    margin: 100px auto;
}

img {
    width: 100px;
    height: 100px;
    margin-bottom: 20px;
}

button {
    margin: 5px;
}
</style>
