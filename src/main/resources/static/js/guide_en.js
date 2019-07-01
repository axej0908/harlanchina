 $(function () {
        /*图片位置数据*/
        var datas = [
            {'z-index': 6, opacity: 1, width: 460, height: 560, top:0, left: 0},
    
            {'z-index': 3, opacity: 0.4, width: 350, height: 386, top: 50, left: -260},
       
            {'z-index': 3, opacity: 0.4, width: 350, height: 386,  top: 50, left: 420},
          
        ]
        move();

        function move() {
            /*图片分布*/
            for (var i = 0; i < datas.length; i++) {
                var data = datas[i];
                $('#slide ul li').eq(i).css('z-index',data['z-index']);
                $('#slide ul li').eq(i).stop().animate(data, 1200);
            }
        }

        /*左箭头事件*/
        $('.prev').on('click', function () {
            var last = datas.pop();
            datas.unshift(last);

            move();
        })

        /*右箭头事件处理函数*/
        function nextYewu(){
            var first = datas.shift();
            datas.push(first);
            move();
        }
        /*右箭头事件*/
        $('.next').on('click', nextYewu);

        /*自动播放*/
        var timer = setInterval(function(){
            nextYewu();
        },5000);
        /*鼠标进入slide显示箭头,清除自动播放*/
        $('#slide').on({
            mouseenter: function () {
                $('.arrow').css('display', 'block');
                clearInterval(timer);
            }, mouseleave: function () {
                $('.arrow').css('display', 'none');
                /*鼠标离开时自动播放*/
                clearInterval(timer);
                timer = setInterval(function(){
                    nextYewu();
                },5000)
            }
        })

         // 化浪眼
         /*$(".two_btn").click(function(){
             $(".mask").show();
             $(".opacity").show();
         });

         $(".s_btn").click(function(){
             $(".mask").show();
             $(".opacity1").show();
         });*/

         // 关闭
         $(".img").click(function(){
             $(".mask").hide();
             $(".opacity").hide();
             $(".opacity1").hide();
             $(".opacity2").hide();
         });
         //tab页一级菜单
         /*$(".opacity_nav").on("click","li",function(){
             $(this).addClass("nav_active").siblings().removeClass("nav_active");
             $(".opacity_box").find(".opacity_cont").hide().eq($(this).index()).show();
         })*/


     //其他服务
         /*$(".s_btn").click(function(){
             $(".mask").show();
             $(".opacity").show();
         });*/
         $(".img").click(function(){
             $(".mask").hide();
             $(".opacity").hide();
         });
        /*$(".five_btn").click(function(){
        	$(".mask").show();
        	$(".opacity2").show();
        })*/
    })