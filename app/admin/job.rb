# -*- coding: utf-8 -*-
ActiveAdmin.register Job do
  #scope_to :current_user
  form :partial => "form"
  #breadcrumb do
  #      [
  #        link_to("My account", events_path(current_user)),"tianji"
  #      ]
  #    end
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
    column "发布者" do |job|
    	job.user.email
    end
    column "地点" ,:city

    column "职位" ,"title"
    column "薪资" do |job|
           Job::SALARY[job.salary]
    end
    column "职位种类" do |job|
           Job::JOB_KIND[job.job_kind]
    end

   
    default_actions
  end

  controller do
    def scoped_collection
      Job.includes([:user,:content])
    end
    def create
      city = params["city"].split("-")[1]
      params[:job].merge!({ user_id: current_user.id ,city: city})
      create!
    end
    def update
    	city = params["city"].split("-")[1]
        params[:job].merge!({ user_id: current_user.id,city: city })
        update!
    end
  end
  
end
