<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';

const { displayFriend, friendList} = defineProps({
    displayFriend: Boolean,
    friendList: Array<{firstname,username,profilePic,lastname}>,
});

const emit = defineEmits(['select']);

function selectFriend(username:String){
    emit('select',username)
}
</script>
<template>
    <div class="friendList" v-if = "displayFriend">
            <Friend
              v-for="friend in friendList"
              @select = "(username) => selectFriend(username)"
              :key="friend.firstname"
              :username = "friend.username"
              :profilePic="friend.profilePic"
              :firstname="friend.firstname"
              :lastname="friend.lastname"
            />
            <div class = "pagination">
            <button class = "pageButton" @click="prevPage" :disabled="currentPage === 1">Previous</button>
            <button class = "pageButton" @click="nextPage" :disabled="currentPage * perPage >= testFriendList.length">Next</button>
            </div>
        </div>
</template>