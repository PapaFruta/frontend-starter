<script setup lang="ts">
import { computed, defineEmits, defineProps, ref } from 'vue';
import Friend from "./Friend.vue";
import LoginFormVue from '../Login/LoginForm.vue';

const props = defineProps(["displayFriend", "friendList", "chat"]);

const emit = defineEmits(['select']);

const selectedFriend = ref(""); // to store the currently selected friend's username

function selectFriend(username: String){
    console.log(`This is username intake: ${username}`)
    selectedFriend.value = username;  // update the selectedFriend when a friend is clicked
    console.log(`this selected friend: ${selectedFriend.value}`)
    emit('select', username);
}

const perPage = 7;
const currentPage = ref(1);

const displayedFriends = computed(()=>{
    console.log('this is display: ',props.friendList)
    const startIndex = (currentPage.value - 1) * perPage;
    return props.friendList?.slice(startIndex,startIndex+perPage)
})


function nextPage() {
  if ((currentPage.value * perPage) < props.friendList.length) {
    currentPage.value++;
  }
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}


</script>
<template>
    <div class="props.friendList" v-if = "displayFriend">
          <Friend
                v-for="friend in displayedFriends"
                @select="(username) => selectFriend(username)"
                :key="`${friend.username}-${selectedFriend.value === friend.username}`"
                :username="friend.username"
                :profilePic="friend.profilePic"
                :firstname="friend.firstname"
                :lastname="friend.lastname"
                :chat="chat"
                :isSelected="selectedFriend.value === friend.username"
            />
            <div class = "pagination" v-if = "displayFriend.length > perPage">
              <button class = "pageButton" @click="prevPage" :disabled="currentPage === 1">Previous</button>
              <button class = "pageButton" @click="nextPage" :disabled="currentPage * perPage >= friendList.length">Next</button>
            </div>
        </div>
</template>
<style scoped>
.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center; /* if you want to align vertically */
  margin: 0; /* adjust as needed */
}

.pageButton{
    background-color: #5B8FF3;
    width: 100%;
    color:white;
    border:none;
    font-size: 2vh;
    padding: 1vh ;
    border-radius: 5px;
    margin-right: 10%; /* Space on the right */
}
</style>