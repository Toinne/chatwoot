# frozen_string_literal: true
class RookooAgents::RookooAgentService
  def self.base_uri
    'http://172.21.0.5:5011'
  end

  def self.get(id)
    reference = RookooAgentReference.find(id)

    response = HTTParty.get(
      "#{self.base_uri}/agents/#{reference[:agent_id]}"
    )
    agent = JSON.parse(response.body)

    RookooAgent.from_reference(reference, agent.with_indifferent_access)
  end

  def self.destroy(id)
    reference = RookooAgentReference.find(id)

    HTTParty.delete(
      "#{self.base_uri}/agents/#{reference[:agent_id]}"
    )

    RookooAgentReference.destroy(id)

    return true
  end

  def self.all(account)
    references = RookooAgentReference.where(account_id: account.id)
    references = references.index_by(&:agent_id)

    ids = references.keys.join(";")

    print("#{self.base_uri}/agents/#{ids}")

    response = HTTParty.get(
      "#{self.base_uri}/agents/#{ids}"
    )
    agents = JSON.parse(response.body)

    agents.map do | agent |
      reference = references[agent["id"]]

      RookooAgent.from_reference(reference, agent.with_indifferent_access)
    end
  end

  def self.create(params)
    puts(self.class)

    response = HTTParty.post(
      "#{self.base_uri}/agents",
      headers: { 'Content-Type' => 'application/json' },
      body: {
        name: params[:name],
        description: params[:description],
        system_message: params[:system_message]
      }.to_json
    )

    agent_data = JSON.parse(response.body)
    account = Account.find(params[:account_id])

    # Save the reference and who owns it in the portal
    reference_data = {
      :agent_id => agent_data["id"],
      :account => account,
      :outgoing_url => self.class.base_uri
    }

    reference = RookooAgentReference.new(reference_data)
    reference.save

    RookooAgent.from_reference(reference, agent_data.with_indifferent_access)
  end
end
