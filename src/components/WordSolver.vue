<script setup>
import { ref, computed } from "vue";
import WordList from "./WordList.vue";

const lettersStr = ref("");
const letters = computed(() => lettersStr.value.split(""));
const requireAllLetters = ref(false);

/** @type string[][] */
const wordsList = ref([]);

function solve() {}
</script>

<template>
  <v-container fluid>
    <section>
      <v-text-field
        v-model="lettersStr"
        label="Type in letters to use"
        variant="outlined"
        hide-details
      />
      <v-checkbox
        v-model="requireAllLetters"
        label="Require all letters to be used"
        hide-details
      />
      <v-btn color="primary" @click="solve">Submit</v-btn>
    </section>
    <v-divider class="my-2" thickness="2" />
    <p v-if="words.length">Enter letters and submit above to view results.</p>
    <template v-else>
      <section v-for="(words, idx) in wordsList" :key="idx">
        <WordList :words="words" />
        <v-divider class="my-2" thickness="2" />
      </section>
    </template>
  </v-container>
</template>
