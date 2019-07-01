$(function(){
    //搜索框tab页切换
    $(".search_box_mn").on("mouseover","li",function(){
    	$(this).siblings().removeClass("search_li_active");
    	$(this).addClass("search_li_active");
    	var input_box = $(".input_box").find("input");
    	switch($(this).index()){
    		case 0:
    			input_box.attr("placeholder","请输入宝贝名称");
    			break;
			case 1:
    			input_box.attr("placeholder","请输入供应商名称");
    			break;
			
    	}
    })
    //收货信息更多鼠标移上事件
    $(".con_item").on("mouseover",".con_item_more",function(){
    	$(this).find(".more_box").show()
    }).on("mouseleave",".con_item_more",function(){
    	$(this).find(".more_box").hide()
    })
    //留言框文本字数计数
    var num_con = $(".second_three_r").find(".txt_num span");
    var txt_num = parseInt(num_con.html());
    $(".second_three_r").on("keyup","textarea",function(){
    	
    	var num = txt_num - $(this).val().length;
    	num_con.html(num);
    }).on("keydown","textarea",function(){
    	var num = txt_num - $(this).val().length;
    	num_con.html(num);
    })
	
})
