require 'rails_helper'

describe Conversations::RookooService do

  describe '#initialize' do
    it 'initializes with an account and user' do
      account = create(:account)
      user = create(:user)

      service = Conversations::RookooService.new(account, user)

      expect(service.instance_variable_get(:@account)).to eq(account)
      expect(service.instance_variable_get(:@user)).to eq(user)
    end
  end

  describe '#initiate_conversation_with' do
    let(:account) { create(:account) }

    let(:user) { create(:user) }
    let(:rookoo_agent) { build(:rookoo_agent) }
    let(:service) { Conversations::RookooService.new(account, user) }

    context 'when a Channel::Api exists for the account' do
      before do
        @channel = create(:channel_api, account: account)
      end
      it 'creates a conversation' do
        expect {
          service.initiate_conversation_with(rookoo_agent)
        }.to change(Conversation, :count).by(1)
      end
    end
  end
end
