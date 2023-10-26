<script setup lang="ts">
import { Ref, computed, onMounted, ref } from "vue";
import { fetchy } from "../../utils/fetchy";
import { FriendType, RequestType } from "../../utils/types";
import FriendList from "./FriendList.vue";
import Request from "./Request.vue";
import AddFriend from "./addFriend.vue";

const friendList: Ref<RequestType[]> = ref([]);
const requestList: Ref<FriendType[]> = ref([]);
const removelist: Ref<string[]> = ref([]);
const displayRequest = ref(false)
const displayFriend = ref(false)
const removeFriend = ref(false);

function updateDisplayFriend(){
    displayFriend.value = !displayFriend.value;
}

function updateDisplayRequest(){
    displayRequest.value = !displayRequest.value;
}


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
        let to_ids = requestResponse.filter((item:RequestType)=>item.status == "pending").map((item:RequestType) => item.from)
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
    await updateRequest();
    await updateFriend();
}

async function rejectRequest(username:string){
    console.log('this is rejecting username', username)
    try{
        const response = await fetchy(`api/friend/reject/${username}`, "PUT");
    }catch{
        console.log('failed rejected request')
    }
    await updateRequest();
    await updateFriend();
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
    <div class = "background-blue">
        <div >
    <div class = "links-row">
        <h2>Friends 
        <button class = "displayButton" @click = "updateDisplayFriend">
            <img class = "displayFriend" v-if = "displayFriend" src = "../../assets/images/down-arrow.png"/>
            <img class = "displayFriend" v-if = "!displayFriend" src = "../../assets/images/left-arrow.png"/>
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
                :chat="removeFriend"
                @select = "(username)=>{selectFriend(username)}"/>
       <h2>Request 
        <button class = "displayButton" @click = "updateDisplayRequest">
            <img class = "displayRequest" v-if = "displayRequest" src = "../../assets/images/down-arrow.png"/>
            <img class = "displayRequest" v-if = "!displayRequest" src = "../../assets/images/left-arrow.png"/>
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
    </div>
  
</template>

<style scoped>
.background-blue{
    background-color: #F9F9F0;
    color: #151C30;
}

.cancel-button{
    padding: 5px 10px;
    border: none;
    border-radius: 4px;
    margin-top: 3%;
    margin-left: 65%;
    cursor: pointer;
    background-color: #66534B;
    color: #fff;
    font-size: 3vh;
    transition: background-color 0.2s;
}

.cancel-button:hover {
    background-color: #EFB679;  /* Darker red on hover */
}

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
    background-color: #8DACC4;
    color: #F9F9F0;
    font-size: 3vh;
    transition: background-color 0.2s;
}

.remove-button:hover {
    background-color: #6C9CB6;
}

</style>