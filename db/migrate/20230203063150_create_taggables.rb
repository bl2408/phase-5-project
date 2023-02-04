class CreateTaggables < ActiveRecord::Migration[7.0]
  def change
    create_table :taggables do |t|
      t.references :tag, null: false, foreign_key: true
      t.boolean :visible
      t.references :target, polymorphic: true

      t.timestamps
    end
  end
end
