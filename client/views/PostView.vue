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

const postAndHangoutRef = ref(0);

function handlePostChange(){
    postAndHangoutRef.value = postAndHangoutRef.value+1
}

</script>

<template>
    <div class = "background-blue">
        <h2>Posts</h2>
        <div class = "main-section">
            <ActivityButton
            @create = "createPost"
            @propose = "proposeHangout"/>
            <Postform v-if="postForm" @created="handlePostChange"/>
            <HangoutForm v-if = "hangoutForm" @created="handlePostChange"/>
            <hr>
            <PostAndHangout :update = "postAndHangoutRef"/>
        </div>
    </div>
    
    
</template>

<style scoped>
body {
  margin: 0;
}

.background-blue{
  background-color: #F9F9F0;
  /* height: 100vh; */
}

h2{
    margin: 0;
    padding-left: 5%;
    padding-top: 2%;
    color: #151C30;
}
.main-section {
    padding-top: 3%;
    display: flex;
    flex-direction: column; 
    justify-content: center;
    align-items: center;
}

hr{
    width: 90%;
}
</style>