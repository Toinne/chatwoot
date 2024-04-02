# frozen_string_literal: true
class RookooAgent
  attr_accessor :agent_id, :name

  def self.from_reference(reference, data)
    self.new(
      reference.id,
      reference.agent_id,
      data[:name],
      data[:description],
      data[:system_message]
    )
  end

  def initialize(id, agent_id, name, description, system_message)
    @id = id
    @agent_id = agent_id
    @name = name
    @description = description
    @system_message = system_message
    @avatar = avatar
  end

  def avatar
    'https://placehold.co/400x400'
  end
end
