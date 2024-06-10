<template>
  <div
    data-cy="card"
    class="card relative my-1.5 grid w-full cursor-pointer rounded border border-solid border-gray1 bg-white p-2 drop-shadow-sm hover:bg-gray1"
    @click="showCardModule(card.id, true)"
  >
    <div class="flex px-1.5 pl-0.5">
      <Checkbox :card="card" />
      <div
        class="flex-grow select-none pl-2 pr-4 text-sm text-gray-800"
        style="white-space: break-spaces"
        data-cy="card-text"
      >
        {{ card.name }}
      </div>
      <Pen class="pen absolute bottom-2 right-2 hidden h-5 w-5 bg-gray1 bg-opacity-60 p-1 text-gray-700" />
      <Handle class="handle absolute right-1 top-2" />
    </div>
    <div
      class="mt-1 w-[fit-content] rounded-sm px-1.5 py-1 text-xs text-gray9"
      data-cy="due-date"
      :class="{ overdue: isOverdue() && !card.completed, completed: card.completed }"
    >
      <Clock class="inline-block h-4 w-4 fill-current" />
      <span class="ml-2">{{ new Date(card.deadline).toDateString().substring(4) }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { useStore } from '@/store/store';
import Card from '@/typings/card';
import Checkbox from '@/components/Checkbox.vue';
import Clock from '@/assets/icons/clock.svg';
import Pen from '@/assets/icons/pen.svg';
import Handle from '@/assets/icons/handle.svg';
import moment from 'moment';

const props = defineProps({
  card: {
    default: null,
    type: Object as PropType<Card>,
  },
});

const { showCardModule } = useStore();

const isOverdue = () => {
  const today = new Date();
  return moment(props.card.deadline).isBefore(today)
};

</script>

<style lang="postcss" scoped>
.card:hover .pen {
  display: inline-block;
}

.completed {
  @apply bg-green5 text-white;
}

.overdue {
  @apply bg-red1 text-white;
}
</style>
