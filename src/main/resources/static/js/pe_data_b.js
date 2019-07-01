$(function(){
	
	//修改头像操作
	 $(".sc_pic_btn").on("change","input",function() {
        var $file = $(this);
        var fileObj = $file[0];
        var windowURL = window.URL || window.webkitURL;
        var dataURL;
        var $img = $(this).parents(".sfz_pic_area");
        if(fileObj && fileObj.files && fileObj.files[0]){
	        dataURL = windowURL.createObjectURL(fileObj.files[0]);
	        $img.css('background-image',"url("+dataURL+")");
	        $img.children().hide()
        }
       
    });
})