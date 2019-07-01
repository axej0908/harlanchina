$(function(){
	var file_nm_arr = location.pathname.split("/");
	var file_nm = file_nm_arr[file_nm_arr.length-1];
		//单选按钮点击事件
    $(".radio_div").on("click","input",function(){
    	$(".radio_div").removeClass("check_radio");
    	$(this).parents(".radio_div").addClass("check_radio");
    	var num = $(this).parents(".radio_div").index();
    	var form_con = $(".con_list").find(".con_area")
		form_con.eq(num).show().siblings().hide();
    })
    //注册按钮点击事件
    /*$(".land_btn").on("click",function(){
    	location.href = "login_en.html";
    	file_nm == "register_info_en.html" ? location.href="login_en.html" : location.href="login_zh.html";
    })*/
    //上传图片显示图片
     //上传图片显示图片
	$(".pic,.pic_b").on("change","input",function(){
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
	})
})
