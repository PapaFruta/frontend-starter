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

async function acceptInvite(){
  // console.log(`this is hangout id: ${props.id}`)
  try{
    const response = await fetchy(`api/hangout/${props.id}/accept`,"PATCH")
    alert('Successfully Accepted Invite')
  }
  catch{
    console.log(`Fail accepting invite`)
  }
  location.reload()

}

async function cancelInvite(){
  try{
    const response = await fetchy(`api/hangout/${props.id}/cancel`,"PATCH")
    alert('Successfully Cancelled Invite')
  }
  catch{
    console.log(`Fail cancel invite`)
  }
  location.reload()
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
  <div v-else-if="showAcceptButton && !accepteesUsernames?.includes(currentUsername)" class="button-container">
    <button @click = "acceptInvite">Accept Invite</button>
  </div>
  <div v-if="showAcceptButton && accepteesUsernames?.includes(currentUsername)" class="button-container">
    <button class="cancel-button" @click = "cancelInvite">Cancel Acceptance</button>
  </div>
  <hr>
</template>


<style scoped>

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
.cancel-button {
    background-color: #F8C511;  /* Red color */
}

.cancel-button:hover {
    background-color: #F8A911;  /* Darker red on hover */
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