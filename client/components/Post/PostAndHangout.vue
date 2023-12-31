<script setup lang = "ts">
import { computed, defineProps, onMounted, ref, watch } from 'vue';
import { useUserStore } from '../../stores/user';
import { fetchy } from '../../utils/fetchy';
import { getFriend } from '../../utils/getServices';
import { PostType, ProposalType } from '../../utils/types';
import Hangout from './Hangout.vue';
import Post from './Post.vue';

const props = defineProps({
    update:Number
})

const friends = ref<string[]>([])
const postList = ref<PostType[]>([])
const hangoutList = ref<ProposalType[]>([])
const combineList = ref<(PostType|ProposalType)[]>([])

const {currentUsername} = useUserStore();

const castedCombineList = computed<(PostType | ProposalType)[]>(() => combineList.value as (PostType | ProposalType)[]);

async function getPosts(){
    postList.value = []
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
}

async function getHangouts(){
    hangoutList.value = []
    for (const friend in friends.value){
        const friendUser = friends.value[friend]
        try{
            const response = await fetchy(`api/hangout/user/${friendUser}`,"GET")
            for(const r of response.hangout){
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
}

watch(() => props.update, async (newValue, oldValue) => {
    if (newValue !== oldValue) {
        await getPosts();
        await getHangouts();
        updateCombinedList();
    }
});

onMounted(async ()=>{
    friends.value = await getFriend();
    friends.value.push(currentUsername);
    await getPosts();
    await getHangouts();
    updateCombinedList();
})


async function updateCombinedList(){
    combineList.value = [...postList.value, ...hangoutList.value]
    .sort((a, b) => b.dateCreated.getTime() - a.dateCreated.getTime()); // Sort by dateCreated
}

</script>
<template>
    <div>
        <div v-for="(item, index) in castedCombineList" :key="index">
            <Post v-if="item.type === 'post'" :name="item.author" :caption="item.caption" :photo="item.photos" />
            <Hangout v-else :activity="item.activity" :author="item.username" :location="item.location" :date="item.date" :acceptee = "item.acceptee" :id= "item._id" :showAcceptButton="true" />
        </div>
    </div>
</template>
