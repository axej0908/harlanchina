// $(function(){
//     //搜索框tab页切换
//     $(".search_box_mn").on("mouseover","li",function(){
//     	$(this).siblings().removeClass("search_li_active");
//     	$(this).addClass("search_li_active");
//     	var input_box = $(".input_box").find("input");
//     	switch($(this).index()){
//     		case 0:
//     			input_box.attr("placeholder","请输入供应商名称");
//     			break;
// 			case 1:
//     			input_box.attr("placeholder","请输入商品名称");
//     			break;
//
//     	}
//     })
// 	//购物车物品数量的控制
// 	//数量减少按钮
// 	$(".item_div5").on("click",".num_cut",function(){
// 		var num = $(this).siblings(".num").find("input").val();
// 		if(num==""||num==0){
// 			num = 1;
// 		}else{
// 			num = parseInt(num);
// 			num--;
// 		}
// 		$(this).siblings(".num").find("input").val(num);
// 	})
// 	//数量增加按钮
// 	$(".item_div5").on("click",".num_add",function(){
// 		var num = $(this).siblings(".num").find("input").val();
// 		if(num==""||num==0){
// 			num = 1;
// 		}else{
// 			num = parseInt(num);
// 		}
// 		num++;
// 		$(this).siblings(".num").find("input").val(num);
// 	})
// 	//顶部全选
// 	$(".tal_header").on("change",".ch input",function(){
// 		if($(this).prop("checked")){
// 			$(".car_tal").find(".ch input").prop("checked",true);
// 		}else{
// 			$(".car_tal").find(".ch input").prop("checked",false);
// 		}
// 		goods_num();
// 		goods_price()
// 	})
// 	//底部全选
// 	$(".bottom_op").on("change",".ch input",function(){
// 		if($(this).prop("checked")){
// 			$(".car_tal").find(".ch input").prop("checked",true);
// 		}else{
// 			$(".car_tal").find(".ch input").prop("checked",false);
// 		}
// 		goods_num();
// 		goods_price()
// 	})
// 	//供应商全选按钮
// 	$(".car_tal").on("click",".shang input",function(){
// 		if($(this).prop("checked")){
// 			$(this).parents(".shang").siblings(".goods_list").children(".good_item").find("input").prop("checked",true);
// 			//如果其他并列商家全部是全选状态，那么顶部和底部全选按钮页是勾选状态
// 			//并列的商家
// 			var supply_sibling =  $(this).parents(".supplier").siblings(".supplier");
// 			if(supply_sibling.find(".shang input").prop("checked")||(supply_sibling.length == 0)){
// 				$(".bottom_op").find("input").prop("checked",true);
// 				$(".tal_header").find("input").prop("checked",true);
// 			}
// 		}else{
// 			$(this).parents(".shang").siblings(".goods_list").children(".good_item").find("input").prop("checked",false);
// 				$(".bottom_op").find("input").prop("checked",false);
// 				$(".tal_header").find("input").prop("checked",false);
// 		}
// 		goods_num();
// 		goods_price();
// 	})
// 	//供应商底下的单个商品的全选按钮
// 	$(".car_tal").on("click",".good_item input",function(){
// 		if($(this).prop("checked")){
// 			//如果此商品并列的同一商家下的商品也是勾选状态，MAME商家也是选中状态
// 			//并列的商品
// 			var good_sibling = $(this).parents(".good_item").siblings(".good_item");
// 			if(good_sibling.find(".item_div1 input").prop("checked") || (good_sibling.length==0)){
// 				$(this).parents(".goods_list").siblings(".shang").find("input").prop("checked",true);
// 				//如果其他并列商家全部是全选状态，那么顶部和底部全选按钮页是勾选状态
// 				//商品的商家并列的商家
// 				var shang_sibling = $(this).parents(".supplier").siblings(".supplier");
// 			  if(shang_sibling.find(".shang input").prop("checked") ||  (shang_sibling.length==0)){
// 					$(".bottom_op").find("input").prop("checked",true);
// 					$(".tal_header").find("input").prop("checked",true);
// 				}
// 			}
//
// 		}else{
// 			$(this).parents(".goods_list").siblings(".shang").find("input").prop("checked",false);
// 				$(".bottom_op").find("input").prop("checked",false);
// 				$(".tal_header").find("input").prop("checked",false);
// 		}
// 		goods_num();
// 		goods_price()
// 	})
// 	//购物车数量计算
// 	function goods_num(){
// 		var good_items = $(".car_tal").find(".good_item");
// 		var num = 0;
// 		$.each(good_items,function(i){
// 			if($(this).find(".ch input").prop("checked")){
// 				num = num + parseInt($(this).find(".num input").val());
// 			}
// 		})
// 		$(".count_num").find("span").html(num);
// //		根据数量去设置结算按钮的状态
// 		if(num > 0){
// 			$(".count_btn").addClass("count_btn_active");
// 		}else{
// 			$(".count_btn").removeClass("count_btn_active");
// 		}
// 	}
// 	//购物车价钱计算
// 	function goods_price(){
// 		var good_items = $(".car_tal").find(".good_item");
// 		var price = 0;
// 		$.each(good_items,function(i){
// 			if($(this).find(".ch input").prop("checked")){
// 				price = price + parseInt($(this).find(".item_div6").html());
// 			}
// 		})
// 		$(".cout_price").find("span").html(price.toFixed(2))
// 	}
// })
