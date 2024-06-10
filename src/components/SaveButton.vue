<template>
  <button
    class="mt-1 inline-block h-8 rounded-sm bg-green7 px-3 py-1 text-center text-sm font-normal text-white hover:bg-green6 focus:outline-none"
    style="width: fit-content"
  >
    {{ buttontext }}
  </button>
</template>

<script setup lang="ts">
defineProps({
  buttontext: {
    default: 'Save',
    type: String,
  },
});
</script>
