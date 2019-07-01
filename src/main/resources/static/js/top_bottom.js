searchType = 'supplier';
$(function(){
	//顶部语言选项鼠标移上事件
	$(".header_fr").on("mouseover",".lang_li",function(){
		$(this).find(".span_sj").addClass("lang_open");
		$(this).find(".lang_mn").show();
	})
	//顶部语言选项鼠标移出事件
	$(".header_fr").on("mouseleave",".lang_li",function(){
		$(this).find(".span_sj").removeClass("lang_open");
		$(this).find(".lang_mn").hide();
	})
	//搜索区域搜索类别点击事件
	$(".search_fl").on("click",".search_whitch",function(){
		if($(".search_ul").css("display") == "block"){
			$(".search_ul").hide();
		}else{
			$(".search_ul").show();
		}
		
	})
	//搜索区域搜索类别下拉菜单点击事件
	$(".search_ul").on("click","li",function(){
		$(".search_whitch").html($(this).html());
		$(".search_ul").hide();
        searchType = $(this).attr('data-searchType')
	})
	//点击其他地方搜索类别下拉列表消失
	//点击下拉框以外的区域下拉框消失
	 $(document).bind('click', function(e) {  
        var e = e || window.event; //浏览器兼容性   
        var elem = e.target || e.srcElement;  
        while (elem) { //循环判断至跟节点，防止点击的是div子元素   
            if (elem.className && elem.className == 'search_ul' || elem.className == 'search_whitch') {  
                return;  
            }  
            elem = elem.parentNode;  
        }  
        $(".search_ul").hide(); //点击的不是div或其子元素   
    });  
})
