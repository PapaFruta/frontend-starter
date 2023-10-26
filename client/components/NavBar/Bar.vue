<script setup lang="ts">
import ChatImg from "@/assets/images/chat.png";
import FriendImg from "@/assets/images/friends.png";
import PostImg from "@/assets/images/happy.png";
import SettingImg from "@/assets/images/setting.png";
import NavButton from './navButton.vue';

</script>
<template>
  <div class="container">
    <NavButton :imgSrc="ChatImg" title="Chat" route_link="/chat"/>
    <NavButton :imgSrc="FriendImg" title="Friend" route_link="/friend"/>
    <NavButton :imgSrc="PostImg" title="Post" route_link="/post"/>
    <div class="spacer"></div> 
    <NavButton :imgSrc="SettingImg" title="Setting" route_link="/setting" class="setting"/>
    <div class="bar"></div>
    <!-- <slot></slot> -->
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column; /* stack children vertically */
  height: 100vh; /* full height of the viewport */
  justify-content: space-between; /* distributes items evenly, with first item at start and last item at end */
}

.spacer {
  flex-grow: 1; /* takes up any available space */
}

.setting {
  padding-bottom: 20%;
}

</style>
