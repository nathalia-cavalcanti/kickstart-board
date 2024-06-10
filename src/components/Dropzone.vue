<template>
  <div
    class="h-40 w-full border-4 border-dashed border-gray-400"
    data-cy="upload-image"
    :class="isDragActive && 'border-gray-800'"
    accept="image/png, image/jpeg, application/pdf"
    @dragenter.prevent="dragActive"
    @dragleave.prevent="dragInactive"
    @dragover.prevent
    @drop.prevent="drop"
  >
    <div class="grid h-32 min-h-full w-full items-center justify-center">
      <Dropicon
        class="w-48 place-self-end fill-current text-gray-400"
        :class="isDragActive && 'fill-current text-gray-800'"
      />
      <div
        class="min-w-min text-center text-gray-400"
        :class="isDragActive && 'text-gray-800'"
      >
        {{ isDragActive ? 'Release to upload...' : 'Drag and drop here or' }}
      </div>
      <label
        for="dropzoneFile"
        class="mt-2 cursor-pointer place-self-center self-start bg-gray-400 px-3 py-1.5 text-gray1"
        :class="isDragActive && 'bg-gray-800'"
      >select file</label>
    </div>
    <input
      id="dropzoneFile"
      type="file"
      class="hidden"
      accept="image/png, image/jpeg, application/pdf"
      @input="upload"
    >
  </div>
</template>

<script setup lang="ts">
import { PropType, ref } from 'vue';
import { useStore } from '@/store/store';
import Card from '@/typings/card';
import Dropicon from '@/assets/icons/dropicon.svg';
defineProps({
  card: {
    default: null,
    type: Object as PropType<Card>,
  },
});
const { uploadFile } = useStore();
const activeCard = useStore().activeCard;
const isDragActive = ref(false);

const dragActive = () => {
  isDragActive.value = true;
};

const dragInactive = () => {
  isDragActive.value = false;
};
const drop = (e: any) => {
  const acceptedFile = e.dataTransfer.files[0];
  uploadFile(activeCard, acceptedFile);
  dragInactive();
};

const upload = (e: any) => {
  const acceptedFile = e.target.files[0];
  uploadFile(activeCard, acceptedFile);
};
</script>
