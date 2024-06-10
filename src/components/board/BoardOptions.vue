<template>
  <div class="relative inline-block">
    <button
      data-cy="board-options"
      class="inline-grid h-8 w-8 cursor-pointer self-center rounded-sm bg-white bg-opacity-20 text-white hover:bg-opacity-30"
      @click="showDropdown()"
    >
      <Dots class="m-2 place-self-center" />
    </button>
    <Dropdown
      v-if="dropdown"
      v-click-away="onClickAway"
      data-cy="board-dropdown"
      :header="'Board actions'"
      @close="hideDropdown()"
    >
      <DropdownItem
        item-text="Delete board"
        :warning="true"
        data-cy="delete-board"
        @click="
          deleteBoard(board.id);
          router.push('/');
          showDropdown();
        "
      />
    </Dropdown>
  </div>
</template>

<script setup lang="ts">
import { PropType, ref } from 'vue';
import { useStore } from '@/store/store';
import { useRouter } from 'vue-router';
import Board from '@/typings/board';
import Dots from '@/assets/icons/dots.svg';
import Dropdown from '@/components/common/Dropdown.vue';
import DropdownItem from '@/components/common/DropdownItem.vue';

defineProps({
  board: {
    default: null,
    type: Object as PropType<Board>,
  },
});

const router = useRouter();
const dropdown = ref(false);
const { deleteBoard } = useStore();
const onClickAway = () => {
  dropdown.value = false;
};
const showDropdown = () => {
  dropdown.value = true;
};
const hideDropdown = () => {
  dropdown.value = false;
};
</script>
