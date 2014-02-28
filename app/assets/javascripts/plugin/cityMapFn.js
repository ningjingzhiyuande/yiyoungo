/*
 * Created with Sublime Text 2.
 * User: jason.wang
 * Date: 2013-06-26
 * Time: 16:26:22
 * Contact: wangzhiwei@tianji.com
 */

(function($){
	$.fn.msCityPlugin = function(options)
	{
	
		var defaults = {
			type:'city',
			check:'checkbox',
			maxCount:5,
			column:6,
			comData:[],
			init:[],
			name:'cityCode',
			defaultValue:'请选择地区',
			style:{
				"foldHeadWidth":"78px",
				"msCbComponent":"88px",
				"msOkWidth":"150px"
			},
			align:"left"
		};
		var msPick = $.extend(defaults, options);

		if(msPick.init.length>0)
		{
			msPick.defaultValue="";
		}

		var strInput = "<div class='ms-btn-component ms-btn-canhover'></div>"+
						"<div class='txt-box-component'>"+
						    "<input type='text' class='ms-txt-component' maxlengh='20' name='' value='"+msPick.defaultValue+"' />"+
						"</div>"+
						"<input type='hidden' class='ms_checkInput' value='' name='"+msPick.name+"' />";

		$(this).append($(strInput));

		msPick.structure ="";

		msPick.allData = {};
		
		msPick.listData = {};
		
		msPick.id="";

		switch(msPick.type)
		{
			case 'city':
			msPick.id = "msPickCity"+parseInt(Math.random()*1000000);
			msPick.tabName = "常用城市";
			msPick.structure ="<div class='ms-pick' id='"+msPick.id+"'>"+
								"<div class='ms-pick-nei'>"+
								    "<div class='w-h-tab-component'>"+
								        "<ul class='h-tab clearfix'>"+
								            "<li class='tab-menu-component'>按省市选择</li>"+
								        "</ul>"+
								    	"<a class='close-component' href='javascript:;'>删除</a>"+
								    "</div>"+
								    "<div class='c-tab'>"+
									    "<div class='tab-con-component tab-con-width' style='display:none'>"+
									        "<div class='ms-h3-component'>直辖市</div>"+
									            "<div class='hot-city'>"+
									            "</div>"+
									        "<div class='ms-h3-component' style='margin-top:10px;' >其它省市</div>"+
									            "<div class='otherAll'>"+
									            "</div>"+
									        "</div>"+
									    "</div>"+
								    "</div>"+
								    "<iframe border='0' frameborder='0' style='position: absolute; z-index: -1; left: 0px; top: 0px; width:100%; height:100%'></iframe>"+
								"</div>";
			
			msPick.allData = msPick.allDataMap.MapOne;
			msPick.listData = msPick.DataMap = msPick.allDataMap.MapTwo;
			msPick.hotData = msPick.allDataMap.HotMap;
			break;
		
		}


		$("body").append($(msPick.structure));
		

		
		var $this = $(this);

		msPublic(msPick,$this);

		return this;
	}

})(jQuery)