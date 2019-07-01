var flag = true;
var limit = 12;
var vm = new Vue({
    el: "#rrapp",
    data: {
        user: {},
        //现货供应列表
        goods: [],
        //分类文本
        one_type: null,
        two_type: null,
        //价格快递
        priceNews: [],

        searchParam: null,
        //搜索框搜索类别
        searchType: 'supplier',
        //分类
        categories: [
            {text: 'Alcohols', checked: true},
            {text: 'Alkenes', checked: false},
            {text: 'Amino Acid Derivatives', checked: false},
            {text: 'Aromatic Compounds', checked: false},
            {text: 'Boronic Acid Derivatives', checked: false},
            {text: 'Carbonyl Compounds', checked: false},
            {text: 'Chiral Compounds', checked: false},
            {text: 'Halides', checked: false},
            {text: 'Heterocycles', checked: false},
            {text: 'Inorganics', checked: false},
            {text: 'Nitrogen Compounds', checked: false},
            {text: 'Organosilicons', checked: false},
            {text: 'Phosphorus Compounds', checked: false},
            {text: 'Sulphur Compounds', checked: false}
        ],

        //购物车总量
        gross: 0,
        carShow: false


    },
    computed: {
        /*   selection: function () {
               for(var i =0;i<oneTypes.length;i++){
                   // select v-model = A ;if oneTypes[i].text = A; return vm.oneTypes[i].twoTypes;

               }
           }*/
    },
    mounted: function () {
        this.$nextTick(function () {
            vm.currentUser();
            //购物车总量
            vm.quantity();
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
            } else if(vm.searchType == "cas"){
                window.open("search.html?searchType=" + vm.searchType + "&searchParam=" + vm.searchParam, "_self")
            } else {
                alert("error");
            }
        },
        //获取当前登录人详细信息
        currentUser: function () {
            $.ajax({
                url: "/log/currentUser",
                async: false,
                type: "post",
                data: {},
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        vm.user = r.data;
                        //首页传递过来的参数接收赋值
                        /*vm.one_type = getQueryString("oneType");
                        var two_tmp = getQueryString("twoType");
                        vm.two_type = two_tmp.substr(0, two_tmp.length - 1);*/

                        vm.categories.forEach(function (item, index) {
                            if (item.text == vm.categoryTxt) {
                                item.checked = true;
                            } else {
                                item.checked = false;
                            }
                        });

                        //供应商 隐藏购物车
                        if(vm.user != null){
                            if(vm.user.biz_type == "buyer_en"){
                                vm.carShow = true;
                            }
                        }

                        //预加载现货供应商品接口
                        vm.preLoadIndexGoods(0);
                        //价格快递
                        vm.preLoadPriceNews();
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


        /**
         * 1.分类点击事件(处理选中效果)
         */
        selCategory: function (obj) {
            //li选中效果样式展示
            vm.categories.forEach(function (item, index) {
                if (obj.text == item.text) {
                    vm.categoryTxt = obj.text;
                    item.checked = true;
                } else {
                    item.checked = false;
                }
            });
            //根据分类查询商品
            vm.preLoadIndexGoods();
        },

        /**
         * 预加载首页化浪自营商品列表
         * seller_id
         */
        preLoadIndexGoods: function (currPage) {
            if (!$.isNumeric(currPage)) {
                currPage = 0;
            }
            var type = $.cookie('type');
            if(type){
                type =  JSON.parse(type);
                vm.one_type=type.oneType;
                vm.two_type=type.twoType;
            }
            //根据分类查询商品
            $.ajax({
                url: "/goodsMall/list",
                type: "post",
                data: {
                    "jsonStr": JSON.stringify({
                        goods_state: 'up',
                        /*goods_type: "harlan",*/
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
                                callback: vm.preLoadIndexGoods//回调函数
                            });
                            flag = false;
                        }
                        vm.goods = r.data.list;
                    }
                }
            })
        },

        /**
         * 点击查询商品详情
         * @param item
         */
        queryCargoDetail: function (item) {
            var mer_id = item.goods_id;
            window.open("g_goods_detail.html?goods_id=" + mer_id)
        },


        //4.查询价格快递 列表
        preLoadPriceNews: function () {
            $.ajax({
                url: "/price/list",
                type: "post",
                data: {
                    jsonStr: JSON.stringify({
                        page: 1,
                        limit: 100
                    })
                },
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        vm.priceNews = r.data.list;
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