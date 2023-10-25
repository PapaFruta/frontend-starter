<script setup lang = "ts">
import { onMounted, ref } from 'vue';
import { fetchy } from '../../utils/fetchy';
import { getFriend } from '../../utils/getServices';
import Hangout from './Hangout.vue';
import Post from './Post.vue';

const friends = ref([])
const postList = ref([])
const hangoutList = ref([])
const combineList = ref([])

async function getPosts(){

    for(const friend in friends.value){
        const friendUser = friends.value[friend]
        try{
            const response = await fetchy(`api/posts/${friendUser}`,'GET')
            
            for(const r of response){
                postList.value.push(r);
            }
        }catch{
            console.log(`Failed fetching posts for ${friendUser}`)
        }
       
    }
    updateCombinedList();

}

async function getHangouts(){
    
    for (const friend in friends.value){
        const friendUser = friends.value[friend]

        try{
            const response = await fetchy(`api/hangout/user/${friendUser}`,"GET")
            console.log(`the response is here ${friendUser}`,response)
            for(const r of response.hangout){
                r.username = friendUser
                console.log(`this is hangout for ${r.username}`,r)
                hangoutList.value.push(r);
            }
        }catch{
            console.log(`Failed fetching posts from ${friendUser}`)
        }

    }
    updateCombinedList();
}

function updateCombinedList(){
    console.log(`this is hangout: `,hangoutList.value)
    combineList.value = [...postList.value, ...hangoutList.value]
        .map(item => ({...item, type: item.caption ? 'post' : 'hangout'})) // Add an item type
        .sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated)); // Sort by postedAt
}

onMounted(async ()=>{
    friends.value = await getFriend();
    await getPosts();
    await getHangouts();
    updateCombinedList();

    console.log(`this is combined list: `,combineList)
})

</script>
<template>
    <div>
        <div v-for="(item, index) in combineList" :key="index">
            <Post v-if="item.type === 'post'" :name="item.author" :caption="item.caption" :photo="item.photos" />
            <Hangout v-else :activity="item.activity" :author="item.username" :location="item.location" :date="item.date" :acceptee = "item.acceptee" :id= "item._id" :showAcceptButton="true" />
        </div>
    </div>
</template>
