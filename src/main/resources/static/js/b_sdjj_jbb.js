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
    /*$(".a_panel_three").on("change","input",function(){
		var nme = $(this).get(0).value.split("\\");
		$(this).parent().siblings(".file_url_b").html(nme[nme.length-1]);
	})
	$(".b_cs_one").on("change","input",function(){
		var nme = $(this).get(0).value.split("\\");
		$(this).parent().siblings(".file_url").html(nme[nme.length-1]);
	})
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
	//弹框按钮点击状态
	$(".al_ert").on("click",".btn_a,.close_btn",function(){
		$(".al_ert").hide();
	})
	$(".al_ert").on("click",".btn_b",function(){
		$(this).addClass("btn_active");
		$(".btn_a").removeClass("btn_active");
		alert("跳页");
	})
})
