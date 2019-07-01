$(function () {
    //发送验证码倒计时
    $(".code_area").on("click", ".code_btn", function () {
        console.log("2222222")
        if ($(this).hasClass("code_active")) {
            return;
        } else {
            $(this).addClass("code_active");
            var num = 60;
            var ds = setInterval(function () {
                num--;
                $(".code_btn").html(num + "S");
                if (num == 0) {
                    $(".code_btn").removeClass("code_active").html("send agin");
                    clearInterval(ds);
                }
            }, 1000)
        }
    })
});
