<script setup>
const props = defineProps({
  words: Array,
});
</script>

<template>
  <p>{{ props.words }}</p>
</template>
