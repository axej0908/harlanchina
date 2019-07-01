$(function(){
	var wl_state ;
	var href_url = location.pathname;
	if(href_url.indexOf("1") >=0){
		wl_state = ['待支付','待发货','已签收','已完成'];
	}else{
		wl_state = ['Pending payment','Pending delivery','Goods to be received','finish'];
	}
	$(".order_tab").on("click","li",function(){
		var idx = $(this).index();
		var date_li = $(".data_ul").find("li");
		$(".wl_til").html(wl_state[idx])
		if(idx == 0){
			$(".freight_p,.extra_block").show()
		}else{
			$(".freight_p,.extra_block").hide()
		}
		$(this).addClass("tab_active").siblings().removeClass("tab_active");
		date_li.eq(idx).removeClass("dt_show");
		for(var i=0;i<idx+1;i++){
			date_li.eq(i).addClass("dt_show");
		}
	})
})
