<template>
  <div
    class="place-self-center"
    data-cy="board-list-error-message"
  >
    <span class="mb-4 block text-center text-8xl font-bold text-gray-200">{{ loadingError.status }}</span>
    <p class="mb-4 block text-center text-gray-400">
      {{ loadingError.message || 'There was an error loading your boards' }}
    </p>
    <a
      href="/"
      class="block text-center font-semibold text-blue7"
    > Try again </a>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/store/store';
import { storeToRefs } from 'pinia';
const { loadingError } = storeToRefs(useStore());
</script>
