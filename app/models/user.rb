class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :news,:dependent=>:destroy
  has_many :events,:dependent=>:destroy


   def admin?
       role==100
   end

   def role_name
     role==1 ? "普通用户" : "管理员"
   end
end
