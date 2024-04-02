<template>
  <div class="flex flex-col w-full items-start">
    <h2
      class="text-xl font-medium mb-1 text-slate-800 dark:text-slate-100 break-words"
    >
      {{ headerTitle }}
    </h2>
  </div>
</template>

<script>
export default {
  props: {
    headerTitle: { type: String, default: '' },
  },
};
</script>
