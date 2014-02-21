class News < ActiveRecord::Base
	has_one :content, :as => :resource, :dependent => :destroy
	accepts_nested_attributes_for :content
	mount_uploader :image, ImageUploader  
end
