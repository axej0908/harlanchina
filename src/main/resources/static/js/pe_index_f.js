$(function(){
	//tab页一级菜单
	$(".tab_div").on("click","li",function(){
		$(this).addClass("tab_li_current").siblings().removeClass("tab_li_current");
		$(".con_list").find(".con").hide().eq($(this).index()).show();
	})
	//商品上架部分
	//优惠折扣点击按钮
	$(".con_a_one").on("click",".op_btn_a",function(){
//		$(this).parents(".con_a_one").hide().siblings().hide();
//		$(this).parents(".con_a_one").siblings(".con_a_two").show();
		$(".alert_wl").eq(0).show()
	})
	//限时秒杀点击按钮
//	$(".con_a_one").on("click",".op_btn_b",function(){
//		$(this).parents(".con_a_one").hide().siblings().hide();
//		$(this).parents(".con_a_one").siblings(".con_a_three").show();
//	})
	//添加商品部分
//	规格参数添加按钮
	$(".e_cs_list").on("click",".e_cs_add",function(){
		$(".alert_wl").eq(1).show()
		var item = $('<li><input type="text"/></li>')
		$(this).before(item);
	})
/*	//上唇图片显示文件名
     $(".b_one_input_b").on("change","input",function(){
		var nme = $(this).get(0).value.split("\\");
		$(this).parent().siblings(".file_url_b").html(nme[nme.length-1]);
	})
    $(".b_one_input").on("change","input",function(){
		var nme = $(this).get(0).value.split("\\");
		$(this).parent().siblings(".file_url").html(nme[nme.length-1]);
	})
    //上传图片显示图片
	$(".b_cs_two").on("change","input",function(){
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
	})*/
	//折扣专区部分单选按钮设置
	$(".sel_item").on("click","label input",function(){
		if($(this).prop("checked")){
//			console.log($(this).parents(".sel_item").siblings(".sel_con_a").find("input").attr("disabled"))
			$(this).parents(".sel_item").siblings(".sel_con_a").find("input").removeAttr("disabled");
//			console.log()
			$(this).parents(".type_a").siblings(".type_a").find('.in_txt').attr("disabled","disabled");
		}else{
			
		}
	})
	//弹框按钮关闭事件
	$(".alert_wl").on("click",".alert_close",function(){
		$(this).parents(".alert_wl").hide();
	})
})
