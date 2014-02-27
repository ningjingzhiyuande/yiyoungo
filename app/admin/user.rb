ActiveAdmin.register User do
  permit_params :email, :password, :password_confirmation,:role

  index do
    selectable_column
    id_column
    column '邮件',:email
    column :current_sign_in_at
    column :sign_in_count
    column :role
    column :created_at
    actions
  end

  filter :email
  filter :current_sign_in_at
  filter :sign_in_count
  filter :created_at

  form do |f|
    f.inputs "Admin Details" do
      f.input :email
      f.input :password
      f.input :password_confirmation
      f.input :role,:as=>:boolean,:label=>"管理员"
    end
    f.actions
  end
 

end
