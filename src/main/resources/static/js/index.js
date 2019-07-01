window.onload = function () {
    //第一部分轮播
    var banner_swp = new Swiper('.first-swiper', {
        paginationClickable: true,
        autoplay: 3000,
        loop: true,
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true,//修改swiper的父元素时，自动初始化swiper
        autoplayDisableOnInteraction: false,
      	loopAdditionalSlides: 0,
        pagination: {
            el:'.swiper-pagination',
            type: 'bullets'
        }
        // paginationType: 'custom'

 /*       paginationCustomRender: function (swiper, current, total) {
            var str = "";
            for (var i = 0; i < tj_slide_length; i++) {
                if (i == (current - 1)) {
                    str += '<span class="span_a span_a_active"></span>'
                } else {
                    str += '<span class="span_a"></span>'
                }
            }
            return str;
        }*/
    });
    //第二部分轮播
    var second_swiper = new Swiper('.hot_swiper', {
        prevButton: '.swiper-button-prev',
        nextButton: '.swiper-button-next',
        slidesPerColumn: 2,//显示两行
        slidesPerView: 4,
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true//修改swiper的父元素时，自动初始化swiper
    });
    //第三部分轮播
    var three_swiper = new Swiper('.six_swiper', {
        prevButton: '.swiper-button-prev',
        nextButton: '.swiper-button-next',
        slidesPerView: 4,
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true//修改swiper的父元素时，自动初始化swiper
    });

    $(".new_tab_mn").on("click","li",function(){
		$(this).addClass("li_active").siblings().removeClass("li_active")
        $(".tab_con_list").find(".tab_con").hide().eq($(this).index()).show();
	})
};
function top_back(){
     document.documentElement.scrollTop = document.body.scrollTop =0;
}
