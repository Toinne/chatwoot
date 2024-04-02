<template>
  <agent-selector
    :title="agent.name"
    :src="agent.avatar"
    @click="onItemClick"
  />
</template>

<script>
import AgentSelector from './AgentSelector.vue';

export default {
  components: { AgentSelector },
  props: {
    agent: {
      type: Object,
      required: true,
    },
  },
  methods: {
    onItemClick() {
      this.$emit('agent-item-click', this.agent.id);
    },
  },
};
</script>

<style scoped lang="scss">
.inactive {
  img {
    filter: grayscale(100%);
  }

  &:hover {
    @apply border-transparent shadow-none cursor-not-allowed;
  }
}
</style>
