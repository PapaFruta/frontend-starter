<script setup lang = "ts">
import { computed, onMounted, ref } from 'vue';
import { fetchy } from '../../utils/fetchy';
import { getFriend } from '../../utils/getServices';
import { PostType, ProposalType } from '../../utils/types';
import Hangout from './Hangout.vue';
import Post from './Post.vue';


const friends = ref<string[]>([])
const postList = ref<PostType[]>([])
const hangoutList = ref<ProposalType[]>([])
const combineList = ref<(PostType|ProposalType)[]>([])

const castedCombineList = computed<(PostType | ProposalType)[]>(() => combineList.value as (PostType | ProposalType)[]);

async function getPosts(){

    for(const friend in friends.value){
        const friendUser = friends.value[friend]
        try{
            const response = await fetchy(`api/posts/${friendUser}`,'GET')
            
            for(const r of response){
                postList.value.push({
                            type:"post",
                            author:r.author,
                            caption:r.caption,
                            photos:r.photos,
                            dateCreated:new Date(r.dateCreated)
                        });
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
                console.log(`this is hangout for ${r.username}`,r)
                hangoutList.value.push({
                            type:'hangout',
                            activity:r.activity,
                            username:friendUser,
                            location:r.location,
                            date:r.date,
                            acceptee:r.acceptee,
                            _id:r._id,
                            author:r.author,
                            dateCreated:new Date(r.dateCreated)
                        });
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
    .sort((a, b) => b.dateCreated.getTime() - a.dateCreated.getTime()); // Sort by dateCreated
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
        <div v-for="(item, index) in castedCombineList" :key="index">
            <Post v-if="item.type === 'post'" :name="item.author" :caption="item.caption" :photo="item.photos" />
            <Hangout v-else :activity="item.activity" :author="item.username" :location="item.location" :date="item.date" :acceptee = "item.acceptee" :id= "item._id" :showAcceptButton="true" />
        </div>
    </div>
</template>
