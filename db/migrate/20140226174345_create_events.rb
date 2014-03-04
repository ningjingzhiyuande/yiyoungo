class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.string :title
      t.integer :user_id
      t.integer :view_count
      t.integer :city
      t.string :address
      t.string  :expense
      t.timestamp :start_at
      t.timestamp :end_at
      t.boolean :is_recommend
      t.string :image
      t.integer :participant_count
      t.string  :organization_name #冗余字段
      t.integer :organize_id
      t.string :organize_type
      t.integer :status


      t.timestamps
    end
  end
end
