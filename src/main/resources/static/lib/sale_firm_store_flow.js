var vm = new Vue({
    el: "#rrapp",
    data: {
        user:{},

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