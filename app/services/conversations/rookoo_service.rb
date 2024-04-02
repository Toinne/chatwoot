# frozen_string_literal: true

class Conversations::RookooService

  # @param [Account] account
  # @param [User] user
  def initialize(account, user)
    @account = account
    @user = user
  end

  # @param [RookooAgent] rookoo_agent
  def initiate_conversation_with(rookoo_agent)
    # TODO: potentially extract to channel builder?
    channel = Channel::Api.find_by!(account_id: @account.id)
    channel ||= Channel::Api.create!(account: @account)

    return unless channel.inbox

    inbox = channel.inbox

    contact_inbox = ContactInboxWithContactBuilder.new(
      source_id: rookoo_agent.agent_id,
      inbox: inbox,
      contact_attributes: {
        name: rookoo_agent.name,
        avatar_url: rookoo_agent.avatar
      }
    ).perform

    additional_attributes = ActionController::Parameters.new({ type: 'rookoo' })

    conversation_data = {
      source_id: ULID.generate,
      status: 'open',
      assignee_id: @user.id,
      additional_attributes: additional_attributes
    }

    message_data = {
      'content': 'hi'
    }

    ConversationBuilder.new(params: conversation_data, contact_inbox: contact_inbox).perform
    # Messages::MessageBuilder.new(@user, conversation, message_data).perform
  end
end
