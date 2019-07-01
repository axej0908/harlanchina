var vm = new Vue({
    el: "#rrapp",
    data: {
        user: {},

        //搜索 类别
        searchType:'supplier',
        //搜索 内容
        searchParam:null,
        //搜索结果 商品列表
        products:[],
        //搜索结果 供应商列表
        suppliers:[],
        suppliersTotal: 0,

        shop:{},

        //购物车总量
        gross: 0,
        carShow: false
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
                    vm.searchType = getQueryString("searchType");
                    vm.searchParam = getQueryString("searchParam");

                    //供应商 隐藏购物车
                    if(vm.user != null){
                        vm.user.biz_type == "buyer_en" ? vm.carShow = true : vm.carShow = false;
                    }

                    vm.search();
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
                        window.open("../login_zh.html", "_self");
                    }
                }
            })
        },

        /**
         * 1.搜索商品
         */
        searchProducts: function () {
            window.open("search.html?searchType=" + vm.searchType + "&searchParam=" + vm.searchParam, "_self")
        },

        /**
         * 2.搜索供应商
         */
        searchSupplier:function () {
            $.ajax({
                url: "/shop/listByName",
                type: "post",
                data: {"searchParam": vm.searchParam},
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        vm.suppliers = r.data;
                        vm.suppliersTotal = vm.suppliers.length;

                    }
                }
            })
        },

        /**
         * 3.搜索按钮点击事件
         */
        search:function () {
            if (vm.searchType == "product"){
                vm.searchProducts();
            }else if(vm.searchType == "supplier"){
                vm.searchSupplier();
            }else if(vm.searchType == "cas"){
                vm.searchProducts();
            } else {
                alert("error");
            }
        },

        /**
         * 4.店铺跳转
         * @param user_id
         */
        linkToShop: function (user_id) {
            if (user_id == null || typeof user_id == "undefined") {
                alert("error");
                return;
            }
            $.ajax({
                url: "/user/detail",
                type: "post",
                data: {user_id: user_id},
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        var user_type = r.result.user_type;
                        vm.preLoadShop(user_id,user_type);
                    }
                }
            })
        },

        //4.查询店铺
        preLoadShop: function (user_id,user_type) {
            $.ajax({
                url: "/shop/detail",
                type: "post",
                data: {user_id: user_id},
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        vm.shop = r.data;
                        //2.根据用户类型判断跳转
                        if (user_type == 'supplierZh'){
                            window.open("shop_detail2.html?shop="+base64.encode(JSON.stringify(vm.shop)),"_self");
                        }else {
                            window.open("shop_detail2.html?shop="+base64.encode(JSON.stringify(vm.shop)),"_self");
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
        }

    }
});
