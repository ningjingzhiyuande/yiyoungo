ActiveAdmin.register News do
  form :partial => "form"
  
  # See permitted parameters documentation:
  # https://github.com/gregbell/active_admin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # permit_params :list, :of, :attributes, :on, :model
  #
  # or
  #
  # permit_params do
  #  permitted = [:permitted, :attributes]
  #  permitted << :other if resource.something?
  #  permitted
  # end
  index :download_links => false do 
  	selectable_column
    id_column
    column '标题',:title
    column '是否推荐',:is_recommend

    default_actions
  end

  
end
