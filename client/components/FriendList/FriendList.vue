<script setup lang="ts">
import { computed, defineEmits, defineProps, ref } from 'vue';
import Friend from "./Friend.vue";

const { displayFriend, friendList} = defineProps({
    displayFriend: Boolean,
    friendList: Array<Object>,
});

const emit = defineEmits(['select']);

function selectFriend(username:String){
    emit('select',username)
}

const perPage = 7;
const currentPage = ref(1);

const displayedFriends = computed(() => {
  if (!friendList.length) return []; // return empty array if friendList is empty
  const startIndex = (currentPage.value - 1) * perPage;
  return friendList.slice(startIndex, startIndex + perPage); // use friendList directly
});

function nextPage() {
  if ((currentPage.value * perPage) < friendList.length) {
    currentPage.value++;
  }
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}

console.log('this is what is passed in: ',friendList)

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