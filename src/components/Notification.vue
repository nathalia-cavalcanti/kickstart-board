<template>
  <div
    v-if="notification.show"
    class="absolute bottom-5 left-5 z-50 h-14 min-w-min rounded-sm bg-white text-base shadow-xl"
    data-cy="notification-message"
  >
    <Error
      v-if="notification.error"
      class="ml-4 inline-block h-6 w-6 fill-current text-red-500"
      data-cy="error-icon"
    />
    <Info
      v-else
      class="ml-4 inline-block h-4 w-4 fill-current text-blue-500"
      data-cy="info-icon"
    />
    <div class="m-4 inline-block text-black">
      {{ notification.message }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/store/store';
import Error from '@/assets/icons/error.svg';
import Info from '@/assets/icons/info.svg';
import { storeToRefs } from 'pinia';
const { notification } = storeToRefs(useStore());
</script>
