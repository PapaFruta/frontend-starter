<script setup lang = "ts">
import FriendList from '../Friends/FriendList.vue';
import {Ref, ref, onMounted, defineEmits} from "vue";
import { fetchy } from "../../utils/fetchy";

const friendList: Ref<Object[]> = ref([]);

const emit = defineEmits(['select'])


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

function selectFriend(username:string){
    console.log(`This is user ${username}`)
    emit('select',username);
}

onMounted(()=>{
    updateFriend()
})

</script>
<template>
    <div class = "links-column">
        <FriendList
            class = "friendList"
            :displayFriend="true"
            :friendList="friendList"
            :chat="true"
            @select = "(username)=>{selectFriend(username)}"/>
    </div>  
</template>
<style scoped>
.friendList {
    flex-wrap: wrap; /* allows the items to wrap to the next line */
    gap: 10px; /* optional: for spacing between the items */
}

</style>