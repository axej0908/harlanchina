var vm = new Vue({
    el: "#lava",
    data: {
        user: {},
        shop: {}
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
         * 修改用户信息
         */
        saveUserInfo: function () {
            if (typeof vm.user.user_id == "undefined") {
                alert("error");
                return;
            }
            var user = {
                user_id: vm.user.user_id,
                real_name: vm.user.real_name,
                contact_name:vm.user.contact_name,
                company_name:vm.user.company_name,
                // user_gender: vm.user.user_gender,
                contact_phone: vm.user.contact_phone,
                company_address: vm.user.company_address
            };
            $.ajax({
                url: "/user/update",
                type: "post",
                data: user,
                dataType: "json",
                asycn: false,
                success: function (r) {
                    if (r.code == 0) {
                        alert("修改成功");
                        /*vm.logout();*/
                        location.reload()
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

