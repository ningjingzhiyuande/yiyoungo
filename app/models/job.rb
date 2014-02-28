class Job < ActiveRecord::Base
	has_one :content, :as => :resource, :dependent => :destroy
	accepts_nested_attributes_for :content
    JOB_KIND = {1=>"全职",2=>"兼职",3=>"不限"}
	SALARY={1=>"面议",2=>"1000以下",3=>"1000-2500",4=>"2500-4000",5=>"4000-6000",6=>"6000-8000",7=>"8000-12000",8=>"12000-20000",9=>"20000+"}
	JOB_EXPERIENCE = {1=>"不限",2=>"一年及以上", 3=>"两年及以上",4=>"三年及以上",5=>"四年及以上",6=>"五年及以上"}
    DEGREE = {1=>"大专以下",2=>"大专",3=>"本科" ,4=>"双学士",5=>"硕士",6=>"博士及博士后"}
end
