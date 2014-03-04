class CreateNews < ActiveRecord::Migration
  def change
    create_table :news do |t|
      t.string :title
      t.integer :user_id,    :null => false
    #  t.string  :resource_type,  :null => false
      t.integer :view_count,:default=>1
      t.integer :comment_count,:default=>0
      t.boolean :is_recommend
      t.string :image
      t.integer :status_id
      t.timestamps
    end
    #add_index :news, [:resource_type, :resource_id]
  end
end
