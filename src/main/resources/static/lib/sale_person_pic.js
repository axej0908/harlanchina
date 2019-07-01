var vm = new Vue({
    el: "#lava",
    data: {
        user: {},
        //办公环境和生产环境 文件图片
        offices: [],
        produces: [],

        env: {},

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
    filters: {},
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
                    } else {
                        vm.user.biz_type == "buyer_en" ? vm.carShow = true : vm.carShow = false;

                        vm.queryOfficeSrc();
                        vm.queryProduceSrc();
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
         * 1.查询店铺 办公环境 图片 arr
         */
        queryOfficeSrc: function () {
            if (typeof vm.user.user_id == "undefined") {
                alert("error");
                return;
            }
            $.ajax({
                url: "/shopEnv/page",
                type: "post",
                data: {
                    "jsonStr": JSON.stringify({
                        page: 1, limit: 10, env_type: "office", user_id: vm.user.user_id
                    })
                },
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        vm.offices = r.data.list;
                    }
                }
            })
        },

        /**
         * 2.查询店铺 生产环境 图片 arr
         */
        queryProduceSrc: function () {
            if (typeof vm.user.user_id == "undefined") {
                alert("error");
                return;
            }
            $.ajax({
                url: "/shopEnv/page",
                type: "post",
                data: {
                    "jsonStr": JSON.stringify({
                        page: 1, limit: 10, env_type: "produce", user_id: vm.user.user_id
                    })
                },
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        vm.produces = r.data.list;
                    }
                }
            })
        },

        /**
         * 3.上传图片
         */
        uploadImg: function (event) {
            var obj = event.target;
            //根据id判断生产环境还是办公环境
            vm.env.env_type = obj.id;
            $.ajaxFileUpload({
                url: "/file/upload",
                type: "post",
                data: {
                    "user_id": vm.user.user_id
                },
                secureuri: false,
                fileElementId: obj.id,
                dataType: 'json',
                success: function (r, status) {
                    //文件路径
                    vm.env.environment_src = r.data;
                    vm.queryShopId();
                },
                error: function (r, status, e) {
                    alert(e);
                }
            })
        },

        /**
         * 4.查询店铺id
         */
        queryShopId: function () {
            $.ajax({
                url: "/shop/detail",
                type: "post",
                data: {user_id: vm.user.user_id},
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        vm.env.shop_id = r.data.shop_id;
                        vm.saveEnvironment();
                    }
                }
            })
        },

        /**
         * 5.保存环境
         */
        saveEnvironment:function () {
            $.ajax({
                url: "/shopEnv/save",
                type: "post",
                data: vm.env,
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        if (vm.env.env_type == "office") {
                            vm.queryOfficeSrc();
                        }else {
                            vm.queryProduceSrc();
                        }
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
        },
        /**
         * 删除图片
         */
        removeImage: function (pic_id) {
            $.ajax({
                url: "/shopEnv/delete",
                type: "post",
                data: {env_id : pic_id
                    },
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        alert("delete success!")
                        vm.queryOfficeSrc();
                        vm.queryProduceSrc();
                    }
                }
            })
        }

    }
});

