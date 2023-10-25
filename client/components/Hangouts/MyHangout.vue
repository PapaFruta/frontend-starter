<script setup lang = "ts">
import { onMounted, ref } from "vue";
import { useUserStore } from "../../stores/user";
import { fetchy } from "../../utils/fetchy";
import Hangout from "../Post/Hangout.vue";
import { getUsername } from "../../utils/getServices";

const {currentUsername} = useUserStore();
const hangoutList = ref([])
const acceptedList = ref([])

async function getHangout(){
    try{
        const response = await fetchy(`api/hangout/user/${currentUsername}`,"GET")

        for(const r of response.hangout){
            hangoutList.value.push(r);
        }
    }
    catch{
        console.log(`Failed getting own hangout.`)
    }
}

async function getAcceptedHangout(){
    const prev = acceptedList.value
    try{
        const response = await fetchy(`api/hangout/accepted`,"GET")
        console.log(`this is response: `,response)
        acceptedList.value = []

        for(const r of response.hangout){
            console.log(r)
            const author = await getUsername(r.author)
            r.author = author

            acceptedList.value.push(r)
        }

    }
    catch{
        acceptedList.value = prev
        console.log(`Failed to fetch accepted hangout`)
    }
}



onMounted(async ()=>{
    await getHangout();
    await getAcceptedHangout();
})
</script>
<template>
    <h3>Created Hangout:</h3>
    <div class = "hangout" v-for="(hangout, index) in hangoutList" :key="index">
        <Hangout  :activity="hangout.activity" :author="currentUsername" :location="hangout.location" :date="hangout.date" :acceptee="hangout.acceptee" :showAcceptButton="false"/>
    </div>
    <h3>Accepted Hangout:</h3>
    <div class = "hangout" v-for="(hangout, index) in acceptedList" :key="index">
        <Hangout  :activity="hangout.activity" :author="hangout.author" :location="hangout.location" :date="hangout.date" :acceptee="hangout.acceptee" :showAcceptButton="true"/>
    </div>
</template>

<style scoped>
.hangout{
    width: 80%;
    margin-left: 10%;
}

</style>