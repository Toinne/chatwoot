<template>
  <div
    class="flex flex-1 h-full justify-between flex-col m-0 bg-slate-25 dark:bg-slate-900 overflow-auto"
  >
    <div>
      <!--   HEADER   -->
    </div>
    <div
      class="border border-slate-25 dark:border-slate-800/60 bg-white dark:bg-slate-900 h-full p-6 w-full max-w-full flex-shrink-0 flex-grow-0"
    >
      <page-header
        :header-title="$t('CREATE_CONVERSATION.SELECT_ROOKOO_AGENT')"
      />
      <div class="mt-6 mx-0 flex flex-wrap">
        <agent-item
          v-for="agent in rookooAgents"
          :key="agent.id"
          :agent="agent"
          @agent-item-click="createRookooConversation"
        />
        <agent-create @click="createNewAgent" />
      </div>
    </div>
  </div>
</template>

<script>
import AgentItem from './AgentItem.vue';
import PageHeader from './PageHeader.vue';
import { mapGetters } from 'vuex';
import globalConfigMixin from 'shared/mixins/globalConfigMixin';
import AgentCreate from './AgentCreate.vue';
import { INBOX_EVENTS } from '../../../helper/AnalyticsHelper/events';

export default {
  components: {
    AgentCreate,
    AgentItem,
    PageHeader,
  },
  mixins: [globalConfigMixin],
  data() {
    return {};
  },
  computed: {
    account() {
      return this.$store.getters['accounts/getAccount'](this.accountId);
    },
    ...mapGetters({
      accountId: 'getCurrentAccountId',
      globalConfig: 'globalConfig/get',
      rookooAgents: 'rookooAgents/getRookooAgents',
    }),
  },
  mounted() {
    this.fetchRookooAgents();
  },
  methods: {
    async fetchRookooAgents() {
      this.$store.dispatch('rookooAgents/get');
    },
    async createRookooConversation(rookooReferenceId) {
      if (rookooReferenceId) {
        try {
          const conversation = await this.$store.dispatch(
            'createRookooConversation',
            {
              rookooReferenceId: rookooReferenceId,
            }
          );
          this.$router.push({
            name: 'inbox_conversation',
            params: {
              conversationId: conversation.display_id,
              accountId: this.accountId,
              conversation_id: conversation.display_id,
              account_id: this.accountId,
            },
          });
          this.$track(INBOX_EVENTS.CREATE_NEW_ROOKOO_CONVERSATION, {
            locale: this.locale,
          });
        } catch (error) {
          this.alertMessage =
            error?.message || this.$t('CREATE_CONVERSATION.API_ERROR');
          this.showAlert(this.alertMessage);
        }
      }
    },
    async createNewAgent() {
      this.showAlert('Not implemented');
    },
  },
};
</script>
