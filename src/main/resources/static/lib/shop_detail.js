var flag = true;
var limit = 10;
var vm = new Vue({
    el: "#rrapp",
    data: {

        //输入的商品名称或者供应商
        searchParam: null,
        //搜索框搜索类别
        searchType: 'supplier',
        user: {},
        user_id: null,
        startSaleList: [],
        shop: {},

        carShow: false
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
                    /*      if (vm.user == null) {
                              alert("请重新登录!");
                              window.open("index.html", "_self");
                              return;

                          }else {
                              //页面初始化店铺信息
                              vm.shop = JSON.parse(base64.decode(getQueryString("shop")));
                              vm.preLoadMyGoods();
                          }*/

                    //供应商 隐藏购物车
                    if(vm.user != null){
                        if(vm.user.biz_type == "buyer_en"){
                            vm.carShow = true;
                        }
                    }

                    //页面初始化店铺信息
                    vm.shop = JSON.parse(base64.decode(getQueryString("shop")));
                    vm.user_id = vm.shop.user_id;
                    vm.preLoadMyGoods();
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

        //3.导航栏搜索跳转
        redirectSel: function () {
            if (vm.searchType == "product") {
                window.open("search.html?searchType=" + vm.searchType + "&searchParam=" + vm.searchParam, "_self")
            } else if (vm.searchType == "supplier") {
                window.open("master.html?searchType=" + vm.searchType + "&searchParam=" + vm.searchParam, "_self")
            } else if(vm.searchType == "cas"){
                window.open("search.html?searchType=" + vm.searchType + "&searchParam=" + vm.searchParam, "_self")
            } else {
                alert("error");
            }
        },
        //2.跳转商品详情
        getDetail: function (goods_id) {
            window.open("g_goods_detail.html?goods_id=" + goods_id, "_self");
        },

        //1.查询店铺下的所有商品
        preLoadMyGoods: function (currPage) {
            if (!$.isNumeric(currPage)) {
                currPage = 0;
            }
            $.ajax({
                url: "/goodsMall/list",
                type: "post",
                data: {
                    "jsonStr": JSON.stringify({
                        "page": currPage + 1,
                        "limit": limit,
                        "user_id": vm.user_id,
                        "goods_state": "up"
                    })
                },
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        if (flag) {
                            $("#pagerBarStartSale").pagination(r.data.totalCount, {
                                items_per_page: limit,
                                num_edge_entries: 1,
                                num_display_entries: 5,
                                callback: vm.preLoadMyGoods//回调函数
                            });
                            flag = false;
                        }
                        vm.startSaleList = r.data.list;
                    }
                }
            })
        }
    }
});