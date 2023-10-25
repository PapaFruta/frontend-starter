<script setup lang = "ts">
import { ref } from 'vue';
import { fetchy } from '../../utils/fetchy';

const activity = ref('');
const location = ref('');
const date = ref('')

async function proposalHangout(){

    try{
        const response = await fetchy(`api/hangout`,"POST",{body:{
            date:date.value,
            activity:activity.value,
            location:location.value
        }})

        console.log(`this is hangout created: `, response.hangout)
        alert(`Hangout created successfully!`)
    }catch{
        console.log(`Fail to proposal hangout`);
    }

    activity.value = ''
    location.value = ''
    date.value = ''
}

</script>

<template>
    <hr class = "main-break">
    <div>   
        <div class="input-group">
            <label>Activity</label>
            <input v-model="activity" type="text" placeholder="Activity" required />
        </div>
        <div class="input-group">
            <label>Location</label>
            <input v-model="location" type="text" placeholder="Location" optional />
        </div>
        <div class="input-group">
            <label>Date</label>
            <input v-model="date" type="date" placeholder="Date" optional />
        </div>
        <hr>
        <div class="button-container">
            <button @click="proposalHangout">Propose</button>
        </div>
    </div>
</template>

<style scoped>
.main-break{
    width: 90%;
    /* height: 2px; */
}

.input-group {
    display: flex;
    align-items: center;
    margin-bottom: 10px; 
}

label {
    width: 100px; /* Adjust this value based on the longest label to ensure consistent spacing */
    text-align: left; /* Makes the text align to the right edge of its space */
    margin-right: 20px; /* Space between the label and the input */
}

input {
    padding: 2%;
    flex-grow: 1; 
}
.button-container {
    display: flex;
    justify-content: center;
    width: 100%; /* makes sure the container takes full width */
}

button {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background-color: #007BFF;
    color: #fff;
    font-weight: bold;
    transition: background-color 0.2s;
}

button:hover {
    background-color: #0056b3;
}
</style>

