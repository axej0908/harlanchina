var vm = new Vue({
    el: "#lava",
    data: {
        user: {},
        code: "",
        mobile: "",
        carShow: false
    },
    mounted: function () {
        this.$nextTick(function () {
            vm.getCurrentUser();
        })
    },
    filters: {},
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
                        window.location.href = "login_en.html";
                    }else {
                        //供应商 隐藏购物车
                        if(vm.user.biz_type == "buyer_en"){
                            vm.carShow = true;
                        }
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

        /**
         * 1.新手机发送短信验证码
         */
        sendNewCode: function () {
            $.ajax({
                url: "/log/mobileCode",
                type: "post",
                data: {"user_phone": vm.mobile},
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        alert("success");
                    } else {
                        alert(r.msg);
                    }
                }
            })
        },

        /**
         * 2.modifyMobile
         */
        modifyMobile: function () {
            $.ajax({
                url: "/log/modMobile",
                type: "post",
                data: {user_id: vm.user.user_id, mobile: vm.mobile, cpvc: vm.code},
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        alert("success!please sign in again.");
                        window.location.href = "login_en.html";
                    } else {
                        alert("failure");
                    }
                }
            })
        }
    }
});

