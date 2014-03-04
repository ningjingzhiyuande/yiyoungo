ActiveAdmin.register News do
  #scope_to :current_user
  form :partial => "form"
 # belongs_to  :user
  
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
    column "发布者",:news_publisher
    column '标题',:title
    column '内容' do |news| 
    	             strip_tags(news.content.body)
                 end
    column "图片" do |news|
                     image_tag news.image_url
                  end
    column '是否推荐',:is_recommend

    default_actions
  end


   controller do
    def scoped_collection
      News.includes([:user,:content])
    end
    def create
      params[:news].merge!({ user_id: current_user.id })
      create!
    end
  end

  
end
