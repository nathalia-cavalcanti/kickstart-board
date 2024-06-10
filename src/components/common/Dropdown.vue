<template>
  <div
    v-click-away="onClickAway"
    class="absolute left-2 top-11 z-10 w-dropdown rounded-sm bg-white py-2 shadow-xl"
  >
    <div class="mt-0.5 h-7 text-center text-sm text-gray-600">
      {{ header }}
    </div>
    <Cross
      class="absolute right-1 top-1 h-8 w-8 cursor-pointer px-2 text-gray-600"
      @click="emit('close')"
    />
    <hr>
    <slot />
  </div>
</template>
<script setup lang="ts">
import Cross from '@/assets/icons/cross.svg';

defineProps({
  header: {
    default: null,
    type: String,
  },
});

const emit = defineEmits(['close']);

const onClickAway = () => {
  emit('close');
};
</script>
