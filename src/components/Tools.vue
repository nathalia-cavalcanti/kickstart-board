<template>
  <div
    class="fixed bottom-0 right-0 m-3 rounded-sm p-5"
    style="background: rgb(0 0 0 / 0.1)"
    data-cy="api-tools"
  >
    Reset application:
    <button
      class="m-1 border border-black bg-white px-1"
      @click="
        reset();
        router.push('/');
      "
    >
      All
    </button>
    <button
      class="m-1 border border-black bg-white px-1"
      @click="
        resetBoards();
        router.push('/');
      "
    >
      Boards
    </button>
    <button
      class="m-1 border border-black bg-white px-1"
      @click="resetLists()"
    >
      Lists
    </button>
    <button
      class="m-1 border border-black bg-white px-1"
      @click="resetCards()"
    >
      Cards
    </button>
    <button
      class="m-1 border border-black bg-white px-1"
      @click="resetUsers()"
    >
      Users
    </button>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/store/store';
import { useRouter } from 'vue-router';

const { reset, resetBoards, resetLists, resetCards, resetUsers } = useStore();

const router = useRouter();
</script>
