class CreateRookooAgentReferences < ActiveRecord::Migration[7.0]
  def change
    create_table :rookoo_agent_references do |t|
      t.string :agent_id, null: false
      t.string :outgoing_url, null: false
      t.belongs_to :account

      t.timestamps
    end
  end
end
