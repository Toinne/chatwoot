FactoryBot.define do
  factory :rookoo_agent do
    id { 1 }
    agent_id { 'MyString' }
    name { 'MyString' }
    description { 'MyString' }
    system_message { 'MyString' }
    initialize_with { new(id, agent_id, name, description, system_message) }
  end
end
