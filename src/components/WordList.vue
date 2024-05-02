<script setup>
const props = defineProps({
  title: String,
  words: Array,
});
</script>

<template>
  <section>
    <h3>{{ props.title }}</h3>
    <ul class="d-flex flex-wrap gap">
      <li v-for="word in props.words">{{ word }}</li>
    </ul>
  </section>
</template>

<style scoped>
.gap {
  gap: 8px;
}

li {
  list-style: none;
}
</style>
