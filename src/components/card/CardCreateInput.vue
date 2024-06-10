<template>
  <div
    v-click-away="onClickAway"
    class="grid w-full cursor-pointer"
  >
    <textarea
      ref="cardCreate"
      v-model="cardTitle"
      class="h-16 w-full resize-none rounded border-b border-gray7 px-2 py-1 text-sm outline-none"
      data-cy="new-card-input"
      placeholder="Enter a title for this card..."
      @keydown.enter.prevent="addCard"
      @keyup.esc.prevent="
        emit('toggleInput', false);
        cardTitle = '';
      "
    />
    <div>
      <SaveButton
        buttontext="Add card"
        @click="addCard"
      />
      <Cross
        data-cy="cancel"
        class="order-last mx-0.5 inline-block h-8 w-8 fill-current p-1 text-gray-600"
        @click.stop="
          emit('toggleInput', false);
          cardTitle = '';
        "
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, ref, onMounted } from 'vue';
import { useStore } from '@/store/store';
import Cross from '@/assets/icons/cross.svg';
import List from '@/typings/list';
import SaveButton from '@/components/SaveButton.vue';
import { storeToRefs } from 'pinia';

const props = defineProps({
  list: {
    default: null,
    type: Object as PropType<List>,
  },
});

const emit = defineEmits(['toggleInput', 'scrollListToEnd']);

const { board } = storeToRefs(useStore());
const cardCreate = ref();
const { createCard } = useStore();
let cardTitle = ref('');

const addCard = async () => {
  if (!cardTitle.value) {
    return;
  }

  await createCard({
    boardId: board.value.id,
    listId: props.list.id,
    name: cardTitle.value,
  });
  cardTitle.value = '';
  emit('scrollListToEnd');
};

const onClickAway = () => {
  emit('toggleInput', false);
  cardTitle.value = '';
};

onMounted(() => {
  cardCreate.value.focus();
  emit('scrollListToEnd');
});
</script>
