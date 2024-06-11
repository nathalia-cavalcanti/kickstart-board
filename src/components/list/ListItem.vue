<template>
  <div
    v-if="filteredCards.length || props.filterStatus==='all'"
    class="relative mb-5 ml-3 flex max-h-full w-list flex-col rounded bg-gray2 p-1.5 shadow-md"
    data-cy="list"
    @dragenter="isDragging = true"
    @dragleave="isDragging = false"
  >
    <div class="handle mb-1 flex">
      <input
        v-click-away="onClickAway"
        class="inline-block h-8 flex-grow cursor-pointer rounded-sm border-2 border-transparent bg-gray2 px-1 py-0.5 text-sm font-semibold text-gray-900 outline-none focus:border-blue6 focus:bg-gray1"
        data-cy="list-name"
        :value="list.name"
        @mouseup="
          selectInput($event);
          inputActive = true;
        "
        @change="patchList(list, { name: inputValue($event) })"
        @keyup.enter="
          blurInput($event);
          inputActive = false;
        "
        @blur="inputActive = false"
      >
      <ListOptions
        :list="list"
        @toggle-input="showCardCreate"
      />
    </div>
    <div
      ref="refScrollableCardList"
      data-cy="card-list"
      class="card-list overflow-y-auto"
      :class="isDragging ?? 'min-h-[100px]'"
    >
      <div
        v-if="loadingListCards[list.id]"
        class="block place-self-center text-center text-xs"
      >
        <LoadingIcon class="mb-1 inline-block" />&nbsp;&nbsp;Loading cards ...
      </div>
      <draggable
        :list="filteredCards"
        animation="150"
        group="cards"
        ghost-class="bg-gray2"
        :item-key="list.name"
        :scroll-sensitivity="200"
        :force-fallback="true"
        handle=".handle"
        @change="sortCards"
      >
        <template #item="{ element }">
          <CardItem :card="element" />
        </template>
      </draggable>
    </div>
    <div
      v-if="!cardCreate"
      class="cursor-pointer rounded-md px-2 py-1.5 text-sm font-normal text-gray-500 hover:bg-gray4 hover:text-gray-600"
      data-cy="new-card"
      @click="showCardCreate(true)"
    >
      <Plus class="inline-block h-3 w-3" />Add another card
    </div>
    <CardCreateInput
      v-else
      @cancel="showCardCreate(false)"
      @submit="addNewCard"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { blurInput } from '@/utils/blurInput';
import { inputValue } from '@/utils/inputValue';
import { selectInput } from '@/utils/selectInput';
import { useStore } from '@/store/store';
import Card from '@/typings/card';
import CardCreateInput from '@/components/card/CardCreateInput.vue';
import CardItem from '@/components/card/CardItem.vue';
import ListOptions from '@/components/list/ListOptions.vue';
import List from '@/typings/list';
import Plus from '@/assets/icons/plus.svg';
import draggable from 'vuedraggable';
import LoadingIcon from '@/assets/icons/loadingIcon.svg';
import { storeToRefs } from 'pinia';

const props = defineProps<{
  list: List;
  filterStatus: Boolean | 'all';
}>();

const cardCreate = ref(false);
const inputActive = ref(false);
const isDragging = ref(false);
const refScrollableCardList = ref<HTMLDivElement>()

const { lists, loadingListCards, board } = storeToRefs(useStore());
const { patchCard, patchList, createCard } = useStore();

const scrollCardListToEnd = () => {
  if(refScrollableCardList.value) {
    refScrollableCardList.value.scrollTop = refScrollableCardList.value.scrollHeight
  }
}

watch(cardCreate, (created) => {
  created && scrollCardListToEnd()
}, {flush: 'post'})

const addNewCard = async (title?: string) => {
  if (!title) {
    return;
  }

  await createCard({
    boardId: board.value.id,
    listId: props.list.id,
    name: title,
  });

  scrollCardListToEnd()
};

const onClickAway = () => {
  inputActive.value = false;
};

const showCardCreate = (flag: boolean) => {
  cardCreate.value = flag;
};

const filteredCards = computed(() => {
  const cards = props.list.cards;
  
  if(props.filterStatus === 'all') return cards;
  return cards?.filter(({ completed }) => completed === props.filterStatus);
})

const sortCards = () => {
  // find list to be updated - dragged card(s)
  const listItem = lists.value.find((l: List) => l.id === props.list.id);

  // trigget PATCH request for every card that was dragged
  listItem.cards?.forEach((card: Card, order: Card['order']) => {
    patchCard(card, { listId: props.list.id, order });
  });
};
</script>

<style lang="postcss" scoped>
  .card-list::-webkit-scrollbar {
      display: none;    
  }
</style>