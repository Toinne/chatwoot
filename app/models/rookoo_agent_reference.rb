# == Schema Information
#
# Table name: rookoo_agent_references
#
#  id           :bigint           not null, primary key
#  outgoing_url :string           not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  account_id   :bigint
#  agent_id     :string           not null
#
# Indexes
#
#  index_rookoo_agent_references_on_account_id  (account_id)
#
class RookooAgentReference < ApplicationRecord
  validates :outgoing_url, presence: true
  validates :agent_id, presence: true

  belongs_to :account, optional: false
end
