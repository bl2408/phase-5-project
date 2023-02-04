class RemoveTimestampsFromTaggable < ActiveRecord::Migration[7.0]
  def change
    remove_column :taggables, :created_at, :string
    remove_column :taggables, :updated_at, :string
  end
end
