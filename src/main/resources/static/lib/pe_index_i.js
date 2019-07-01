var limit = 10;
var flag = true;
var vm = new Vue({
    el: "#rrapp",
    data: {
        user: {},
        //商品集合
        goods: [],
        //商品总数
        goodCount: 0,
        //店铺集合
        shops: [],
        //店铺总数
        shopCount: 0,
        leftView: true
    },
    mounted: function () {
        this.$nextTick(function () {
            vm.getCurrentUser();
        })
    },

    filters: {
        filterState: function (val) {
        }
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
                        alert("请重新登录!");
                        window.open("index.html", "_self");
                        return;
                    }
                    //如果当前用户存在，则查询此用户收藏的商品列表
                    vm.queryGoodsList(0);
                    vm.queryShopsList(0);
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
         * 切换左右选项卡
         */
        switchTabs: function (val) {
            //左侧不展示
            if (val > 1) {
                vm.leftView = false;
            }else {
                vm.leftView = true;
            }
        },

        /**
         * 收藏的商品列表
         * @param currPage
         */
        queryGoodsList: function (currPage) {
            if (!$.isNumeric(currPage)) {
                currPage = 0;
            }
            $.ajax({
                url: "/collection/list",
                type: "post",
                data: {
                    "jsonStr": JSON.stringify({
                        "user_id": vm.user.user_id,
                        "page": currPage + 1,
                        "limit": limit,
                        "col_type": "1"
                    })
                },
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        vm.goods = r.data.list;
                        vm.goodCount = r.data.totalCount;
                        if (flag) {
                            $("#pagerBarGoods").pagination(r.data.totalCount, {
                                items_per_page: limit,
                                num_edge_entries: 0,
                                num_display_entries: 2,
                                callback: vm.queryGoodsList//回调函数
                            });
                            flag = false;
                        }
                    }
                }
            })
        },

        /**
         * 收藏的店铺列表
         * @param currPage
         */
        queryShopsList: function (currPage) {
            if (!$.isNumeric(currPage)) {
                currPage = 0;
            }
            $.ajax({
                url: "/collection/list",
                type: "post",
                data: {
                    "jsonStr": JSON.stringify({
                        "user_id": vm.user.user_id,
                        "page": currPage + 1,
                        "limit": limit,
                        "col_type": "2"
                    })
                },
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        vm.shops = r.data.list;
                        vm.shopCount = r.data.totalCount;
                        if (flag) {
                            $("#pagerBarShops").pagination(r.data.totalCount, {
                                items_per_page: limit,
                                num_edge_entries: 0,
                                num_display_entries: 2,
                                callback: vm.queryShopsList//回调函数
                            });
                            flag = false;
                        }
                    }
                }
            })
        },

        /**
         * 删除收藏的店铺或者商品
         */
        delCollectionById:function (col_id) {
            $.ajax({
                url: "/collection/delete",
                type: "post",
                data: {col_id:col_id},
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        alert("操作成功!");
                        vm.queryShopsList(0);
                        vm.queryGoodsList(0);
                    }
                }
            })
        }
    }
});