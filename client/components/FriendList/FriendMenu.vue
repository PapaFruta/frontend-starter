<script setup lang="ts">
import router from "@/router";
import { useUserStore } from "@/stores/user";
import { ref, onMounted, computed} from "vue";
import { fetchy } from "../../utils/fetchy";
import Friend from "./Friend.vue";
import AddFriend from "./addFriend.vue";
import Request from "./Request.vue";


const displayFriend = ref(true);  // Corrected the ref name
const displayRequest = ref(true);
const friendList = ref([]);
const requestList = ref([]);

// other refs and computed properties...

function updateDisplayFriend(){
    displayFriend.value = !displayFriend.value;
}

function updateDisplayRequest(){
    displayRequest.value = !displayRequest.value;
}

const testFriendList = Array.from({ length: 20 }, (_, i) => ({
  profilePic: "client/assets/images/Happy.png",
  firstname: `test${i + 1}`,
  lastname: `tester${i + 1}`
}));

const perPage = 7;
const currentPage = ref(1); // starts from 1

const displayedFriends = computed(() => {
  const startIndex = (currentPage.value - 1) * perPage;
  return testFriendList.slice(startIndex, startIndex + perPage);
});


function nextPage() {
  if ((currentPage.value * perPage) < testFriendList.length) {
    currentPage.value++;
  }
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}

async function updateRequest(){
    let requestResponse = await fetchy("api/friend/requests","GET")
    console.log('request Resposne: ', requestResponse)
    let to_ids = requestResponse.filter(item=>item.status == "pending").map(item => item.from)
    console.log('this is after filtering: ',requestResponse.filter(item=>item.status == "pending"))
    let unique_to_ids = new Set(to_ids);

    for(const username of unique_to_ids){
        try{
            let getResponse = await fetchy(`api/profile/${username}`,"GET")
            if(getResponse.profilePic || getResponse.firstname || getResponse.lastname){
                getResponse.username = username;
                requestList.value.push(getResponse) 
            }
        }catch{
            console.log('failed')
        }
    }
    console.log('this is to: ',requestList)
}

async function acceptRequest(username){
    console.log('this is username', username)
    try{
        const response = await fetchy(`api/friend/accept/${username}`, "PUT");
        console.log('this is friend request accepted',response)
    }catch{
        console.log('failed accept request')
    }
    
    updateRequest();
}

onMounted(async () => {
    friendList.value = await fetchy("api/friend","GET");

    updateRequest();
});


</script>

<template>
  <div >
    <h2>Friends 
        <button class = "displayButton" @click = "updateDisplayFriend">
            <img class = "displayFriend" v-if = "displayFriend" src = "client\assets\images\down-arrow.png"/>
            <img class = "displayFriend" v-if = "!displayFriend" src = "client\assets\images\left-arrow.png"/>
        </button></h2>
    <div class="links-column">
        <div class = "friendList" >
            <div class="friendList" v-if = "displayFriend">
            <Friend
              v-for="friend in displayedFriends"
              :key="friend.firstname"
              :profilePic="friend.profilePic"
              :firstname="friend.firstname"
              :lastname="friend.lastname"
            />
            <div class = "pagination">
            <button class = "pageButton" @click="prevPage" :disabled="currentPage === 1">Previous</button>
            <button class = "pageButton" @click="nextPage" :disabled="currentPage * perPage >= testFriendList.length">Next</button>
            </div>
        </div>
       <h2>Request 
        <button class = "displayButton" @click = "updateDisplayRequest">
            <img class = "displayRequest" v-if = "displayRequest" src = "client\assets\images\down-arrow.png"/>
            <img class = "displayRequest" v-if = "!displayRequest" src = "client\assets\images\left-arrow.png"/>
        </button></h2>
        <Request
              v-for="friend in requestList"
              @accept = "username => acceptRequest(username)"
              :key="friend.firstname"
              :username = "friend.username"
              :profilePic="friend.profilePic"
              :firstname="friend.firstname"
              :lastname="friend.lastname"
            />
        <AddFriend/>
        </div>  
</div>
  </div>
</template>

<style scoped>

.displayButton{
    width: 5vh;
    border: none;
    background-color: transparent;
}

.displayFriend{
    width: 50%;
}

.displayRequest{
    width: 50%;
}

.friendList {
    /* display: flex; */
    flex-wrap: wrap; /* allows the items to wrap to the next line */
    gap: 10px; /* optional: for spacing between the items */
}


.text-link {
    text-decoration: none;
    color: inherit;
}

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

.spacer {
    flex-grow: 1;
}
</style>