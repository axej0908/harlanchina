var flag = true;
var limit = 20;
var vm = new Vue({
    el: "#rrapp",
    data: {
        user: {},

        //搜索 类别
        searchType: 'supplier',
        //搜索 内容
        searchParam: null,
        //搜索结果 商品列表
        products: [],
        //搜索结果 相关商品个数
        count: 0,
        //搜索结果 供应商列表
        suppliers: [],

        //购物车总量
        gross: 0,
        carShow: false
    },
    mounted: function () {
        this.$nextTick(function () {
            vm.getCurrentUser();
            vm.quantity();

            //回车时间触发器
            $(document).keyup(function(event){
                if(event.keyCode ==13){
                    vm.search();
                }
            });

            //购物车总量
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
        searchProducts: function (currPage) {
            if (!$.isNumeric(currPage)) {
                currPage = 0;
            }
            $.ajax({
                url: "/goodsMall/listByName",
                type: "post",
                data: {jsonStr: JSON.stringify({"searchParam": vm.searchParam,"goods_state":"up", page: currPage + 1, limit: limit})},
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        vm.count = r.data.totalCount;
                        if (flag) {
                            $("#pagerBar").pagination(r.data.totalCount, {
                                items_per_page: limit,
                                num_edge_entries: 1,
                                num_display_entries: 5,
                                callback: vm.searchProducts//回调函数
                            });
                            flag = false;
                        }
                        vm.products = r.data.list;
                    }
                }
            })
        },

        /**
         * 2.搜索供应商
         */
        searchSupplier: function () {
            window.open("master.html?searchType=" + vm.searchType + "&searchParam=" + vm.searchParam, "_self")
        },

        /**
         * 3.搜索按钮点击事件
         */
        search: function () {
            if (vm.searchType == "product") {
                vm.searchProducts();
            } else if (vm.searchType == "supplier") {
                vm.searchSupplier();
            } else if(vm.searchType == "cas"){
                vm.searchCas();
            }else {
                alert("error");
            }
        },

        /**
         * 4. link to shop detail
         */
        lnkShopDetail: function (shop) {
            window.open("shop_detail2.html?shop=" + base64.encode(JSON.stringify(shop)), "_self");
        },

        searchCas : function (currPage) {
            if (!$.isNumeric(currPage)) {
                currPage = 0;
            }
            $.ajax({
                url: "/goodsMall/searchCas",
                type: "post",
                data: {jsonStr: JSON.stringify({"cas": vm.searchParam, "goods_state":"up", page: currPage + 1, limit: limit})},
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        if (flag) {
                            $("#pagerBar").pagination(r.count, {
                                items_per_page: limit,
                                num_edge_entries: 1,
                                num_display_entries: 5,
                                callback: vm.searchCas//回调函数
                            });
                            flag = false;
                        }
                        vm.products = r.data;
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
