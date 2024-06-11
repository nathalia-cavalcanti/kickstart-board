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
      @keydown.enter.prevent="onSubmit"
      @keyup.esc.prevent="
        emit('cancel');
        cardTitle = '';
      "
    />
    <div>
      <SaveButton
        buttontext="Add card"
        @click="onSubmit"
      />
      <Cross
        data-cy="cancel"
        class="order-last mx-0.5 inline-block h-8 w-8 fill-current p-1 text-gray-600"
        @click.stop="
          emit('cancel');
          cardTitle = '';
        "
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Cross from '@/assets/icons/cross.svg';
import SaveButton from '@/components/SaveButton.vue';

const emit = defineEmits(['cancel', 'submit']);

const cardCreate = ref();
let cardTitle = ref('');

const onSubmit = async () => {
  await emit('submit', cardTitle.value)
  cardTitle.value = '';
};

const onClickAway = () => {
  emit('cancel');
  cardTitle.value = '';
};

onMounted(() => {
  cardCreate.value.focus();
});
</script>
