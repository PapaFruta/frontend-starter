<script setup lang="ts">
import NavButton from './navButton.vue';
</script>
<template>
  <div class="container">
    <NavButton imgSrc="client/assets/images/chat.png" title="Chat" route_link="/chat"/>
    <NavButton imgSrc="client/assets/images/friends.png" title="Friend" route_link="/friend"/>
    <NavButton imgSrc="client/assets/images/Happy.png" title="Post" route_link="/post"/>
    <div class="spacer"></div> <!-- Spacer element -->
    <NavButton imgSrc="client/assets/images/setting.png" title="Setting" route_link="/setting" class="setting"/>
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
