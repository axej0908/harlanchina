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
    //tab页切换
    $(".mn_list").on("click","li",function(){
    	$(this).addClass("mn_current").siblings().removeClass("mn_current");
    	var dis = ($(this).width()*$(this).index()+parseInt($(this).css("marginLeft"))*($(this).index()+1))+"px"
    	$(".line_hua").css({
    		"left":dis
    	})
    	$(".con").hide().eq($(this).index()).show()
    })
    //产品分类标签点击事件
    $(".type_list").on("click","li",function(){
    	$(this).addClass("li_active").siblings().removeClass("li_active")
    })
})
