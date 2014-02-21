class CreateContents < ActiveRecord::Migration
  def change
    create_table :contents do |t|
      t.text :body
      t.string :resource_id,   :null => false
      t.string :resource_type, :null => false
      t.timestamps
    end
    add_index :contents, [:resource_type, :resource_id]
  end
end
