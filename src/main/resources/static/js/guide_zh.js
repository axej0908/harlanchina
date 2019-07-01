$(function(){
	//第一部分轮播
	var tj_slide_length = $(".swiper-container").find(".swiper-slide").length;
//	var tj_swiper = new Swiper('.swiper-container', {
//      pagination: '.swiper-pagination',
//      autoplay : 3000,
//      loop:true,
//      autoplayDisableOnInteraction : false,
//      pagination: '.swiper-pagination',
//		paginationType : 'custom',
//		paginationCustomRender: function (swiper,current,total) {
//			var str="";
//				for(var i=0;i<tj_slide_length;i++){
//					if(i==(current-1)){
//						str+='<span class="span_a span_a_active"></span>'
//					}else{
//						str+='<span class="span_a"></span>'
//					}
//				}
//		      return str;
//		}
//  });

    //tab页一级菜单
    $(".one_nav").on("click","li",function(){
        $(this).addClass("li_active").siblings().removeClass("li_active");
        $(".one_a").find(".one_cent").hide().eq($(this).index()).show();
    })

    /*$(".two_btn").click(function(){
        $(".mask").show();
        $(".opacity1").show();
    });*/
   /*$(".two_btn").click(function(){
        $(".mask").show();
        $(".opacity2").show();
    });*/
    $(".img").click(function(){
        $(".mask").hide();
        /*$(".opacity1").hide();*/
        $(".opacity2").hide();
    });
})
