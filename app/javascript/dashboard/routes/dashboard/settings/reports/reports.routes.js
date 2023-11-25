import { frontendURL } from '../../../../helper/URLHelper';

const SettingsContent = () => import('../Wrapper.vue');
const Index = () => import('./Index.vue');
const AgentReports = () => import('./AgentReports.vue');
const LabelReports = () => import('./LabelReports.vue');
const InboxReports = () => import('./InboxReports.vue');
const TeamReports = () => import('./TeamReports.vue');
const CsatResponses = () => import('./CsatResponses.vue');
const LiveReports = () => import('./LiveReports.vue');

export default {
  routes: [
    {
      path: frontendURL('accounts/:accountId/reports'),
      component: SettingsContent,
      props: {
        headerTitle: 'OVERVIEW_REPORTS.HEADER',
        icon: 'arrow-trending-lines',
        keepAlive: false,
      },
      children: [
        {
          path: '',
          redirect: 'overview',
        },
        {
          path: 'overview',
          name: 'account_overview_reports',
          roles: ['administrator'],
          component: LiveReports,
        },
      ],
    },
    {
      path: frontendURL('accounts/:accountId/reports'),
      component: SettingsContent,
      props: {
        headerTitle: 'REPORT.HEADER',
        icon: 'chat',
        keepAlive: false,
      },
      children: [
        {
          path: 'conversation',
          name: 'conversation_reports',
          roles: ['administrator'],
          component: Index,
        },
      ],
    },
    {
      path: frontendURL('accounts/:accountId/reports'),
      component: SettingsContent,
      props: {
        headerTitle: 'CSAT_REPORTS.HEADER',
        icon: 'emoji',
        keepAlive: false,
      },
      children: [
        {
          path: 'csat',
          name: 'csat_reports',
          roles: ['administrator'],
          component: CsatResponses,
        },
      ],
    },
    {
      path: frontendURL('accounts/:accountId/reports'),
      component: SettingsContent,
      props: {
        headerTitle: 'AGENT_REPORTS.HEADER',
        icon: 'people',
        keepAlive: false,
      },
      children: [
        {
          path: 'agent',
          name: 'agent_reports',
          roles: ['administrator'],
          component: AgentReports,
        },
      ],
    },
    {
      path: frontendURL('accounts/:accountId/reports'),
      component: SettingsContent,
      props: {
        headerTitle: 'LABEL_REPORTS.HEADER',
        icon: 'tag',
        keepAlive: false,
      },
      children: [
        {
          path: 'label',
          name: 'label_reports',
          roles: ['administrator'],
          component: LabelReports,
        },
      ],
    },
    {
      path: frontendURL('accounts/:accountId/reports'),
      component: SettingsContent,
      props: {
        headerTitle: 'INBOX_REPORTS.HEADER',
        icon: 'mail-inbox-all',
        keepAlive: false,
      },
      children: [
        {
          path: 'inboxes',
          name: 'inbox_reports',
          roles: ['administrator'],
          component: InboxReports,
        },
      ],
    },
    {
      path: frontendURL('accounts/:accountId/reports'),
      component: SettingsContent,
      props: {
        headerTitle: 'TEAM_REPORTS.HEADER',
        icon: 'people-team',
      },
      children: [
        {
          path: 'teams',
          name: 'team_reports',
          roles: ['administrator'],
          component: TeamReports,
        },
      ],
    },
  ],
};
