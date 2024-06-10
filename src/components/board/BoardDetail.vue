<template>
  <div
    class="grid"
    :class="state.loadingError.show ? 'bg-white' : 'bg-blue6'"
  >
    <!-- LOADING -->
    <div
      v-if="state.loading"
      class="loading grid h-screen content-center justify-center"
    >
      <div><LoadingIcon class="mb-1 inline-block" />&nbsp;&nbsp;Loading data ...</div>
    </div>
    <!-- ERROR STATE -->
    <div
      v-if="state.loadingError.show"
      class="grid h-screen content-center justify-center"
      data-cy="board-list-error-message"
    >
      <span class="mb-4 block text-center text-8xl font-bold text-gray-200">{{ state.loadingError.status }}</span>
      <p class="mb-4 block text-center text-gray-400">
        {{ state.loadingError.message || 'There was an error loading board' }}
      </p>
      <router-link
        to="/"
        class="block text-center font-semibold text-blue7"
      >
        Go back home
      </router-link>
    </div>
    <!-- BOARD DETAIL -->
    <div
      v-if="!state.loading && !state.loadingError.show"
      class="board-detail overflow-x-auto whitespace-nowrap pb-5"
      data-cy="board-detail"
    >
      <div class="py-2.5">
        <div class="relative ml-3 mr-0 inline-block h-8 py-1.5">
          <div class="invisible inline-block px-3 font-bold">
            {{ state.board.name }}
          </div>
          <input
            v-model="state.board.name"
            v-click-away="onClickAway"
            class="board-title bg-white bg-opacity-20 text-white hover:bg-opacity-30"
            data-cy="board-title"
            autocomplete="off"
            name="board-title"
            @focus="selectInput($event)"
            @change="state.patchBoard(state.board, { name: state.board.name })"
            @keyup.enter="blurInput($event)"
            @keyup.esc="blurInput($event)"
          >
        </div>
        <div
          class="relative ml-2 inline-grid h-8 w-8 cursor-pointer self-center rounded-sm bg-white bg-opacity-20 hover:bg-opacity-30"
          :class="[state.board.starred ? 'fill-current text-yellow-300' : 'stroke-current text-white']"
          data-cy="star"
          @click="
            state.patchBoard(state.board, {
              starred: !state.board.starred,
            })
          "
        >
          <Star class="m-2 place-self-center" />
        </div>
        <BoardOptions :board="state.board" />
      </div>
      <draggable
        v-model="state.lists"
        animation="150"
        group="lists"
        item-key="order"
        class="list-draggable inline-block"
        :scroll-sensitivity="200"
        :force-fallback="true"
        handle=".handle"
        @end="state.sortLists"
      >
        <template #item="{ element }">
          <div
            class="inline-block h-full align-top"
            data-cy="list-placeholder"
          >
            <ListItem :list="element" />
          </div>
        </template>
      </draggable>
      <div class="inline-block align-top">
        <ListCreate />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { blurInput } from '@/utils/blurInput';
import { ref } from 'vue';
import { selectInput } from '@/utils/selectInput';
import { useStore } from '@/store/store';
import { useRoute } from 'vue-router';
import BoardOptions from '@/components/board/BoardOptions.vue';
import ListCreate from '@/components/list/ListCreate.vue';
import ListItem from '@/components/list/ListItem.vue';
import LoadingIcon from '@/assets/icons/loadingIcon.svg';
import Star from '@/assets/icons/star.svg';
import draggable from 'vuedraggable';

const route = useRoute();
const state = useStore();
const inputActive = ref(false);
const boardId = Number(route.params.board);
state.getBoardDetail(boardId);
const onClickAway = () => {
  inputActive.value = false;
};
</script>

<style lang="postcss" scoped>
.board-detail {
  height: calc(100vh - 40px);
}

.board-title:focus {
  @apply bg-gray1 bg-opacity-100 hover:bg-opacity-100 text-black;
}

.board-title {
  @apply absolute outline-none font-bold top-0 bottom-0 right-0 left-0 w-full pl-3 rounded-sm cursor-pointer;
}

.list-draggable {
  height: calc(100% - 52px);
}

</style>
