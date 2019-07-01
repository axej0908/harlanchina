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
     //产品类目列表按钮
    //删除按钮
    $(".g_name_list").on("click",".sc_btn",function(){
    	$(this).parents("li").remove();
    })
	//类目列表添加按钮
/*	$("body").on("click",".list_add,.all_btn_b",function(){
		var item = $('<li> <div class="cpnm"></div> <div class="li_bj_del"> <div class="bj_btn">编辑</div> <div class="sc_btn">删除</div> </div> </li>');
		$(".g_name_list").append(item);
	})
	$(".btn_list").on("click",".all_btn_c",function(){
		$(".al_ert").show();
	})*/
	//弹框按钮点击状态
	$(".al_ert").on("click",".sure",function(){
		$(".al_ert").hide();
	})
	
	//弹框按钮点击状态
	$(".al_ert").on("click",".sure",function(){
		$(".al_ert").hide();
	})
	 //上唇图片显示文件名
    /* $(".a_panel_three").on("change","input",function(){
		var nme = $(this).get(0).value.split("\\");
		$(this).parent().siblings(".file_url_b").html(nme[nme.length-1]);
	})
    $(".b_cs_one,.a_panel_three").on("change","input",function(){
		var nme = $(this).get(0).value.split("\\");
		$(this).parent().siblings(".file_url").html(nme[nme.length-1]);
	})*/
    //上传图片显示图片
	/*$(".b_cs_two").on("change","input",function(){
		var $file = $(this);
        var fileObj = $file[0];
        var windowURL = window.URL || window.webkitURL;
        var $img = $(this).parent();
        if(fileObj && fileObj.files && fileObj.files[0]){
	        var dataURL = windowURL.createObjectURL(fileObj.files[0]);
	        $img.css('background-image',"url("+dataURL+")");
        }
        $img.find("span").html("");
	})*/
})
