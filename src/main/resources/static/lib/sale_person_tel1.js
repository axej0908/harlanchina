var vm = new Vue({
    el: "#lava",
    data: {
        user: {},
        cpvc: ''
    },
    mounted: function () {
        this.$nextTick(function () {
            vm.getCurrentUser();
        })
    },
    filters: {
        hideMobile: function (val) {
            if (typeof val == "undefined" || val.length) {

            }
        }
    },
    methods: {
        getCurrentUser: function () {
            $.ajax({
                url: "/log/currentChinaUser",
                type: "post",
                data: {},
                dataType: "json",
                success: function (r) {
                    vm.user = r.data;
                    if (vm.user == null) {
                        window.location.href = "login_zh.html";
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
                        window.location.href = "login_zh.html";
                    }
                }
            })
        },

        /**
         * 1.旧手机发送短信验证码
         */
        sendOldCode: function () {
            if (typeof vm.user.user_phone == "undefined") {
                alert("error");
                return;
            }
            $.ajax({
                url: "/code/update",
                type: "post",
                data: {"mobile": vm.user.user_phone},
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        alert("success");
                    }
                }
            })
        },

        /**
         * 2.验证旧手机验证码是否正确
         */
        verifyCode: function () {
            $.ajax({
                url: "/code/verify",
                type: "post",
                data: {mobile: vm.user.user_phone, cpvc: vm.cpvc},
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        window.location.href = "sale_person_tel_nxt1.html";
                    }else {
                        alert("failure");
                    }
                }
            })
        },

        /**
         * 店铺信息链接
         */
        lnkShopInfoUtils: function () {
            if (typeof vm.user.user_id == "undefined") {
                alert("error");
                return;
            }
            var url = "#";
            $.ajax({
                url: "/shop/detail",
                type: "post",
                data: {user_id: vm.user.user_id},
                dataType: "json",
                asycn: false,
                success: function (r) {
                    if (r.code == 0) {
                        vm.shop = r.data;
                        //判断用户类别
                        if (vm.user.user_type == "per"){
                            //2是正常运行状态
                            /*vm.shop.shop_state == "2" ? url = "sale_person_store_info1.html" : url = "sale_person_store_submit1.html";*/
                            if(vm.shop.shop_state == "1"){
                                url = "sale_person_store_submit1.html";
                            }else if(vm.shop.shop_state == "2"){
                                url = "sale_person_store_info1.html";
                            }else if(vm.shop.shop_state == "3"){
                                url = "sale_person_store_edit1.html";
                            }
                        }else if (vm.user.user_type == "com"){
                            /*vm.shop.shop_state == "2" ? url = "sale_firm_store_info1.html" : url = "sale_firm_store_submit1.html";
                            vm.shop.shop_state == "3" ? url = "sale_firm_store_edit1.html" : url = "sale_firm_store_submit1.html";*/
                            if(vm.shop.shop_state == "1"){
                                url = "sale_firm_store_submit1.html";
                            }else if(vm.shop.shop_state == "2"){
                                url = "sale_firm_store_info1.html";
                            }else if(vm.shop.shop_state == "3"){
                                url = "sale_firm_store_edit1.html";
                            }
                        }
                    } else if (r.code == 500) {
                        //店铺不存在
                        //判断用户类别
                        if (vm.user.user_type == "per"){
                            //2是正常运行状态
                            url = "sale_person_store_flow1.html"
                        }else if (vm.user.user_type == "com"){
                            url = "sale_firm_store_flow1.html"
                        }
                    }
                    window.location.href = url;
                }
            })
        }
    }
});

