<template>
  <div
    class="fixed left-0 top-0 z-40 flex h-full w-full items-center justify-center bg-backdrop"
    data-cy="card-detail-backdrop"
    @click.self="
      showCardModule(activeCard.id, false);
      router.push(router.currentRoute.value.path);
    "
  >
    <div
      class="bg-gray2"
      data-cy="card-detail"
    >
      <div>
        <div class="mb-4 ml-9">
          <div class="inline-block">
            <Board />
          </div>
          <input
            v-model="activeCard.name"
            v-click-away="clickAwayCardName"
            data-cy="card-detail-title"
            @focus="
              selectInput($event);
              cardNameInputActive = true;
            "
            @change="patchCard(activeCard, { name: activeCard.name })"
            @keyup.enter="
              blurInput($event);
              cardNameInputActive = false;
            "
            @keyup.esc="
              blurInput($event);
              cardNameInputActive = false;
            "
          >
          <h2>
            in list <span
              class="underline"
              data-cy="card-list-name"
            >{{ cardListName }}</span>
          </h2>
        </div>
        <div class="mb-4 ml-9">
          <h2>DUE DATE</h2>
          <div>
            <Checkbox :card="activeCard" />
            <h2>
              {{ new Date(activeCard.deadline).toDateString() }}
              <div v-show="activeCard.completed">
                COMPLETED
              </div>
              <button
                data-cy="calendar-dropdown"
                @click="showDate = true"
              >
                <Downarrow class="inline-block w-5 cursor-pointer fill-current stroke-current py-2 pl-2 text-gray-800" />
              </button>
            </h2>
            <div
              v-if="showDate"
              class="absolute"
            >
              <Datepicker
                v-model="date"
                v-click-away="clickAwayDate"
                inline
                auto-apply
                :enable-time-picker="false"
                data-cy="card-detail-deadline"
                @update:model-value="updateDate"
              >
                <template #day="{ day }">
                  <div data-cy="day">
                    {{ day }}
                  </div>
                </template>
                <template #month="{ text }">
                  <div data-cy="header-month">
                    {{ text }}
                  </div>
                </template>
                <template #month-overlay="{ text }">
                  <div data-cy="month">
                    {{ text }}
                  </div>
                </template>
                <template #year="{ year }">
                  <div data-cy="header-year">
                    {{ year }}
                  </div>
                </template>
                <template #year-overlay="{ text }">
                  <div data-cy="year">
                    {{ text }}
                  </div>
                </template>
              </Datepicker>
            </div>
          </div>
        </div>
        <div class="mb-4 ml-9">
          <div class="inline-block">
            <Description />
          </div>
          <h1 class="mb-4 inline-block text-lg font-semibold text-black">
            Description
          </h1>
          <textarea
            v-model="activeCard.description"
            class="h-36 w-full resize-none p-3"
            data-cy="card-description"
            @focus="
              selectInput($event);
              descriptionInputActive = true;
            "
            @change="patchCard(activeCard, { description: activeCard.description })"
            @keydown.enter="
              blurInput($event);
              descriptionInputActive = false;
            "
            @keyup.esc="
              blurInput($event);
              descriptionInputActive = false;
            "
          />
        </div>
        <div class="mb-4 ml-9">
          <div class="inline-block">
            <Attachment />
          </div>
          <h1 class="mb-4 inline-block text-lg font-semibold text-black">
            Image
          </h1>
          <div
            v-if="activeCard.image"
            class="grid grid-cols-6 gap-x-4"
            data-cy="image-attachment"
          >
            <div class="col-span-2 row-span-2">
              <img :src="'/backend' + activeCard.image">
            </div>
            <div class="col-span-4 font-bold">
              {{ activeCard.image.replace(`/data/uploaded/${activeCard.id}_`, '') }}
              <a
                class="block cursor-pointer font-normal underline"
                data-cy="image-delete"
                :href="'/backend' + activeCard.image"
                download
              >
                <Download class="mb-1 inline-block w-4" />Download
              </a>
              <div
                class="block cursor-pointer font-normal underline"
                data-cy="image-delete"
                @click="patchCard(activeCard, { image: null })"
              >
                <Cross class="mb-1 inline-block w-4" />Delete
              </div>
            </div>
          </div>
          <Dropzone
            v-else
            :card="activeCard"
          />
        </div>
      </div>
      <div class="col-span-2 grid content-start gap-y-2">
        <div class="grid h-8 w-8 cursor-pointer place-content-center place-self-end self-end hover:bg-gray5">
          <Cross
            class="h-6 w-6 fill-current text-gray-600"
            @click="
              showCardModule(activeCard.id, false);
              router.push(router.currentRoute.value.path);
            "
          />
        </div>
        <div
          class="cursor-pointer rounded-sm bg-gray3 px-2 py-0.5 text-sm text-gray-600 hover:bg-gray5"
          data-cy="calendar-button"
          @click="showDate = true"
        >
          <Clock class="mb-0.5 mr-2 inline-block w-4" />Due date
        </div>
        <div
          class="cursor-pointer rounded-sm bg-gray3 px-2 py-0.5 text-sm text-gray-600 hover:bg-gray5"
          data-cy="copy-properties"
          @click="copyProperties(activeCard)"
        >
          <Copy class="mb-0.5 mr-2 inline-block w-4" />Copy attributes
        </div>
        <div
          class="cursor-pointer rounded-sm bg-gray3 px-2 py-0.5 text-sm text-gray-600 hover:bg-gray5"
          data-cy="card-detail-delete"
          @click="
            deleteCard(activeCard);
            router.push(router.currentRoute.value.path);
          "
        >
          <Trash class="mb-0.5 mr-2 inline-block w-4" />Delete card
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { blurInput } from '@/utils/blurInput';
import { ref, onMounted } from 'vue';
import { selectInput } from '@/utils/selectInput';
import { useStore } from '@/store/store';
import Attachment from '@/assets/icons/attachment.svg';
import Board from '@/assets/icons/board.svg';
import Card from '@/typings/card';
import Checkbox from '@/components/Checkbox.vue';
import Clock from '@/assets/icons/clock.svg';
import Copy from '@/assets/icons/copy.svg';
import Cross from '@/assets/icons/cross.svg';
import Download from '@/assets/icons/download.svg';
import Description from '@/assets/icons/description.svg';
import Downarrow from '@/assets/icons/downarrow.svg';
import Dropzone from '../Dropzone.vue';
import List from '@/typings/list';
import Trash from '@/assets/icons/trash.svg';
import moment from 'moment';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const router = useRouter();
const { showNotification, showCardModule, patchCard, deleteCard } = useStore();
const { lists, activeCard } = storeToRefs(useStore());
const cardListName = lists.value.find((l: List) => l.id === activeCard.value.listId)!['name'];

const showDate = ref(false);
const cardNameInputActive = ref(false);
const descriptionInputActive = ref(false);
const date = ref(new Date());

const clickAwayCardName = () => {
  cardNameInputActive.value = false;
};
const clickAwayDate = () => {
  showDate.value = false;
};

const updateDate = (data: string) => {
  const formattedDate = moment(data).format('YYYY-MM-DD');
  patchCard(activeCard.value, { deadline: formattedDate });
  showDate.value = false;
};

const copyProperties = (content: Card) => {
  const clipBoardValue = JSON.stringify(content, null, 2);
  const clipboard = window.navigator.clipboard;
  showNotification('Card info copied to clipboard', false);
  return clipboard.writeText(clipBoardValue);
};

onMounted(() => {
  router.push(`${router.currentRoute.value.path}?card=${activeCard.value.id}`);
});
</script>
