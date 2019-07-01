var vm = new Vue({
    el:"#rrapp",
    data:{
        confirmPwd:null,
        user:{},
        //弹框显示控制
        step1Show:true,
        //短信验证码
        txtMsgCodeDB:null,
        txtMsgCodeIn:null
    },
    mounted: function() {
        this.$nextTick(function () {

        })
    },
    methods:{

        /**
         * 3.control visibility of two input
         */
        renderVisible:function(){
            if (vm.txtMsgCodeIn == vm.txtMsgCodeDB){
                vm.step1Show = false;
            }else {
                alert("verification error");
            }
        },

        /**
         * 2.send code
         */
        sendMobileCode : function () {
            if($(this).hasClass("code_active")){
                return;
            }else{
                $(this).addClass("code_active");
                var num = 60;
                var ds = setInterval(function(){
                    num--;
                    $(".code_pic").html(num+"S");
                    if(num == 0){
                        $(".code_pic").removeClass("code_active").html("重新发送");
                        clearInterval(ds);
                        vm.txtMsgCodeDB = null;
                    }
                },1000)
            }
            $.ajax({
                url:"/log/mobile",
                type:"post",
                data:{"user_phone":vm.user.user_phone},
                dataType:"json",
                success:function (r) {
                    vm.txtMsgCodeDB = r.data;
                    // alert("success");
                }
            })
        },

        /**
         * 1.reset password
         */
        resetPws1 : function () {
            if (vm.user.user_password != vm.confirmPwd){
                alert("please check again");
                vm.user.user_password = "";
                vm.confirmPwd = "";
                return;
            }
            vm.user.user_password = vm.user.user_password.trim();
            $.ajax({
                url:"/log/resetPwd",
                type:"post",
                data:vm.user,
                dataType:"json",
                success:function (r) {
                    if(r.code == 0 ){
                        alert("修改密码成功!");
                        window.location.href="login_zh.html";
                    }else{
                        alert("修改密码失败!");
                    }
                }
            })
        },
        resetPws2 : function () {
            if (vm.user.user_password != vm.confirmPwd){
                alert("please check again");
                vm.user.user_password = "";
                vm.confirmPwd = "";
                return;
            }
            vm.user.user_password = vm.user.user_password.trim();
            $.ajax({
                url:"/log/resetPwd",
                type:"post",
                data:vm.user,
                dataType:"json",
                success:function (r) {
                    if(r.code == 0 ){
                        alert("success!");
                        window.location.href="login_en.html";
                    }else{
                        alert("failure!");
                    }
                }
            })
        }
    }
});
