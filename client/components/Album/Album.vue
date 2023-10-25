<script>
import { defineProps } from 'vue';

const props = defineProps({
    name: String,
    imgSources: Array<String>,
    title: String,
})
</script>

<template>
<div v-for = "props.imgSources">

</div>
</template>