var flag = true;
var limit = 10;
var vm = new Vue({
    el: "#lava",
    data: {
        user: {},
        //商品列表
        goods: [],
        //分类文本
        one_type: null,
        two_type: null,
        //价格快递
        priceNews: [],

        searchParam: null,
        //搜索框搜索类别
        searchType: 'product',
        //分类
        categories: [],
        //二级分类显示与否
        secCateShow:false,
        secCate:[],

        total:0,
        carShow: false

    },
    computed: {
        cateSelected: function () {
            if (vm.categories == []) {
                return;
            } else {
                vm.categories.forEach(function (item, index) {
                    if (item.checked) {
                        vm.secCate = item.list;
                    }
                });
            }
            return vm.secCate;
        }
    },
    mounted: function () {
        this.$nextTick(function () {
            vm.currentUser();
        })
    },
    filters: {
        orderState: function (val) {
            if (val == "1") {
                return "待付款";
            }
        }
    },
    methods: {

        redirectSel: function () {
            if (vm.searchType == "product") {
                window.open("search.html?searchType=" + vm.searchType + "&searchParam=" + vm.searchParam, "_self")
            } else if (vm.searchType == "supplier") {
                window.open("master.html?searchType=" + vm.searchType + "&searchParam=" + vm.searchParam, "_self")
            }else if(vm.searchType == "cas"){
                window.open("search.html?searchType=" + vm.searchType + "&searchParam=" + vm.searchParam, "_self")
            }else {
                alert("error");
            }
        },
        //获取当前登录人详细信息
        currentUser: function () {
            $.ajax({
                url: "/log/currentUser",
                type: "post",
                data: {},
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        vm.user = r.data;

                        //供应商 隐藏购物车
                        if(vm.user != null){
                            if(vm.user.biz_type == "buyer_en"){
                                vm.carShow = true;
                            }
                        }

                        //1.产品分类
                        vm.preLoadRecursionList();
                        //2.预加载首页化浪自营商品列表
                        vm.preLoadIndexGoods(0);
                        //3.价格快递
                        vm.preLoadPriceNews(0);
                    }
                }
            })
        },
        //退出
        logout: function () {
            $.ajax({
                url: "/log/logout",
                type: "post",
                data: {},
                dataType: "json",
                success: function (data) {
                    if (data.code == 0) {
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


        //1.商品分类
        preLoadRecursionList: function () {
            $.ajax({
                url: "/category/recursion",
                type: "post",
                data: {},
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        vm.categories = r.data;
                    }
                }
            })
        },

        /**
         * 2.一级分类点击事件(处理选中效果)
         */
        selCategory: function (obj) {
            vm.secCateShow = true;
            //li选中效果样式展示
            vm.categories.forEach(function (item, index) {
                if (obj.text == item.text) {
                    vm.one_type = obj.text;
                    item.checked = true;
                } else {
                    item.checked = false;
                }
            });
            //根据分类查询商品
            vm.preLoadIndexGoods();
        },

        /**
         * 3.二级分类点击事件(渲染、接口)
         */
        selSecCate:function (obj) {
            //li选中效果样式展示
            vm.secCate.forEach(function (item, index) {
                if (obj.text == item.text) {
                    vm.two_type = obj.text;
                    item.checked = true;
                } else {
                    item.checked = false;
                }
            });
            //根据分类查询商品
            vm.preLoadIndexGoods();
        },

        /**
         * 4.预加载首页化浪自营商品列表
         * seller_id
         */
        preLoadIndexGoods: function (currPage) {
            if (!$.isNumeric(currPage)) {
                currPage = 0;
            }
            flag = true;
            //根据分类查询商品
            $.ajax({
                url: "/findGoods/page",
                type: "post",
                data: {
                    "jsonStr": JSON.stringify({
                        goods_state: 'pass',
                        /*goods_type: "others",*/
                        one_type: vm.one_type,
                        two_type: vm.two_type,
                        page: currPage + 1,
                        limit: limit
                    })
                },
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        if (flag) {
                            $("#pagerBar").pagination(r.data.totalCount, {
                                items_per_page: limit,
                                num_edge_entries: 1,
                                num_display_entries: 5,
                                current_page:currPage,
                                callback: vm.preLoadIndexGoods//回调函数
                            });
                            flag = false;
                        }
                        vm.goods = r.data.list;
                        vm.total = r.data.totalCount;
                    }
                }
            })
        },

        //5.查询价格快递 列表
        preLoadPriceNews: function (currPage) {
            if (!$.isNumeric(currPage)) {
                currPage = 0;
            }
            $.ajax({
                url: "/price/list",
                type: "post",
                data: {
                    jsonStr: JSON.stringify({
                        page: currPage+1,
                        limit: limit
                    })
                },
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                       /* if (flag) {
                            $("#pagerBar").pagination(r.data.totalCount, {
                                items_per_page: limit,
                                num_edge_entries: 1,
                                num_display_entries: 5,
                                callback: vm.preLoadPriceNews//回调函数
                            });
                            flag = false;
                        }*/
                        vm.priceNews = r.data.list;
                    }
                }
            })
        },

        /**
         * 6.点击查询商品详情
         * @param item
         */
        queryCargoDetail: function (item) {
            var mer_id = item.goods_id;
            window.open("g_goods_detail.html?goods_id=" + mer_id, "_blank")
        },

        before : function () {
            if(vm.user == null){
                alert("Please login first!");
                window.open("login_en.html", "_self");
            }else {
                window.open("push_find_goods.html", "_self");
            }
        }
    }
});