ActiveAdmin.register User do
  permit_params :email, :password, :password_confirmation,:role
  index do
    selectable_column
    id_column
    column '邮件',:email
    column "角色",:role_name
    column :current_sign_in_at
    column :sign_in_count
    
    column :created_at
    actions :defaults=>false do |user|
               link_to (user.admin? ? '设置为普通用户' : '设置为管理员'), change_role_admin_user_path(user),method: "put"
            end
  end

  member_action "change_role",:method => :put  do
  	user = User.find params[:id]
    user.role=user.admin? ? 1 : 100
    user.save
    redirect_to :action=>:index ,:notice=>"设置成功"
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
