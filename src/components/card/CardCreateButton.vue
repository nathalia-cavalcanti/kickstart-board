<template>
  <div
    class="cursor-pointer rounded-md px-2 py-1.5 text-sm font-normal text-gray-500 hover:bg-gray4 hover:text-gray-600"
    @click="$emit('toggleInput', true)"
  >
    <Plus class="inline-block h-3 w-3" />
    <div data-cy="new-card">
      Add another card
    </div>
  </div>
</template>

<script setup lang="ts">
import Plus from '@/assets/icons/Plus.svg';
defineEmits(['toggleInput']);
</script>
