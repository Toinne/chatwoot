import ApiClient from './ApiClient';

class RookooAgents extends ApiClient {
  constructor() {
    super('rookoo_agents', { accountScoped: true, apiVersion: 'v2' });
  }
}

export default new RookooAgents();
