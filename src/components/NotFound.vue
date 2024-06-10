<template>
  <div>
    <div class="background grid h-screen bg-white">
      <div
        class="place-self-center"
        data-cy="404"
      >
        <span class="mb-4 block text-center text-8xl font-bold text-gray-200">404</span>
        <p class="mb-4 block text-center text-gray-400">
          Sorry, this board does not exist
        </p>
        <router-link
          to="/"
          class="block text-center font-semibold text-blue7"
        >
          Go back home
        </router-link>
      </div>
    </div>
  </div>
</template>
