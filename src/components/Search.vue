<template>
  <div
    class="fixed z-50 grid h-screen w-screen place-content-center"
    style="background-color: rgba(30, 41, 59, 0.5)"
  >
    <div class="shadow-lg">
      <div class="mb-1 text-xs text-gray-200">
        Search cards
      </div>
      <input
        ref="search"
        v-model="searchQuery"
        v-click-away="onClickAway"
        type="text"
        class="h-14 w-96 border-b-2 border-slate-300 bg-white px-3 text-2xl outline-none"
        data-cy="search-input"
        @keyup="triggerSearch"
      >
      <div
        v-for="result in searchResults"
        :key="result.id"
        data-cy="result-item"
        class="border-b-1 flex h-12 w-96 border-slate-600 bg-white text-xl"
      >
        <a
          :href="`/board/${result.boardId}?card=${result.id}`"
          class="h-full w-full place-self-center px-3 py-3"
        >
          {{ result.name }}
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useStore } from '@/store/store';
import { storeToRefs } from 'pinia';

const { searchCard, toggleSearch } = useStore();
const { searchResults } = storeToRefs(useStore());
const triggerSearch = () => {
  if (searchQuery.value?.length) {
    searchCard(searchQuery.value);
  }
 else {
    searchResults.value = [];
  }
};

const search = ref();
const searchQuery = ref();
const onClickAway = () => {
  toggleSearch(false);
};
onMounted(() => {
  search.value.focus();
});
</script>
