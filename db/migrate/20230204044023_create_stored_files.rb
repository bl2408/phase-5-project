class CreateStoredFiles < ActiveRecord::Migration[7.0]
  def change
    create_table :stored_files do |t|
      t.string :alt_text
      t.references :collection, null: false, foreign_key: true

      t.timestamps
    end
  end
end
