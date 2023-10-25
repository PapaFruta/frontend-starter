<template>
    <img :src="props.photo" alt="photo" />
    <p><strong>{{ props.name }}: </strong>{{ props.caption }}</p>
    <hr>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
    name: String,
    caption: String,
    photo: String,
})

</script>
<style scoped>
img {
  width: 100%;
  max-width: 450px;
  height: auto;
  border-radius: 4px;
  margin-bottom: 10px;
  background-color: aliceblue;
  padding: 2%;
}

p {
  font-size: 16px;
  color: #333;
  margin-top: 8px;
}

</style>