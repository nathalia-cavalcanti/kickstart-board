<template>
  <div
    v-if="createListInput"
    v-click-away="onClickAway"
    class="ml-3 grid w-list cursor-pointer rounded-sm bg-gray2 px-1.5 py-1 shadow-md"
  >
    <input
      ref="listCreate"
      v-model="listTitle"
      class="h-9 w-full rounded-sm border-2 border-transparent px-2 py-2 text-sm outline-none focus:border-blue6"
      data-cy="add-list-input"
      placeholder="Enter list title..."
      @keyup.enter.prevent="addList()"
      @keyup.esc.prevent="
        createListInput = false;
        listTitle = '';
      "
    >
    <div>
      <SaveButton
        buttontext="Add list"
        @click="addList()"
      />
      <Cross
        class="order-last mx-0.5 inline-block h-8 w-8 fill-current p-1 text-gray-600"
        data-cy="cancel"
        @click.stop="
          createListInput = false;
          listTitle = '';
        "
      />
    </div>
  </div>
  <div
    v-else
    class="flex-no-shrink ml-3 w-list cursor-pointer rounded bg-white bg-opacity-20 p-2.5 text-sm text-gray-50 hover:bg-opacity-30"
    data-cy="create-list"
    @click="enableInput()"
  >
    <Plus class="inline-block h-3 w-3" /> {{ !lists.length ? 'Add a list' : 'Add another list' }}
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue';
import { useStore } from '@/store/store';
import Cross from '@/assets/icons/cross.svg';
import Plus from '@/assets/icons/plus.svg';
import SaveButton from '@/components/SaveButton.vue';
import { storeToRefs } from 'pinia';

const { board, createListInput, lists } = storeToRefs(useStore());
const { createList } = useStore();
const listTitle = ref('');
const listCreate = ref();

const addList = () => {
  if (!listTitle.value) {
    return;
  }

  const boardId = board.value.id;
  const name = listTitle.value;

  createList(boardId, name);

  listTitle.value = '';
};

const enableInput = () => {
  createListInput.value = true;
  nextTick(() => {
    listCreate.value.focus();
  });
};
const onClickAway = () => {
  createListInput.value = false;
  listTitle.value = '';
};
</script>
