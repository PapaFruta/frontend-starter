<script setup lang="ts">
import Menu from "@/components/Menu/Menu.vue";
import MyHangout from "../components/Hangouts/MyHangout.vue";
</script>
<template>
    <div class="container">
        <Menu class="menu"/>
        <main class="hangouts">
            <MyHangout/>
        </main>
    </div>
</template>

<style>
.container {
  display: flex;
  height: 100vh;
}

.menu {
  box-sizing: border-box;
  padding-left: 1%;
  width: 25%;
  overflow-y: auto;
  height: 100%;
  position: relative;
}

.menu::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 1px;
  background-color: slategray;
}

.hangouts {
  flex-grow: 1;
  overflow-y: auto;
}
</style>
