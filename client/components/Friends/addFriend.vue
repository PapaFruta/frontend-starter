<script setup lang = 'ts'>
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";
 
const buttonClicked = ref(false);
const username = ref('');
const duration = ref('');

async function addFriend(){
    buttonClicked.value  = !buttonClicked.value
    const response = await fetchy("api/friend/request","POST",{
        body: {to:username.value,
                duration:parseInt(duration.value)*24*60*60*1000}
    });
    console.log('this is friend request ',response)
}
</script>

<template>
    <div>
        <div v-if = "buttonClicked" class = "form">
            <input v-model="username" type = "text" placeholder = "Enter their username..."/>
            <input v-model="duration" type = "text" placeholder = "Enter the duration of your friendship"/>
            <button class = "add" @click="addFriend" >+</button>
        </div>
        
        <button v-if = "!buttonClicked" @click="buttonClicked = true" class ="addFriend">Add Friend</button>
    </div>
</template>

<style scoped>
.addFriend{
    background-color: #8DACC4;
    border: solid 2px #6C9CB6 ;
    width: 90%;
    color:white;
    border:none;
    font-size: 4vh;
    padding: .5vh ;
    border-radius: 5px;
    margin-top: 2%;
}

.addFriend:hover{
    background-color: #6C9CB6;
}



input{
    /* flex-grow: 1; makes the input field take up all available space */
    height: 4vh;
    border: solid1 1px grey ;
}

.add{
    background-color: #8DACC4;
    border: solid 2px #6C9CB6 ;
    color:white;
    border:none;
    font-size: 4vh;
    margin-left: 1vh;
}

.add:hover{
    background-color: #6C9CB6;
}

.form {
  /* display: flex; */
  align-items: center; /* this vertically centers the children */
  margin-top: 5%;
  width: 90%;
}
</style>