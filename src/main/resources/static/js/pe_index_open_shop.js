$(function(){
	 //div中图片大小自适应
    function div_img(dom){
    	var dom_w = dom.width()
    	var dom_h = dom.height();
    	var sub_img = dom.find("img")
    	var img_w = sub_img.width();
    	var img_h = sub_img.height();
    	var dom_radio = dom_w/dom_h;
    	var img_radio = img_w/img_h;
    	if(dom_radio > img_radio){
    		sub_img.css({
    			"width":dom_w+"px",
    			"height":"auto",
    		})
    	}else{
    		sub_img.css({
    			"width":"auto",
    			"height":dom_h+"px",
    		})
    	}
    }
    $.each($(".img_area"),function(idx){
    	div_img($(".img_area").eq(idx));
    })
	function showImg(outdiv,indiv,thiselement){  
	    var winW = $(window).width();  
	    var winH = $(window).height();  
	    var $src_html = $(thiselement);
	    var src_dom = $src_html.get(0).hasChildNodes("video")?$src_html.find("video"):$src_html;  
	    $(indiv).empty().append($src_html);
	        var imgW = src_dom.get(0).width;   
        	var imgH = src_dom.get(0).height  ;
	        if($src_html.get(0).hasChildNodes("video")){
	        	 $src_html.find("video").get(0).width = $src_html.find("video").get(0).width*2;
		         $src_html.find("video").get(0).height = $src_html.find("video").get(0).height*2
		       
	        }else{
	        	var Img_url = $(indiv).find("img").attr("src");
	        	getImageWidth(Img_url,function(w,h){
					console.log({width:w,height:h});
					if( w > winW ){  
			            $(indiv).find("img").css("width",winW).css("height","auto");  
			        }else if(h > winH){
			        	$(indiv).find("img").css("height",winH).css("width","auto"); 
			        }else{
			        	 $(indiv).find("img").css({
				        	"width":w+"px",
				        	"height":h+"px"
				        })
			        }

				});
	        	
	        }
	        $(outdiv).fadeIn("fast");  
	        $(indiv).fadeIn("fast");  
	}  
	function getImageWidth(url,callback){
		var img = new Image();
		img.src = url;
		
		// 如果图片被缓存，则直接返回缓存数据
		if(img.complete){
		    callback(img.width, img.height);
		}else{
	            // 完全加载完毕的事件
		    img.onload = function(){
			callback(img.width, img.height);
		    }
	        }
		
	}

	//点击轮播部分视频图片放大
	$('.pic_list').on("click",".img_area",function(){  
	    var thiselement=$(this).html();  
	    showImg("#outdiv",".indiv",thiselement);  
	});   

	//点击放大层的图片遮罩层消失
	$("#outdiv").on("click",function(){
		$(this).hide();$(".indiv").hide();
	})
	$(".indiv").on("click",".play_btn",function(){
		$(this).siblings(".play_di").eq(0).hide();
		$(this).hide();
		$(this).siblings("video").eq(0).get(0).play();
	})

    //上传图片显示图片
    $(".input_item").on("change","input",function(){
        var $file = $(this);
        var fileObj = $file[0];
        var windowURL = window.URL || window.webkitURL;
        var dataURL;
        var $img = $(this).parent();
        if(fileObj && fileObj.files && fileObj.files[0]){
            dataURL = windowURL.createObjectURL(fileObj.files[0]);
            $img.css('background-image',"url("+dataURL+")");
        }
        $img.find("span").html("");
    })
})
