<script setup lang = "ts">
import { ref } from "vue";
import ActivityButton from '../components/Post/ActivityButton.vue';
import HangoutForm from "../components/Post/HangoutForm.vue";
import PostAndHangout from "../components/Post/PostAndHangout.vue";
import Postform from '../components/Post/PostForm.vue';

const postForm = ref(false)
const hangoutForm = ref(false)

function createPost(){
    postForm.value = !postForm.value;
}

function proposeHangout(){
    hangoutForm.value = !hangoutForm.value;
}
</script>

<template>
    <h2>Posts</h2>
    <div class = "main-section">
        <ActivityButton
        @create = "createPost"
        @propose = "proposeHangout"/>
        <Postform v-if="postForm"/>
        <HangoutForm v-if = "hangoutForm"/>
        <hr>
        <PostAndHangout/>
    </div>
    
</template>

<style scoped>
.main-section {
    display: flex;
    flex-direction: column; 
    justify-content: center;
    align-items: center;
}

hr{
    width: 90%;
}
</style>