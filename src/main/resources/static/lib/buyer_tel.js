var vm = new Vue({
    el: "#lava",
    data: {
        user: {},
        cpvc: '',

        //购物车总量
        gross: 0,
        carShow: true
    },
    mounted: function () {
        this.$nextTick(function () {
            vm.getCurrentUser();
            vm.quantity();
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
                url: "/log/currentUser",
                async: false,
                type: "post",
                data: {},
                dataType: "json",
                success: function (r) {
                    vm.user = r.data;
                    if (vm.user == null) {
                        window.location.href = "login_en.html";
                    }else {
                        //供应商 隐藏购物车
                        vm.user.biz_type == "buyer_en" ? vm.carShow = true : vm.carShow = false;
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
         * 20.my harlan link 首页个人中心 订单页面跳转
         * 根据用户类别
         */
        lnkPersonalCenter: function () {
            if (vm.user == null || typeof vm.user == "undefined") {
                alert("error");
                return;
            }
            //stage1:英文采购商
            if (vm.user.biz_type == 'buyer_en') {
                window.location.href = "order_buyer.html";
            }
            //stage2:英文供应商 - 个人
            if (vm.user.biz_type == 'seller_en' && vm.user.user_type == "per") {
                window.location.href = "sale_person_info.html";
            }
            //stage3:英文供应商 - 公司
            if (vm.user.biz_type == 'seller_en' && vm.user.user_type == "com") {
                window.location.href = "sale_firm_info.html";
            }
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
                        window.location.href = "buyer_tel_next.html";
                    }else {
                        alert("failure");
                    }
                }
            })
        },


        /**
         * 购物车总量
         */
        quantity : function () {
            if(vm.user != null){
                $.ajax({
                    url: '/cart/quantity',
                    async: false,
                    data: {
                        jsonStr: JSON.stringify({"user_id": vm.user.user_id, "page": 1, limit: "10"})
                    },
                    type: "post",
                    datatype: "json",
                    success : function (r) {
                        if(r.code == 0){
                            vm.gross = r.data;
                        }
                    }
                })
            }
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
                            /*vm.shop.shop_state == "2" ? url = "sale_person_store_info.html" : url = "sale_person_store_submit.html";*/
                            if(vm.shop.shop_state == "1"){
                                url = "sale_person_store_submit.html";
                            }else if(vm.shop.shop_state == "2"){
                                url = "sale_person_store_info.html";
                            }else if(vm.shop.shop_state == "3"){
                                url = "sale_person_store_edit.html";
                            }
                        }else if (vm.user.user_type == "com"){
                            /*vm.shop.shop_state == "2" ? url = "sale_firm_store_info.html" : url = "sale_firm_store_submit.html";*/
                            if(vm.shop.shop_state == "1"){
                                url = "sale_firm_store_submit.html";
                            }else if(vm.shop.shop_state == "2"){
                                url = "sale_firm_store_info.html";
                            }else if(vm.shop.shop_state == "3"){
                                url = "sale_firm_store_edit.html";
                            }else {
                                url = "sale_firm_store_flow.html";
                            }
                        }
                    } else if (r.code == 500) {
                        //店铺不存在
                        //判断用户类别
                        if (vm.user.user_type == "per"){
                            //2是正常运行状态
                            url = "sale_person_store_flow.html"
                        }else if (vm.user.user_type == "com"){
                            url = "sale_firm_store_flow.html"
                        }
                    }
                    window.location.href = url;
                }
            })
        }
    }
});

