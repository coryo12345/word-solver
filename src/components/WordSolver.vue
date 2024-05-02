<script setup>
import { nextTick, ref } from "vue";
import { findWords } from "../lib/solver";
import WordList from "./WordList.vue";

const lettersStr = ref("");
const requireAllLetters = ref(false);
const minLength = ref(3);
const loading = ref(false);

/** @type {{[length: number]: string[]}} */
const wordsList = ref({});

async function solve() {
  loading.value = true;
  await nextTick();
  const words = await findWords(
    lettersStr.value.split(""),
    requireAllLetters.value,
    minLength.value,
  );

  const wordsByLength = words.reduce((prev, curr) => {
    if (!prev[curr.length]) {
      prev[curr.length] = [curr];
    } else {
      prev[curr.length].push(curr);
    }
    return prev;
  }, {});
  wordsList.value = wordsByLength;

  loading.value = false;
}
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
      <v-text-field
        v-model="minLength"
        label="Minimum length for matched words"
        type="number"
        hide-details
        variant="outlined"
      />
      <v-btn color="primary" class="mt-2" @click="solve">Submit</v-btn>
    </section>
    <v-divider class="my-6" thickness="2" />
    <div v-if="loading" class="d-flex justify-center">
      <v-progress-circular
        indeterminate
        color="primary"
        size="60"
        class="mx-auto"
      />
    </div>
    <p v-else-if="!Object.keys(wordsList).length">
      Enter letters and submit above to view results.
    </p>
    <template v-else>
      <section v-for="(words, length) in wordsList">
        <WordList :title="'Words of length ' + length" :words="words" />
        <v-divider class="mt-2 mb-4" thickness="2" />
      </section>
    </template>
  </v-container>
</template>
