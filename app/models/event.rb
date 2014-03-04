class Event < ActiveRecord::Base
	has_one :content, :as => :resource, :dependent => :destroy
	accepts_nested_attributes_for :content
	belongs_to :user
	mount_uploader :image, EventImageUploader  
end
