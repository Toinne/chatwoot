require 'rubygems/package'

namespace :anthony do
  task create_rookoo_conversation: :environment do

    account = Account.find(1)
    user = User.find(1)
    rookoo_agent = RookooAgents::RookooAgentService.get(10)

    service = Conversations::RookooService.new(
      account,
      user
    )
    service.initiate_conversation_with(rookoo_agent)
  end
end
