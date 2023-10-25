<script setup lang="ts">
import { Ref, computed, onMounted, ref } from "vue";
import { fetchy } from "../../utils/fetchy";
import FriendList from "./FriendList.vue";
import Request from "./Request.vue";
import AddFriend from "./addFriend.vue";

const displayFriend = ref(true);
const displayRequest = ref(true);
const friendList: Ref<Object[]> = ref([]);
const requestList: Ref<Object[]> = ref([]);
const removelist: Ref<string[]> = ref([]);

const removeFriend = ref(false);

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
        let to_ids = requestResponse.filter((item:Object)=>item.status == "pending").map((item:Object) => item.from)
        let unique_to_ids = new Set(to_ids);

        for(const username of unique_to_ids){
                let getResponse = await fetchy(`api/profile/${username}`,"GET")
                if(getResponse.profilePic || getResponse.firstname || getResponse.lastname){
                    getResponse.username = username;
                    requestList.value.push(getResponse) 
            }
    }
    }catch{
            requestList.value = prev
        }
    
}

async function acceptRequest(username:string){
    console.log('this is username', username)
    try{
        const response = await fetchy(`api/friend/accept/${username}`, "PUT");
    }catch{
        console.log('failed accept request')
    }
    updateRequest();
}

async function rejectRequest(username:string){
    console.log('this is rejecting username', username)
    try{
        const response = await fetchy(`api/friend/reject/${username}`, "PUT");
    }catch{
        console.log('failed rejected request')
    }
    updateRequest();
}

async function updateFriend(){
    let requestFriend = await fetchy("api/friend","GET")
    const prev = friendList.value;

    friendList.value = [];
    for(const id of requestFriend){
        try{
            let getResponse = await fetchy(`api/profile/friend/${id}`,"GET")
            if(getResponse.profilePic || getResponse.firstname || getResponse.lastname){
                const usernameResponse = await fetchy(`api/users/id/${id}`,"GET")
                getResponse.username = usernameResponse.username;
                friendList.value.push(getResponse) 
            }
        }catch{
            friendList.value = prev
            console.log('failed fetch friend')
        }
    }
}

async function toggleRemove(){
    if (removeFriend.value && removelist.value){
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
        updateFriend()
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
    <div class = "links-row">
        <h2>Friends 
        <button class = "displayButton" @click = "updateDisplayFriend">
            <img class = "displayFriend" v-if = "displayFriend" src = "client\assets\images\down-arrow.png"/>
            <img class = "displayFriend" v-if = "!displayFriend" src = "client\assets\images\left-arrow.png"/>
        </button>
        <button class = "remove-button" @click="toggleRemove"> Remove </button>
        <button v-if = "removeFriend" class = "cancel-button" @click="cancelRemove"> Cancel </button>

    </h2>
    </div>
    
    <div class = "container">
        <div class="links-column">
        <div class = "friendList" >
            <FriendList
                :displayFriend="displayFriend"
                :friendList="friendList"
                :chat="false"
                @select = "(username)=>{selectFriend(username)}"/>
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
        </div>  
    </div>
    <AddFriend/>
</div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column; /* stack children vertically */
  height: 85%; /* full height of the viewport */
  justify-content: space-between; /* distributes items evenly, with first item at start and last item at end */
}

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

.remove-button {
    padding: 5px 10px;
    border: none;
    border-radius: 4px;
    margin-left: 18%;
    cursor: pointer;
    background-color: #5B8FF3;
    color: #fff;
    font-size: 3vh;
    transition: background-color 0.2s;
}

.remove-button:hover {
    background-color: #0056b3;
}

</style>