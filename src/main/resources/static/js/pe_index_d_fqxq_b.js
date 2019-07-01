$(function(){
    //搜索框tab页切换
    $(".search_box_mn").on("mouseover","li",function(){
    	$(this).siblings().removeClass("search_li_active");
    	$(this).addClass("search_li_active");
    	var input_box = $(".input_box").find("input");
    	switch($(this).index()){
    		case 0:
    			input_box.attr("placeholder","请输入供应商名称");
    			break;
			case 1:
    			input_box.attr("placeholder","请输入商品名称");
    			break;
			
    	}
    })
 	//图片轮播
	 var swiper = new Swiper('.swiper-container', {
	    nextButton: '.swiper-button-next',
	    prevButton: '.swiper-button-prev',
        slidesPerView: 4,
        spaceBetween: 8,
    });
//     var swiper = new Swiper('.three_swiper-container', {
//	    nextButton: '.swiper-button-next',
//	    prevButton: '.swiper-button-prev',
//      slidesPerView: 4,
//      spaceBetween: 10,
//  });
     var swiper = new Swiper('.four_swiper-container', {
	    nextButton: '.swiper-button-next',
	    prevButton: '.swiper-button-prev',
        slidesPerView: 4,
        spaceBetween: 10,
    });
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
//	        	$(indiv).css({
//		        	"width":imgW*2+"px",
//		        	"height":imgH*2+"px"
//		        }) 
		       
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
	        	
//		       if( imgW > winW ){  
//		            src_dom.css("width","100%").css("height","auto");  
//		        }else if(imgH > winH){
//		        	src_dom.css("height","100%").css("width","auto"); 
//		        }else{
//		        	 $(indiv).css({
//			        	"width":imgW+"px",
//			        	"height":imgH+"px"
//			        }) 
//		        }
	        	
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
	$('.swiper-wrapper,.three_swiper-container,.four_swiper-container').on("click",".img_area",function(){  
	    var thiselement=$(this).html();  
	    showImg("#outdiv",".indiv",thiselement);  
	});   
	//点击.three_pic_list部分的图片
	$('.three_pic_list').on("click",".three_item",function(){  
		var bg_url = $(this).css("background-image")
		console.log(bg_url)
		var img_url = bg_url.substr(5,bg_url.length-2);
	    var thiselement='<img src="'+img_url+'"/>';
	    showImg("#outdiv",".indiv",thiselement);  
	});
	//点击third_left_four的视频图片放大
	$('.four_pic_list').on("click",".four_item",function(){  
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
	
	
	 //页面跳转
    $(".jjzxx_list").on("click",".jjzxx_c_btn_b",function(){
    	location.href = "pe_index_d_cyz.html";
    })
})
