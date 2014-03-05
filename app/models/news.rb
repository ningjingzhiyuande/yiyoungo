# -*- coding: utf-8 -*-
class News < ActiveRecord::Base
	has_one :content, :as => :resource, :dependent => :destroy
	accepts_nested_attributes_for :content
	belongs_to :user

	mount_uploader :image, ImageUploader  
	validates  :title, :content ,:user_id,presence: true 
   def news_publisher
      user.email
   end
end
