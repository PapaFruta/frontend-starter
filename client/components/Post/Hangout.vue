<script setup lang="ts">
import { defineProps, onMounted, ref, withDefaults } from 'vue';
import { useUserStore } from '../../stores/user';
import { fetchy } from '../../utils/fetchy';
import { getUsername } from "../../utils/getServices"; // Adjust the import path

const props = withDefaults(
  defineProps<{
    id: String,
    activity: String,
    author: String,
    location: String,
    date: String,
    acceptee: Array<string>,
    showAcceptButton: Boolean
  }>(),
  {
    acceptee: () => []
  }
);


const {currentUsername} = useUserStore();
const hasAccepted = ref(props.acceptee.includes(currentUsername));

async function acceptInvite(){
  try{
    const response = await fetchy(`api/hangout/${props.id}/accept`,"PATCH");
    alert('Successfully Accepted Invite');
    hasAccepted.value = true;
  }
  catch{
    console.log(`Fail accepting invite`);
  }
}

async function cancelInvite(){
  try{
    const response = await fetchy(`api/hangout/${props.id}/cancel`,"PATCH");
    alert('Successfully Cancelled Invite');
    hasAccepted.value = false;
  }
  catch{
    console.log(`Fail cancel invite`);
  }
}

const accepteesUsernames = ref<string[]>([]); // To store usernames

onMounted(async () => {
  if (props.acceptee && props.acceptee.length > 0) {
    const usernames = await Promise.all(
      props.acceptee.map(id => getUsername(id))
    );
    accepteesUsernames.value = usernames;
  }
  console.log(`this is acceptee: `,props.acceptee, currentUsername)
});
</script>

<template>
  <h3>{{ props.author }}</h3>
  <div class="hangout">
    Let's hangout at <strong>{{ props.location }}</strong> on <strong>{{ props.date }}</strong>, to <strong>{{ props.activity }}</strong>
  </div>
  <div v-if="!showAcceptButton">
      <p>Acceptees:</p>
      <ul>
          <li v-for="(username, index) in accepteesUsernames" :key="index">{{ username }}</li>
      </ul>
  </div>
  
<div v-if="showAcceptButton">
  <div v-if="!hasAccepted" class="button-container">
    <button @click="acceptInvite">Accept Invite</button>
  </div>
  <div v-if="hasAccepted" class="button-container">
    <button class="cancel-button" @click="cancelInvite">Cancel Acceptance</button>
  </div>
</div>
  <hr>
</template>


<style scoped>

button {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background-color: #8DACC4;
    color: #F9F9F0;
    font-weight: bold;
    transition: background-color 0.2s;
}

button:hover {
  background-color: #6C9CB6;
}
.cancel-button {
    background-color: #66534B;  /* Red color */
}

.cancel-button:hover {
    background-color: #EFB679;  /* Darker red on hover */
}

.button-container {
    display: flex;
    justify-content: center;
    width: 100%; /* makes sure the container takes full width */
}

h3 {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
}

ul {
  list-style-type: none;
}

ul li {
  font-size: 16px;
  margin-bottom: 5px;
  color: #555;
}

div {
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
}

.hangout{
  background-color: aliceblue;
}
</style>