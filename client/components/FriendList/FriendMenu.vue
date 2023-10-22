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
const removelist = ref([]);

const removeFriend = ref(false);

// other refs and computed properties...

function updateDisplayFriend(){
    displayFriend.value = !displayFriend.value;
}

function updateDisplayRequest(){
    displayRequest.value = !displayRequest.value;
}

const testFriendList = friendList.value

const perPage = 7;
const currentPage = ref(1); // starts from 1

const displayedFriends = computed(() => {
  if (!friendList.value.length) return []; // return empty array if friendList is empty
  const startIndex = (currentPage.value - 1) * perPage;
  return friendList.value.slice(startIndex, startIndex + perPage); // use friendList.value directly
});

function nextPage() {
  if ((currentPage.value * perPage) < friendList.value.length) {
    currentPage.value++;
  }
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}

async function updateRequest(){
    const prev = requestList.value
    requestList.value = []

    try{
        let requestResponse = await fetchy("api/friend/requests","GET")
        let to_ids = requestResponse.filter(item=>item.status == "pending").map(item => item.from)
        let unique_to_ids = new Set(to_ids);

        for(const username of unique_to_ids){
                let getResponse = await fetchy(`api/profile/${username}`,"GET")
                console.log('this is username for requestion:', username, getResponse)
                if(getResponse.profilePic || getResponse.firstname || getResponse.lastname){
                    getResponse.username = username;
                    requestList.value.push(getResponse) 
            }
    }
    }catch{
            console.log('failed fetching request')
            requestList.value = prev
        }
    
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

async function rejectRequest(username){
    console.log('this is rejecting username', username)
    try{
        const response = await fetchy(`api/friend/reject/${username}`, "PUT");
        console.log('this is friend request rejected',response)
    }catch{
        console.log('failed rejected request')
    }
    updateRequest();
}

async function updateFriend(){
    let requestFriend = await fetchy("api/friend","GET")
    console.log('request Resposne: ', requestFriend)
    const prev = friendList.value;

    friendList.value = [];
    for(const id of requestFriend){
        try{
            let getResponse = await fetchy(`api/profile/friend/${id}`,"GET")
            console.log(`this is the response for ${id}: `,getResponse)
            if(getResponse.profilePic || getResponse.firstname || getResponse.lastname){
                const usernameResponse = await fetchy(`api/users/id/${id}`)
                console.log('this is username resposne: ',usernameResponse)
                getResponse.username = usernameResponse.username;
                friendList.value.push(getResponse) 
            }
        }catch{
            friendList.value = prev
            console.log('failed fetch friend')
        }
    }
    console.log('this is to: ',friendList)
}

async function toggleRemove(){
    if (removeFriend.value && removelist.value){
        console.log(`trying to remove`);
        const removed = []
        for(const username of removelist.value){
            try{
                let getResponse = await fetchy(`api/friend/remove/${username}`,"DELETE")
                removed.push(username)
            }
            catch{
                console.log(`failed to remove ${username}`)
            }
        }
        alert(`Successfully removed ${removed}`)
        removeFriend.value = false
    }
    else{
        removeFriend.value = true
        removelist.value = []
    }
}

function cancelRemove(){
    removeFriend.value = false;
    removelist.value = [];
}

onMounted(async () => {
    updateFriend();
    updateRequest();
});

function selectFriend(username:string){
    removelist.value.push(username)
}

</script>

<template>
  <div >
    <h2>Friends 
        <button class = "displayButton" @click = "updateDisplayFriend">
            <img class = "displayFriend" v-if = "displayFriend" src = "client\assets\images\down-arrow.png"/>
            <img class = "displayFriend" v-if = "!displayFriend" src = "client\assets\images\left-arrow.png"/>
        </button>
        <button class = "remove-button" @click="toggleRemove"> Remove </button>
        <button v-if = "removeFriend" class = "cancel-button" @click="cancelRemove"> Cancel </button>

    </h2>
    <div class="links-column">
        <div class = "friendList" >
            <div class="friendList" v-if = "displayFriend">
            <Friend
              v-for="friend in displayedFriends"
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
       <h2>Request 
        <button class = "displayButton" @click = "updateDisplayRequest">
            <img class = "displayRequest" v-if = "displayRequest" src = "client\assets\images\down-arrow.png"/>
            <img class = "displayRequest" v-if = "!displayRequest" src = "client\assets\images\left-arrow.png"/>
        </button></h2>
        <Request
              v-for="friend in requestList"
              @accept = "username => acceptRequest(username)"
              @reject = "username => rejectRequest(username)"
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