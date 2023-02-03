class CreateCategories < ActiveRecord::Migration[7.0]
  def change
    create_table :categories do |t|
      t.string :label
      t.string :description
      t.string :slug

      t.timestamps
    end
  end
end
