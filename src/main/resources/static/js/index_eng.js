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
	$(".third_mn_con").on("click","li",function(){
		$(this).siblings().removeClass("third_li_active");
		$(this).addClass("third_li_active");
	})
	//banner轮播
  	var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        autoplay : 3000,
        loop:true
    });
    //左侧菜单栏点击事件
	$(".subNav").click(function(){
		$(this).toggleClass("currentDd").siblings(".subNav").removeClass("currentDd");
		$(this).toggleClass("currentDt").siblings(".subNav").removeClass("currentDt");
		$(this).next(".navContent").slideToggle(300).siblings(".navContent").slideUp(500);
	})	
	$(".third_mn_box").on("mouseover",".subNav",function(){
		$(this).toggleClass("currentDt").siblings(".subNav").removeClass("currentDt");
		$(this).find(".navContent").show();
		$(this).siblings().find(".navContent").hide();
	})
	$(".third_mn_box").on("mouseout",".subNav",function(){
		$(this).removeClass("currentDt");
		$(this).find(".navContent").hide();
	})
	//banner图新闻资讯切换
	$(".tab_li").on("mouseover","li",function(){
		var idx = $(this).index();
		$(this).addClass("current").siblings().removeClass("current");
		$(".content_item").hide().eq(idx).show();
		
	})
	
})
