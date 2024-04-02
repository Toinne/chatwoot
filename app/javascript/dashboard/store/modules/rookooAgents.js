import Vue from 'vue';
import * as MutationHelpers from 'shared/helpers/vuex/mutationHelpers';
import types from '../mutation-types';
import InboxesAPI from '../../api/inboxes';
import { throwErrorMessage } from '../utils/api';
import RookooAgentsAPI from '../../api/rookooAgents';

export const state = {
  records: [],
  uiFlags: {
    isFetching: false,
    isFetchingItem: false,
    isCreating: false,
    isDeleting: false,
    isUpdating: false,
    isFetchingRookooAgents: false,
    isSettingRookooAgent: false,
    isDisconnecting: false,
  },
  agentBotInbox: {},
};

export const getters = {
  getRookooAgents($state) {
    return $state.records;
  },
  getUIFlags($state) {
    return $state.uiFlags;
  },
  getRookooAgent: $state => rookooAgentId => {
    const [bot] = $state.records.filter(
      record => record.id === Number(rookooAgentId)
    );
    return bot || {};
  },
  getActiveRookooAgent: $state => inboxId => {
    const associatedAgentBotId = $state.agentBotInbox[Number(inboxId)];
    return getters.getBot($state)(associatedAgentBotId);
  },
};

export const actions = {
  get: async ({ commit }) => {
    commit(types.SET_ROOKOO_AGENT_UI_FLAG, { isFetching: true });
    try {
      const response = await RookooAgentsAPI.get();
      commit(types.SET_ROOKOO_AGENTS, response.data);
    } catch (error) {
      // Ignore error
    } finally {
      commit(types.SET_ROOKOO_AGENT_UI_FLAG, { isFetching: false });
    }
  },
  create: async ({ commit }, agentBotObj) => {
    commit(types.SET_ROOKOO_AGENT_UI_FLAG, { isCreating: true });
    try {
      const response = await RookooAgentsAPI.create(agentBotObj);
      commit(types.ADD_ROOKOO_AGENT, response.data);
      return response.data;
    } catch (error) {
      throwErrorMessage(error);
    } finally {
      commit(types.SET_ROOKOO_AGENT_UI_FLAG, { isCreating: false });
    }
    return null;
  },
  update: async ({ commit }, { id, ...agentBotObj }) => {
    commit(types.SET_ROOKOO_AGENT_UI_FLAG, { isUpdating: true });
    try {
      const response = await RookooAgentsAPI.update(id, agentBotObj);
      commit(types.EDIT_AGENT_BOT, response.data);
    } catch (error) {
      throwErrorMessage(error);
    } finally {
      commit(types.SET_ROOKOO_AGENT_UI_FLAG, { isUpdating: false });
    }
  },
  delete: async ({ commit }, id) => {
    commit(types.SET_ROOKOO_AGENTS, { isDeleting: true });
    try {
      await RookooAgentsAPI.delete(id);
      commit(types.DELETE_ROOKOO_AGENT, id);
    } catch (error) {
      throwErrorMessage(error);
    } finally {
      commit(types.SET_ROOKOO_AGENT_UI_FLAG, { isDeleting: false });
    }
  },
  show: async ({ commit }, id) => {
    commit(types.SET_ROOKOO_AGENT_UI_FLAG, { isFetchingItem: true });
    try {
      const { data } = await RookooAgentsAPI.show(id);
      commit(types.ADD_ROOKOO_AGENT, data);
    } catch (error) {
      throwErrorMessage(error);
    } finally {
      commit(types.SET_ROOKOO_AGENT_UI_FLAG, { isFetchingItem: false });
    }
  },

  fetchAgentBotInbox: async ({ commit }, inboxId) => {
    commit(types.SET_ROOKOO_AGENT_UI_FLAG, { isFetchingAgentBot: true });
    try {
      const { data } = await InboxesAPI.getAgentBot(inboxId);
      const { agent_bot: agentBot = {} } = data || {};
      commit(types.SET_ROOKOO_AGENT_INBOX, {
        agentBotId: agentBot.id,
        inboxId,
      });
    } catch (error) {
      throwErrorMessage(error);
    } finally {
      commit(types.SET_ROOKOO_AGENT_UI_FLAG, { isFetchingAgentBot: false });
    }
  },

  setAgentBotInbox: async ({ commit }, { inboxId, botId }) => {
    commit(types.SET_ROOKOO_AGENT_UI_FLAG, { isSettingAgentBot: true });
    try {
      await InboxesAPI.setAgentBot(inboxId, botId);
      commit(types.SET_ROOKOO_AGENT_INBOX, { agentBotId: botId, inboxId });
    } catch (error) {
      throwErrorMessage(error);
    } finally {
      commit(types.SET_ROOKOO_AGENT_UI_FLAG, { isSettingAgentBot: false });
    }
  },

  disconnectBot: async ({ commit }, { inboxId }) => {
    commit(types.SET_ROOKOO_AGENT_UI_FLAG, { isDisconnecting: true });
    try {
      await InboxesAPI.setAgentBot(inboxId, null);
      commit(types.SET_ROOKOO_AGENT_INBOX, { agentBotId: '', inboxId });
    } catch (error) {
      throwErrorMessage(error);
    } finally {
      commit(types.SET_ROOKOO_AGENT_UI_FLAG, { isDisconnecting: false });
    }
  },
};

export const mutations = {
  [types.SET_ROOKOO_AGENT_UI_FLAG]($state, data) {
    $state.uiFlags = {
      ...$state.uiFlags,
      ...data,
    };
  },
  [types.ADD_ROOKOO_AGENT]: MutationHelpers.setSingleRecord,
  [types.SET_ROOKOO_AGENTS]: MutationHelpers.set,
  [types.EDIT_ROOKOO_AGENT]: MutationHelpers.update,
  [types.DELETE_ROOKOO_AGENT]: MutationHelpers.destroy,
  [types.SET_ROOKOO_AGENT_INBOX]($state, { agentBotId, inboxId }) {
    Vue.set($state.agentBotInbox, inboxId, agentBotId);
  },
};

export default {
  namespaced: true,
  actions,
  state,
  getters,
  mutations,
};
