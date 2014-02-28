/*
 * Created with Sublime Text 2.
 * User: jason.wang
 * Date: 2013-06-26
 * Time: 16:26:22
 * base jquery1.7.2.js underscore.js
 * Contact: wangzhiwei@tianji.com
 */


/**
 * [ 为行业、城市、职能的公共函数]
 * @param  {[type:Object]} msPick [description:此对象拥有外部一切为其配置的属性]
 * @param  {[type:jqueryObject]} $this  [description:此对象是这个自定义的文本框]
 */
var msPublic = function (msPick,$this)
{
	/**
	 * [创建DOM元素]
	 */
	msPick.createDom = function()
	{
		/*常用*/
		var _this = this;
		if(this.comData.length>0)
		{

			var comStr="";
			switch(this.type)
			{
				case "city":
					_.each(this.comData,function(name){

						var code = msPick.DataMap[name];
						comStr += "<label class='ms-cb-component' style='width:"+_this.style.msCbComponent+"'><input type="+_this.check+" name='"+_this.type+"com' class='ms-cb-cb' value="+code+" ms-cb-data="+code+" />"+name+"</label>";

					});
					break;

				case "job":
					_.each(this.comData,function(value){
	
						comStr += "<label class='ms-cb-component' style='width:"+_this.style.msCbComponent+"'><input type="+_this.check+" name='"+_this.type+"com' class='ms-cb-cb' value="+value+" ms-cb-data="+value+" />"+msPick.allData[value]+"</label>";
					
					})
					break;

				default:
					_.each(this.comData,function(value){
						var name = msPick.getName(value);
						comStr += "<label class='ms-cb-component' style='width:"+_this.style.msCbComponent+"'><input type="+_this.check+" name='"+_this.type+"com' class='ms-cb-cb' value="+value+" ms-cb-data="+value+" />"+name+"</label>";
					
					})
					break;
			}
		    var comStrTabCon = "<div class='tab-con-component'>"+
								    "<div class='common'>"+comStr+"</div>"+
								"</div>";
			
			$("<li class='tab-menu-component active'>"+msPick.tabName+"</li>").insertBefore($("#"+this.id).find(".tab-menu-component"))
			$(comStrTabCon).insertBefore($("#"+this.id).find(".tab-con-component"));
			
		}
		else
		{

			$("#"+this.id).find(".tab-con-component").show();
			$("#"+this.id).css("width","570px")
		}
		
		/*热门*/
		if(this.hotData)
		{
			var hotStr="";

			_.each(this.hotData,function(code,name){

				hotStr += "<label class='ms-cb-component' style='width:"+_this.style.msCbComponent+"'><input type="+_this.check+" name='"+_this.type+"hot' class='ms-cb-cb' value="+code+" ms-cb-data="+code+" />"+name+"</label>";
			
			})

		    $("#"+this.id).find(".hot-city").append($(hotStr));
		}

		/*其它*/
		if(this.allData)
		{
			var allCityTopStr = "";
			if(this.type == "job")
			{
				_.each(this.allData,function(value,key){
	
						allCityTopStr += "<label class='ms-cb-component' style='width:"+_this.style.msCbComponent+"'><input type="+_this.check+" name='"+_this.type+"otherAll' class='ms-cb-cb' value="+key+" ms-cb-data="+key+" />"+value+"</label>";
					
				})
			}
			else
			{
				var i=1;
				var arr = [];

				for (var k in msPick.allData){

				    if (msPick.allData.hasOwnProperty(k)){

				        if(i%this.column-1 == 0)
				        {
				           arr.push({});
				        }

				        arr[ Math.ceil(i/this.column)-1 ][k] = msPick.allData[k];

				        i++;
				    }
				}

				for(var i=0,len=arr.length;i<len;i++)
				{
					
					var  _allCityTopStr = "";

					_.each(arr[i],function(value,key){

						_allCityTopStr += "<span style='width:"+_this.style.foldHeadWidth+"'><label code='"+key+"'>"+value+"</label></span>";
					
					})

					allCityTopStr += "<div class='foldable'><div class='fold-head-component'>"+_allCityTopStr+"</div><div class='fold-con-component'></div></div>";
				}
				
			}
			
			$("#"+this.id).find(".otherAll").append($(allCityTopStr));
		}

		//把id属性设为全局,以方便后面使用。
		msPick.createDiv = $("#"+this.id);
	}

	msPick.createDom();
	/**
	 * [ 为解决IE6 select遮挡问题 给隐藏iframe设置宽高]
	 */
	msPick.iframeWH = function()
	{
		var msPickWidth = $("#"+this.id).width();
		var msPickHeight = $("#"+this.id).height();
		$("#"+this.id).find("iframe").css({"width":msPickWidth,"height":msPickHeight});

	}
	/**
	 * [ 对city的默认值做单独处理]
	 * @return {[type:Array]} [description:因为city传的是城市名,我们为了保证和下面统一都是code,所以此处找到对应code存入数组]
	 */
	var defaultValue = function()
	{
		var arr = [];
		switch(msPick.type)
		{
			case "city":
				_.each(msPick.init,function(obj){

					arr.push(msPick.DataMap[obj]);

				})
				break;
			default :
				arr = msPick.init;
				break;
		}
		return arr;

	};
	
	var conf={
		index:0,//下拉列表索引值
		keyArray:[13,38,40],//建盘功能键keyCode
		selectLenght:0,//选中的长度
		aMsCb:[],//下拉里面所有复选框/单选框
		msCheckInputArr:defaultValue(),//隐藏input值的数组。
		max:8//设置下拉列表最多显示数据条数。
	}

	/**
	 * [根据默认值来，设置单选/多选的选中状态]
	 */
	var addDefaultFn = function()
	{
		conf.aMsCb = msPick.createDiv.find(".ms-cb-cb");
		
    	_.each(conf.msCheckInputArr,function(obj){

    		_.each(conf.aMsCb,function(obj_){

    			if(obj==obj_.value)
    			{
    				obj_.checked = true;
    			}

    		})
    	})

	}
	/**
	 * [根据默认值创建a标签,设置隐藏input的值]
	 */
	msPick.addDefault = function()
	{
		var _this = this;
		if(this.init.length>0)
		{	
			var strA ="";
			var codeArr=conf.msCheckInputArr;
			var tempArr = [];
			_.each(codeArr,function(value){
				
				var name = "";
				var code = "";
				switch(_this.type)
				{
					case "city":
						name = value.split("-")[2];
						code = value;
						break;
					case "job":
						code = value;
						name = msPick.listData[code];
						break;
					default:
						name = msPick.getName(value);
						code = value;
						break;
				}
				tempArr.push(code);
				strA += "<span class='ms-selected-item' rel="+code+">"+
	                "<span class='text'>"+name+"</span>"+
	                "<span class='delete-component'>删除</span></span>";
	
			})

			switch(this.type)
			{
				case "city":
					
					$this.find(".ms_checkInput").val(tempArr.join(","));
					break;
				case "job":
					
					$this.find(".ms_checkInput").val(codeArr.join(","));
					break;
				default:
					
					$this.find(".ms_checkInput").val(codeArr.join(","));
					break;
			}

			$(strA).insertBefore($this.find(".ms-txt-component"));
			
			addDefaultFn()

		}
       
	}

	msPick.addDefault();

	/**
	 * [ 设置msPick框整体的位置,可根据最外层传参数来设置对齐方式]
	 */
	msPick.mpPosition = function()
    {
    	var left = $this.offset().left;
        var top = $this.find(".ms-txt-component").offset().top+25;
         
        switch(this.align)
        {
        	case "left":
        		this.createDiv.css({"left":left,"top":top});
        		break;
        	case "right":
        		left = left-(parseInt(this.createDiv.css("width"))-$this.outerWidth()+2);
        		this.createDiv.css({"left":left,"top":top});
        		break;
        }
        
    };

	var $txtBox = $this.find(".txt-box-component");
	var $msTxt = $this.find(".ms-txt-component");

	/**
	 * [ 所有对文本框的操作，手输和删除]
	 */
	msPick.txt = function()
	{
		var _this = this;		
		/**
		 * [ 所有的手输操作]
		 */
		$msTxt.on("keyup",function(event){

    		var keyWords = $(this).val();
	        var aResult = [];//构建li所存的过滤出来的一个json。
	        var strLi="";//构建li时拼li的字符串。
	        var str="";//存放msok/mserror字符串
	        var $msOk = $("body").find(".ms-ok-component");
	        var $msError = $("body").find(".ms-error-component");

	        var strA = "";
	        var bKey = false; //判断输入内容是否为功能键
	        for(var i=0;i<conf.keyArray.length;i++)
	        {
	            if(event.keyCode==conf.keyArray[i])
	            {
	                bKey=true;
	            }
	        }

	        _this.createDiv.hide();

	        if(!bKey)
	        {
	            for(var i in _this.listData)
	            {
	            	if((_this.listData[i].indexOf(keyWords)>-1)&&(keyWords!=""))
	                {
	                	var json = "";
	                	switch(_this.type)
	                	{
	                		case "city":
	                			json = {"code":_this.listData[i],"name":i}
	                			break;
	                			
	                		case "job":
	                			json = {"code":i,"name":_this.listData[i]}
	                			break;

	                		default:
	                			json = {"code":i,"name":_this.listData[i]}
	                			break;
	                	}
	                	
	                	aResult.push(json);
	                }
	            }
	            //console.log(aResult);

	            if($msOk) $msOk.remove();
	            if($msError) $msError.remove();

	            if(_.size(aResult)>0)
	            { 
	                if(aResult.length>conf.max) aResult.length = conf.max;

					_.each(aResult,function(obj){
						strLi += "<li rel="+obj.code+"><a href='javascript:;'>"+obj.name+"</a></li>";
					})

	                str = "<div class='ms-ok-component' style='width:"+_this.style.msOkWidth+"'>"+
	                      "<ul class='ms-list-component'>"+
	                      strLi+
	                      "</ul>"+
	                      "<iframe border='0' frameborder='0' style='position: absolute; z-index: -1; left: 0px; top: 0px; width:100%; height:100%'></iframe>"+
	                      "</div>";
	            }
	            
	            if((aResult.length==0)&&(keyWords!=""))
	            {
	                str = "<div class='ms-error-component'>"+
	                		"您输入的信息不存在，请重新输入"+
	                		"<iframe border='0' frameborder='0' style='position: absolute; z-index: -1; left: 0px; top: 0px; width:100%; _width:230px; height:100%;'></iframe>"+
	                	  "</div>"; 
	            }

	            //$this.append($(str));
	            $("body").append($(str));

	            var msPickOkWidth = $(".ms-ok-component").width();
				var msPickOkHeight = $(".ms-ok-component").height();
				$(".ms-ok-component").find("iframe").css({"width":msPickOkWidth,"height":msPickOkHeight});

	            conf.index=0;//每次都要重置索引号。因为列表有按键等操作，不重置，有些时候会选中下面的。
	            $(".ms-ok-component").find("li").eq(conf.index).addClass("active");

	            msTipPosition()
	            
	        }

	        
			var aLi = $(".ms-ok-component").find("li");
            aLi.on("mouseover",function(){

	            aLi.removeClass("active");
	            $(this).addClass("active");
	            conf.index = $(this).index();

	        });

            var addA = function(maxnum)
            {	
            	var keyWordsSelected=$("body").find(".ms-ok-component").find('.active').text();
             	var keyWordsId = $("body").find(".ms-ok-component").find('.active').attr("rel");
             	strA = "<span class='ms-selected-item' rel="+keyWordsId+">"+
                        "<span class='text'>"+keyWordsSelected+"</span>"+
                        "<span class='delete-component'>删除</span></span>";

             	if(_this.check=="radio")
             	{	
	                $this.find(".txt-box-component").find(".ms-selected-item").remove();

	                msPick.createDiv.find(".ms-cb-cb").attr("checked",false);

	                $this.find(".ms_checkInput").val(keyWordsId);     
	                conf.msCheckInputArr=[keyWordsId];
             	}

             	if(_this.check=="checkbox")
             	{
             		conf.selectLenght = conf.msCheckInputArr.length; 
		            if(conf.selectLenght>=maxnum)
		            {
		                $this.find(".ms-txt-component").val("");
		                if($msOk) $msOk.remove();
		                alert("最多选择"+msPick.maxCount+"项");
		                return;
		            }

	             	var allA = $this.find(".txt-box-component").find(".ms-selected-item");
	             	var bCunZai = false;
	             	for(var i=0;i<allA.length;i++)
		            {
		                if(allA[i].getAttribute("rel")==keyWordsId)
		                {
		                    bCunZai =true;
		                }
		            }

		            if(bCunZai)
		            {
		                $this.find(".ms-txt-component").val("");
		                return;
		            } 
	                conf.msCheckInputArr.push(keyWordsId);
	                $this.find(".ms_checkInput").val(conf.msCheckInputArr.join(",")); 
             	}

             	$(strA).insertBefore($this.find(".ms-txt-component"));
             	$this.find(".ms-txt-component").val("");
             	conf.aMsCb = _this.createDiv.find(".ms-cb-cb");
             	
            	conf.aMsCb.each(function(){

	                if($(this).attr("value")==keyWordsId)
	                {
	                    $(this).attr("checked",true);
	                }
	            })
	            if($msOk) $msOk.remove();

             	msPick.mpPosition()

       
            };

            if(event.keyCode==13)
            {	
            	if(aLi.length==0)
	            {
	                $(this).val("");

	                return;
	            }
	            addA(msPick.maxCount);        
            }

            aLi.on("click",function()
            {
	            addA(msPick.maxCount);
            })
            
            switch(event.keyCode)
	        {
	            case 38:
	                conf.index--;
	                if(conf.index==-1) conf.index=aLi.length-1;
	                aLi.removeClass("active");
	                aLi.eq(conf.index).addClass("active");
	                break;                
	            case 40:
	                conf.index++;
	                if(conf.index==aLi.length) conf.index=0;
	                aLi.removeClass("active");
	                aLi.eq(conf.index).addClass("active");
	                break;
	        }

    	})
		/**
		 * [ 删除A操作]
		 */
		$this.find(".ms-txt-component").on("keydown",function(event){

			var lastA = $this.find(".txt-box-component").find(".ms-selected-item:last");
	        if(event.keyCode==8)
	        {
	            if($(this).val()=="")
	            {
	                
	                if(_this.check=="radio")
	                {
	                	lastA.remove();
		                $this.find(".ms-txt-component").val("");
		                $this.find(".ms_checkInput").val("");
		                _this.createDiv.find(".ms-cb-cb").attr("checked",false);

	                }

	                if(_this.check=="checkbox")
	                {
	                	conf.aMsCb = _this.createDiv.find(".ms-cb-cb");
		                for(var i=0;i<conf.msCheckInputArr.length;i++)
		                {
		                	if(lastA.attr("rel")==conf.msCheckInputArr[i])
		                	{
		                		conf.msCheckInputArr.pop();
		                	}
		                }
		                $this.find(".ms_checkInput").val(conf.msCheckInputArr.join(","));

		                for(var i=0;i<conf.aMsCb.length;i++)
		                {
		                    if(lastA.attr("rel")==conf.aMsCb[i].value)
		                    {
		                        conf.aMsCb[i].checked = false;
		                    }
		                }
		                lastA.remove();
	                }

	                msPick.mpPosition()
	            }
	        }

		})

		/**
		 * [ 计算 ms-ok/ms-error 提示框的位置]
		 */
		var msTipPosition = function()
		{
			var left = $this.find(".ms-txt-component").offset().left;
        	var top = $this.find(".ms-txt-component").offset().top+26;
            $(".ms-ok-component").css({"left":left,"top":top});
            $(".ms-error-component").css({"left":left,"top":top});
		};

	}

	/**
	 * [ 所有对msPick下拉框的操作]
	 */
	msPick.ckBox = function()
	{
		
		var tabMenu = this.createDiv.find(".h-tab").find(".tab-menu-component");
	    var cTabCon = this.createDiv.find(".c-tab").find(".tab-con-component");
	    var oClose = this.createDiv.find(".w-h-tab-component").find(".close-component");
	    var aDelete = [];//存放所有创建的a标签

	    var _this = this;

	    if (tabMenu.length>=2) {

	    	tabMenu.on("click",function(){

		        var temp = $(this).index();
		        switch(temp)
		        {
		            case 0:
		            _this.createDiv.css("width","400px");
		            break;
		            case 1:
		            _this.createDiv.css("width","570px");
		        }
		        msPick.mpPosition();
		        
		        $(this).parent().find("li").removeClass("active");
		        $(this).addClass("active");
		        cTabCon.hide();
		        cTabCon.eq(temp).show();
		        msPick.iframeWH()
		    })
		    
	    };
	    
	    oClose.on("click",function(){
	        _this.createDiv.hide();
	    })

	    /**
	     * [ 所有单选/多选更改选中状态的操作]
	     */
	    _this.createDiv.on("change",".ms-cb-component",function(){

	    	conf.aMsCb = _this.createDiv.find(".ms-cb-cb");

	    	var oCheckBox = $(this).find(".ms-cb-cb");
	    	var keyWordsSelected = oCheckBox.attr("ms-cb-data");
            
            var strA = ""

            var keyWordsId = oCheckBox.val();
            var name = "";
            
            switch(_this.type)
			{
				case "city":
					name = keyWordsSelected.split("-")[2]
					break;

            	case "job":
            		name = msPick.allData[keyWordsSelected];
            		break;

            	default:
            		name = msPick.getName(keyWordsSelected);
            		break;
            }

            strA = "<span class='ms-selected-item' rel="+keyWordsId+">"+
                        "<span class='text'>"+name+"</span>"+
                        "<span class='delete-component'>删除</span></span>";
            
			if(_this.check=="radio")
            {
            	
            	$this.find(".ms-selected-item").remove();
                $(strA).insertBefore($this.find(".ms-txt-component"));
                $this.find(".txt-box-component").val(keyWordsId);
                $this.find(".ms-txt-component").val("");

                conf.aMsCb = _this.createDiv.find(".ms-cb-cb");
                conf.aMsCb.attr("checked",false);
            	conf.aMsCb.each(function(){

	                if($(this).attr("value")==keyWordsId)
	                {
	                    $(this).attr("checked",true);
	                }
	            })
	            $this.find(".ms_checkInput").val(keyWordsId);

	            conf.msCheckInputArr=[keyWordsId];
            }

			if(_this.check=="checkbox")
			{
			
				selectCityLenght = conf.msCheckInputArr.length;
		    	var tempArrFn = function()
		    	{
		    		var tempArr = [];
			        for(var i=0;i<conf.msCheckInputArr.length;i++)
			        {
			        	if(oCheckBox.val()!=conf.msCheckInputArr[i])
			        	{
			        		tempArr.push(conf.msCheckInputArr[i]);
			        	}
			        }
			        conf.msCheckInputArr=tempArr;
			        $this.find(".ms_checkInput").val(tempArr.join(","));
		    	}

		    	if(selectCityLenght>= _this.maxCount)
		        { 

		            if(oCheckBox.attr("checked")!="checked")
		            {
		            	tempArrFn();
		            }else
		            {
		            	$(this).find(".ms-cb-cb").attr("checked",false);
			            alert("最多选择"+msPick.maxCount+"项");
			            return;
		            }
		            
		        }
		        aDelete = $this.find(".ms-selected-item");
		        

		        if(oCheckBox.attr("checked"))
		        {

		            for(var i=0;i<conf.aMsCb.length;i++)
		            {

		                if(oCheckBox.val()==conf.aMsCb[i].value)
		                {
		                    conf.aMsCb[i].checked = true;
		                }
		            }
		                        
		            $(strA).insertBefore($this.find(".ms-txt-component"));   
		            conf.msCheckInputArr.push(keyWordsId); 
		            $this.find(".ms_checkInput").val(conf.msCheckInputArr.join(","));
		        }
		        else
		        {
		            for(var i=0;i<conf.aMsCb.length;i++)
		            {

		                if(oCheckBox.val()==conf.aMsCb[i].value)
		                {
		                    conf.aMsCb[i].checked = false;
		                }
		            }
		            aDelete.each(function(){

		                if($(this).attr("rel")==oCheckBox.attr("value"))
		                {
		                    $(this).remove();
		                }
		            })

		            tempArrFn();

		        }
			}
	    	
			if($("body").find(".ms-ok-component")) $("body").find(".ms-ok-component").remove();

	        msPick.mpPosition()
	        
	    })

		/**
		 * [所有存在二级的。绑定click事件，当事件单击的时候，加载数据。]
		 */
		var allLabel = msPick.createDiv.find(".fold-head-component").find("label");
		if(allLabel.length>0)
		{
			allLabel.on("click",function(){

				msPick.createDiv.find(".fold-head-component").find("span").removeClass("active")
				$(this).parent().addClass("active");

				var code = $(this).attr("code");
				
				var json = {};
				var $foldCon = $(this).parents(".fold-head-component").parent(".foldable").find(".fold-con-component");
				
				var $foldConAll = msPick.createDiv.find(".fold-con-out");

				var $$this = $(this);

				msPick.createDiv.find(".fold-con-out").hide();
				if($(this).attr("click")=="true")
				{
					$foldConAll.each(function(){
						if($(this).attr("code") == $$this.attr("code"))
						{
							$(this).show();
						}
					})
					
				}
				else
				{
					var cityStr = "";
					
					switch(_this.type)
					{
						case "city":
							for(var i in msPick.DataMap)
							{	
								var tempCode = msPick.DataMap[i];
								//console.log(msPick.DataMap[i].split("-")[1]);
								if(code == tempCode.split("-")[1])
								{
									cityStr +="<label class='ms-cb-component' style='width:"+_this.style.msCbComponent+"'><input type="+_this.check+" class='ms-cb-cb' name="+_this.type+" value="+tempCode+" ms-cb-data="+tempCode+" />"+i+"</label>";	
									//console.log(msPick.DataMap[i].split("-")[2]);
								}
								//cityStr +="<label class='ms-cb-component' style='width:"+_this.style.msCbComponent+"'><input type="+_this.check+" class='ms-cb-cb' name="+_this.type+" value="+i+" ms-cb-data="+i+" />"+json[i]+"</label>";			
							}
							break;
							
						default:
							json = msPick.DataMap[code];
							for(var i in json)
							{
								cityStr +="<label class='ms-cb-component' style='width:"+_this.style.msCbComponent+"'><input type="+_this.check+" class='ms-cb-cb' name="+_this.type+" value="+i+" ms-cb-data="+i+" />"+json[i]+"</label>";			
							}
							break;
					}

					
					
					var cityStrOut = "<div class='fold-con-out' code = '"+code+"'>"+cityStr+"</div>";
					
					$foldCon.append($(cityStrOut));
					$(this).attr("click",true);
				}
				
				conf.aMsCb = _this.createDiv.find(".otherAll").find(".ms-cb-cb");
	        	_.each(conf.msCheckInputArr,function(obj){
	        		_.each(conf.aMsCb,function(obj_){

	        			if(obj==obj_.value)
	        			{
	        				obj_.checked = true;
	        			}

	        		})
	        	})

	        	msPick.iframeWH();
			})
		}

	}

	/**
	 * [ 模似文本框的点击。]
	 */
	
	var initFn = function (event)
	{
		$(".ms-pick").hide();
		$(".ms-error-component").hide();
		$(".ms-ok-component").hide();
		msPick.createDiv.show();
		msPick.mpPosition();	
		$msTxt.focus();	
		$msTxt.val("");
		event.stopPropagation();
	}

	$txtBox.on("click",function(event){

		initFn(event)

	})

	$this.find(".ms-btn-component").on("click",function(event){

		initFn(event)

	})

	/**
	 * [ 延时执行函数]
	 */
	setTimeout(function(){
		msPick.txt();
		msPick.ckBox();
		msPick.iframeWH();

	},100)
	
	/**
	 * [ a的删除操作]
	 */
	msPick.removeA = function()
	{
		var aCheckedLable = [];	//存放所有被选中的checkbox
		var _this = this;
	    
	    $this.find(".txt-box-component").on("click",".delete-component",function(){

	    	if(_this.check=="radio")
	    	{
	    		$(this).parent(".ms-selected-item").remove();
	    		_this.createDiv.find(".ms-cb-cb").attr("checked",false);
	    		$this.find(".ms_checkInput").val("");
	    		msPick.mpPosition();
	    		conf.msCheckInputArr = [];
	    	}

	    	if(_this.check=="checkbox")
	    	{
	    		if(_this.createDiv.find(".ms-cb-cb").length>0)
	    		{

	    			aCheckedLable = _this.createDiv.find(".ms-cb-cb:checked");
			        var _$this = $(this);
			        aCheckedLable.each(function(){
			            if($(this).attr("value")==_$this.parent().attr("rel"))
			            {
			                $(this).attr("checked",false);

			            }
			        })
	    		}
		        var tempArr = [];
		        for(var i=0;i<conf.msCheckInputArr.length;i++)
		        {
		        	if($(this).parent().attr("rel")!=conf.msCheckInputArr[i])
		        	{
		        		tempArr.push(conf.msCheckInputArr[i])
		        	}
		        }
		        conf.msCheckInputArr=tempArr;
		        $this.find(".ms_checkInput").val(tempArr.join(","));
		        $(this).parent(".ms-selected-item").remove();
		        msPick.mpPosition();
		        return false;
	    	}
	        
	    })
	}
    
	msPick.removeA();

	/**
	 * [ 窗体大小改变时重新计算mspick的位置]
	 */
	$(window).resize(function() {
    	msPick.mpPosition()
	});

	/**
	 * [ document上点击时让mspick消失]
	 */
	$(document).on("click",function(event){

		$(".ms-pick").hide();
		if($("body").find(".ms-ok-component")) $("body").find(".ms-ok-component").remove();
		if($("body").find(".ms-error-component")) $("body").find(".ms-error-component").remove();
	})

	/**
	 * [ 点击在mspick上时,阻止document上点击的冒泡。]
	 */
	$(".ms-pick").on("click",function(event){
		event.stopPropagation();
	})


}