<template>
  <div
    class="block cursor-pointer px-2 py-1 pt-2 text-sm text-gray-700 hover:bg-gray1 active:bg-gray2"
    :class="warning && 'text-red-600'"
  >
    {{ itemText }}
  </div>
</template>

<script setup lang="ts">
defineProps({
  itemText: {
    default: 'Item text',
    type: String,
  },
  warning: {
    default: false,
    type: Boolean,
  },
});
</script>
