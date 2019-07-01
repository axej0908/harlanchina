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
    //商品类目面板的收放
    $(".good_item").on("click",".good_item_head",function(){
    	if($(this).siblings(".good_item_panel").css("display") == "block"){
    		$(this).find(".icon_btn").removeClass("icon_show").addClass("icon_hide");
    		$(this).siblings(".good_item_panel").slideUp()
    	}else{
    		$(this).find(".icon_btn").removeClass("icon_hide").addClass("icon_show");
    		$(this).siblings(".good_item_panel").slideDown()
    	}
    })
})
