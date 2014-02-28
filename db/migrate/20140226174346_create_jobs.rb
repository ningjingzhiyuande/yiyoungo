class CreateJobs < ActiveRecord::Migration
  def change
    create_table :jobs do |t|
      t.string :title
      t.integer :user_id
      t.integer :industry
      #t.integer :function_code
      t.integer :salary
     # t.integer :salary_end
      t.integer :job_experience
      t.integer :job_num
      t.timestamp :expired_at
      t.integer :education
      t.integer :view_count
      t.integer :city
      t.integer :job_kind
      t.boolean :is_recommend
      t.string  :organization_name #冗余字段
      t.integer :organize_id
      t.string :organize_type
      t.integer :status

      t.timestamps
    end
  end
end
