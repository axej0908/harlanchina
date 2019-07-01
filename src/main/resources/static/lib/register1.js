var vm = new Vue({
    el: "#rrapp",
    data: {
        user: {
            user_state: 'inactive',
            biz_type: 'seller_zh'
        },

        //协议 是true 否false
        protocolVal: true
    },
    mounted: function () {
        this.$nextTick(function () {

        })
    },
    methods: {

        /** 2供应商注册 - 跳转完善信息 */
        registerSeller: function () {

            if(!vm.protocolVal){
                alert("请阅读并同意用户注册协议!");
                return;
            }

            $.ajax({
                url: "/log/register",
                type: "post",
                data: vm.user,
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        var user_id = r.data.user_id;
                        window.location.href = "register_info_zh.html?user_id="+user_id;
                    } else {
                        alert(r.msg);
                    }
                }
            })
        },

        /**
         * 1.发送手机验证码
         */
        sendMobileCode: function () {
            $.ajax({
                url: "/log/mobileCode",
                type: "post",
                data: {"user_phone": vm.user.user_phone},
                dataType: "json",
                success: function (r) {
                    console.log(JSON.stringify(r));
                    if (r.code == 0) {
                        alert("验证码已发送，请注意查收");
                    } else {
                        alert(r.msg);
                    }
                }
            })
        },

        /**
         * 是否同意协议
         * 是 true
         * 否 false
         */
        protocol : function () {
            if(vm.protocolVal){
                vm.protocolVal = false;
            }else {
                vm.protocolVal = true;
            }
        }
    }
});