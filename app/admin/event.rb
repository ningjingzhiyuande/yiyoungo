# -*- coding: utf-8 -*-
ActiveAdmin.register Event do
  #scope_to :current_user
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
    column "发布者" do |event|
    	              event.user.email
                  end
    column "活动标题",:title
    column "活动内容" do |event|
                       strip_tags(event.content.body)
                     end
    default_actions
  end

  controller do
    def scoped_collection
      Event.includes([:user,:content])
    end
    def create
      city = params["city"].split("-")[1]
      params[:event].merge!({ user_id: current_user.id,city: city })
      create!
    end
    def update
    	city = params["city"].split("-")[1]
        params[:event].merge!({ user_id: current_user.id,city: city })
        update!
    end
  end

  
end
