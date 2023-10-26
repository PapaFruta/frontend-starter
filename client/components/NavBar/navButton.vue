<script setup lang="ts">
import { defineProps, ref } from 'vue';

// defineProps with an array is used for props without type validation. 
// It's okay for quick prototypes but in a production environment, 
// it's better to use object syntax for type checking.
const props = defineProps({
  imgSrc: String,
  title: String,
  route_link: {
    type: String,
    default: '/'  // default path
  }
});

const isSelected = ref(false);

const toggleSelect = () => {
  isSelected.value = !isSelected.value;
};

</script>

<template>
  <div class="image-link-component" :class="{ 'is-selected': isSelected }"  @click="toggleSelect">
    <router-link :to="route_link" class="text-link">
      <img :src="imgSrc" :alt="title" class="image-class" />
        <div class = "title">{{ title }}</div>
    </router-link>
  </div>
</template>

<style>
/* Your styles here */
.image-link-component {
    margin-top: 10%;
    padding-top: 10%;
    display: flex; 
    flex-direction: column; 
    justify-content: center; 
    align-items: center;
    text-align: center; 
}

.image-link-component:hover {
    background-color: #D9D9D9; /* color when hovered */
}

.image-link-component:is-selected {
    background-color: #5B8FF3; /* color when clicked */
}

.image-class {
    object-fit: cover;
    height: auto;
    width: 60%;
}

.text-link {
  text-decoration: none; /* removes the underline */
  color: inherit; /* makes the link text color the same as the parent's text color */
}

.title{
    font-size: 1.25vw;
}

</style>
