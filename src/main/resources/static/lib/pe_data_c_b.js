var vm = new Vue({
    el: "#rrapp",
    data: {
        user: {},
        //输入手机号
        user_phone: null,
        //输入的验证码
        inputCode: null,
        //返回的验证码
        resCode: null

    },
    mounted: function () {
        this.$nextTick(function () {
            vm.getCurrentUser();
        })
    },
    methods: {
        getCurrentUser: function () {
            $.ajax({
                url: "/log/currentUser",
                type: "post",
                data: {},
                dataType: "json",
                success: function (r) {
                    vm.user = r.data;
                    if (vm.user == null) {
                        window.location.href("../login.html");
                    }
                }
            })
        },
        logout: function () {
            $.ajax({
                url: "/log/logout",
                type: "post",
                data: {},
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        alert("sign out success!");
                        window.open("index.html", "_self");
                    }
                }
            })
        },
        //修改密码
        sendMobileCode: function () {
            if (vm.user_phone.trim().length != 11) {
                alert("不正确的手机号格式");
                return;
            }
            $.ajax({
                url: "/user/mobile/code",
                type: "post",
                data: {"user_phone": vm.user_phone},
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        alert("返回的验证码：" + r.data);
                        vm.resCode = r.data;
                    }

                }
            })
        },
        //验证第一次手机验证码，然后跳页
        nextStep: function () {
            if (vm.resCode != vm.inputCode.trim()) {
                alert("验证码错误，请重新输入");
            }
            window.open("pe_data_c_b_2zh.html", "_self");
        }
    }
});
