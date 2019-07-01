$(function(){
	//模拟城市-无联动/无搜索
	var selector = $('#city-picker-selector').cityPicker({
		dataJson: cityData,
		renderMode: true,
		search: false,
		linkage: false
	})
	$('#city-picker-selector').on('choose-province.citypicker', function(event, tagert, storage) {
		console.log(storage);
	});
	
	//设置城市
	selector.setCityVal([{
		'id': '110000',
		'name': '请选择'
	}, {
		'id': '110100',
		'name': '请选择'
	}, {
		'id': '110108',
		'name': '请选择'
	}]);
	//修改头像操作
	 $(".xgtx_op").on("change","input",function() {
        var $file = $(this);
        var fileObj = $file[0];
        var windowURL = window.URL || window.webkitURL;
        var dataURL;
        var $img = $(".head_pic");
        if(fileObj && fileObj.files && fileObj.files[0]){
	        dataURL = windowURL.createObjectURL(fileObj.files[0]);
	        $img.css('background-image',"url("+dataURL+")");
        }
       
    });
    //营业执照上传
     $(".item_c").on("change","input",function() {
     	
        var $file = $(this);
        var fileObj = $file[0];
        var windowURL = window.URL || window.webkitURL;
        var dataURL;
        var $img = $(this).parent(".file_div");
        if(fileObj && fileObj.files && fileObj.files[0]){
	        dataURL = windowURL.createObjectURL(fileObj.files[0]);
	        $img.css('background-image',"url("+dataURL+")");
	        $img.find("span").html("");
        }
       
    });
})