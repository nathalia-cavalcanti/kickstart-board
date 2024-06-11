<template>
  <button
    data-cy="list-options"
    class="ml-2 inline-grid h-8 w-8 cursor-pointer self-center rounded-sm bg-white bg-opacity-20 text-white hover:bg-opacity-30"
    @click="showDropdown()"
  >
    <Dots
      class="inline-block h-8 w-8 flex-grow-0 cursor-pointer place-self-end rounded-sm border-2 border-transparent bg-transparent p-1.5 text-gray10 hover:bg-gray4 active:bg-gray7"
    />
  </button>
  <Dropdown
    v-if="dropdown"
    v-click-away="onClickAway"
    data-cy="list-dropdown"
    :header="'List actions'"
    @close="hideDropdown()"
  >
    <DropdownItem
      item-text="Add another card"
      data-cy="card-add"
      @click="
        emit('toggle-input', true);
        hideDropdown();
      "
    />
    <DropdownItem
      item-text="Delete list"
      :warning="true"
      data-cy="delete-list"
      @click="
        deleteList(list.id, list.boardId);
        hideDropdown();
      "
    />
  </Dropdown>
</template>

<script setup lang="ts">
import { PropType, ref } from 'vue';
import List from '@/typings/list';
import Dots from '@/assets/icons/dots.svg';
import Dropdown from '@/components/common/Dropdown.vue';
import DropdownItem from '@/components/common/DropdownItem.vue';
import { useStore } from '@/store/store';
const { deleteList } = useStore();

defineProps({
  list: {
    default: null,
    type: Object as PropType<List>,
  },
});

const emit = defineEmits(['toggle-input']);
const dropdown = ref(false);
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
