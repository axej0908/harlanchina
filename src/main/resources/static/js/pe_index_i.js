$(function(){
	//tab页一级菜单
	$(".tab_div").on("click","li",function(){
		$(this).addClass("tab_li_current").siblings().removeClass("tab_li_current");
		$(".con_list").find(".con").hide().eq($(this).index()).show();
	})
	//收藏商品删除管理
	//单个商品删除按钮出现消失
	$(".collect_gd_list").on("mouseover",".collect_gd_pic",function(){
		$(this).find(".gd_del_item").show();
	})
	$(".collect_gd_list").on("mouseleave",".collect_gd_pic",function(){
		$(this).find(".gd_del_item").hide();
	})
	//收藏商品批量管理按钮点击事件
	$(".con").eq(0).on("click",".plgl_btn",function(){
		var collect_gd = $(this).parents(".gl_op").siblings(".collect_gd_list").find(".collect_gd_item");
		if(!$(this).hasClass("plgl_btn_active")){
			$(this).addClass("plgl_btn_active")
			$(this).siblings(".del_top, .sel_top").show();
			collect_gd.find(".del_quan_sel").show();
			$(this).html("取消管理");
		}else{
			$(this).removeClass("plgl_btn_active")
			$(this).siblings(".del_top, .sel_top").hide();
			collect_gd.find(".del_quan_sel").hide();
			$(this).html("批量管理");
		}
	})
	//商品收藏列表全选按钮点击事件
	$(".con").eq(0).on("click","input[type='checkbox']",function(){
		var qx_btn_list = $(".collect_gd_list").find(".del_quan_sel_btn");
		if($(this).prop("checked")){
			qx_btn_list.addClass("del_active");
		}else{
			qx_btn_list.removeClass("del_active");
		}

	})
	//商品收藏列表顶部删除按钮点击事件
	$(".con").eq(0).on("click",".del_top",function(){
		var gd_list = $(".collect_gd_list").find(".collect_gd_item");
		if($(this).siblings(".sel_top").find("input[type='checkbox']").prop("checked")){
			gd_list.remove();
		}else{
			for(var i=0;i<gd_list.length;i++){
				if(gd_list.eq(i).find(".del_quan_sel_btn").hasClass("del_active")){
					gd_list.eq(i).remove()
				}
			}
		}

	})
	//收藏商品列表全选蒙版选项
	$(".collect_gd_list").on("click",".del_quan_sel_btn",function(){
		if(!$(this).hasClass("del_active")){
			$(this).addClass("del_active");
			var qx_btn_list = $(".collect_gd_list").find(".del_quan_sel_btn");
			var check_btn_state = $(".con").eq(0).find("input[type='checkbox']");
			for(var i=0;i<qx_btn_list.length;i++){
				if(!qx_btn_list.eq(i).hasClass("del_active")){
					check_btn_state.prop("checked",false);
					break;
				}else if((i==(qx_btn_list.length-1))&&qx_btn_list.eq(qx_btn_list.length-1).hasClass("del_active")){
					check_btn_state.prop("checked",true);
				}
			}

		}else{
			$(this).removeClass("del_active");
			if($(".con").eq(0).find("input[type='checkbox']").prop("checked")){
				$(".con").eq(0).find("input[type='checkbox']").prop("checked",false);
			}
		}
	})
	
	
	
	
	//收藏店铺删除管理
	//收藏商品批量管理按钮点击事件
	$(".con").eq(1).on("click",".plgl_btn",function(){
			var collect_shops = $(this).parents(".gl_op").siblings(".collect_shop_list").find(".collect_shop_item");
		if(!$(this).hasClass("plgl_btn_active")){
			$(this).addClass("plgl_btn_active")
			$(this).siblings(".del_top, .sel_top").show();
			 collect_shops.find(".del_quan_sel").show();
			$(this).html("取消管理");
		}else{
			$(this).removeClass("plgl_btn_active")
			$(this).siblings(".del_top, .sel_top").hide();
			collect_shops.find(".del_quan_sel").hide();
			$(this).html("批量管理");
		}
	})
	//店铺收藏列表全选按钮点击事件
	$(".con").eq(1).on("click","input[type='checkbox']",function(){
		var qx_btn_list = $(".collect_shop_list").find(".del_quan_sel_btn");
		if($(this).prop("checked")){
			qx_btn_list.addClass("del_active");
		}else{
			qx_btn_list.removeClass("del_active");
		}

	})
	//商品收藏列表顶部删除按钮点击事件
	$(".con").eq(1).on("click",".del_top",function(){
		var shop_list = $(".collect_shop_list").find(".collect_shop_item");
		if($(this).siblings(".sel_top").find("input[type='checkbox']").prop("checked")){
			shop_list.remove();
		}else{
			for(var i=0;i<shop_list.length;i++){
				if(shop_list.eq(i).find(".del_quan_sel_btn").hasClass("del_active")){
					shop_list.eq(i).remove()
				}
			}
		}

	})
	//收藏商品列表全选蒙版选项
	$(".collect_shop_list").on("click",".del_quan_sel_btn",function(){
		if(!$(this).hasClass("del_active")){
			$(this).addClass("del_active");
			var qx_btn_list = $(".collect_shop_list").find(".del_quan_sel_btn");
			var check_btn_state = $(".con").eq(1).find("input[type='checkbox']");
			for(var i=0;i<qx_btn_list.length;i++){
				if(!qx_btn_list.eq(i).hasClass("del_active")){
					check_btn_state.prop("checked",false);
					break;
				}else if((i==(qx_btn_list.length-1))&&qx_btn_list.eq(qx_btn_list.length-1).hasClass("del_active")){
					check_btn_state.prop("checked",true);
				}
			}

		}else{
			$(this).removeClass("del_active");
			if($(".con").eq(1).find("input[type='checkbox']").prop("checked")){
				$(".con").eq(1).find("input[type='checkbox']").prop("checked",false);
			}
		}
	})
})
